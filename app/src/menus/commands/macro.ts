import { host, IRequestResult } from "../../hosts/host";
import { useAppStore } from "../../stores/appStore";
import { ICallbackArgs, ICommandTextValidationResult, CommandItem, CommandPaletteOptions, ICommandItem, Label, Separator } from "../../models/commandPalette";
import { ICommandTextValidator, useCommandPaletteStore } from "../../stores/commandPaletteStore";
import { useNotificationStore } from "../../stores/notificationStore";
import { FileTypeToFileNameConverter, IAddFileRequest, IMacroFileSetting, Macro, MacroFile } from "../../hosts/macroManager";
import { IFileTemplate } from "../../models/fileTemplate";
import { useEditingMacro } from "../../stores/editingMacro";
import { useTabStore } from "../../stores/tabStore";
import { fileTemplateGroups } from "../../definitions/files/fileTemplates";
import { v4 as uuidv4 } from "uuid"

/*
    マクロのメニューを表示するためのオプション
*/

export class MacroMenuCommandPaletteOptions extends CommandPaletteOptions {
    constructor(init?: Partial<CommandPaletteOptions>) {
        super(init);
        // this.hint = settings.length < 1 ? "「新規作成」からマクロを作成してください" : "";
        // this.commandItems = [new DecidedToCreateMacroCommandItem("CreateNew")];
    }

    public static async create() {
        // マクロの設定取得
        let macros = await host.macroManager.list();
        if (!macros) {
            macros = []
        }

        // メニューのリスト作成
        const updateCanShow = () => macros.length > 0;
        const commandItems: ICommandItem[] = [
            new Label({ header: "マクロの操作", groupTag: "Macro" }),
            new Separator({ groupTag: "Macro", canShow: true }),
            new CreateNewMacroCommandItem(new CreateNewMacroCommandOptions(macros)),
            new CloneMacroCommandItem(macros),
            new DeleteMacroCommandItem(macros),
            new RenameMacroCommandItem(macros),
            new CategorizeMacroCommandItem(macros),
            new Label({ header: "マクロの切り替え", groupTag: "ChangeMacro", updateCanShow }),
            new Separator({ groupTag: "ChangeMacro", updateCanShow }),
        ];

        // マクロのメニュー作成
        const macroCommandItems = macros.map(setting => new ChangeCurrentMacroCommandItem(setting));
        commandItems.push(...macroCommandItems);

        // コマンド表示
        const options = new MacroMenuCommandPaletteOptions();
        options.commandItems = commandItems;
        options.hint = macros.length < 1 ? "「新規作成」からマクロを作成してください" : "";
        //this.commandItems = [new DecidedToCreateMacroCommandItem("CreateNew")];
        return options;
    }
}

/*
    マクロの切り替え
*/

export class ChangeCurrentMacroCommandItem extends CommandItem {
    groupTag?: string | undefined = "ChangeMacro";

    constructor(private macro: Macro) {
        super();
        this.header = macro.setting.name;
        this.subHeader = this.getLabelName();
    }

    private getLabelName() {
        return this.macro.setting.category ? this.macro.setting.category : "ラベルなし"
    }

    callback = () => {
        const appStore = useAppStore();
        appStore.setNewMacro(this.macro);
    };
}


/*
    マクロの作成
*/

export class CreateNewMacroCommandItem extends CommandItem {
    header = "新規作成";
    subHeader = "create new";

    callback = async (_: ICallbackArgs) => {
        const commandPalette = useCommandPaletteStore();
        commandPalette.open(this.commandOptions);
    };

    constructor(private commandOptions: CreateNewMacroCommandOptions) {
        super({ groupTag: "Macro" });
    }
}

export class CreateNewMacroCommandOptions extends CommandPaletteOptions {
    hint = "新しく作るマクロの名前（Enterで決定）";
    filtering = false;
    closeAuto = false;

    constructor(macros: Macro[]) {
        super({});
        this.validator = new MacroNameValidator(macros);
        this.commandItems = [new DecidedToCreateMacroCommandItem("CreateNew")];
    }
}

export type MacroCreationType = "CreateNew" | "Clone";



export class DecidedToCreateMacroCommandItem extends CommandItem {
    header = "上記の名前に決定する";
    subHeader = "Enterかこの項目をクリックしてマクロを作成します";
    sourceMacroName: string = "";

    constructor(private creationType: MacroCreationType) {
        super();
    }

    callback = async (args: ICallbackArgs) => {
        let result: IRequestResult;

        if (this.creationType === "CreateNew") {
            const template = fileTemplateGroups[0].templates[0];
            console.log(template);
            result = await host.macroManager.create({
                type: "MAIN",
                macroName: args.text,
                fileName: FileTypeToFileNameConverter.convert("MAIN"),
                javascript: template.javascript,
                json: template.json,
            });
        } else {
            result = await host.macroManager.clone({ sourceMacroName: this.sourceMacroName, newMacroName: args.text });
        }

        if (result.hasError) {
            args.setValidationResult({
                isValid: false,
                validationMessage: result.errorMessage
            });
            return;
        }

        const macro = await host.macroManager.find({ macroName: args.text });
        const appStore = useAppStore();
        appStore.setNewMacro(macro);

        const commandPalette = useCommandPaletteStore();
        commandPalette.close();
        return;
    }
}

export class MacroNameValidator implements ICommandTextValidator {
    constructor(private macros: Macro[]) { }

    validate = (text: string) => this.test(text);

    async test(text: string): Promise<ICommandTextValidationResult> {
        if (!text) {
            return {
                isValid: false,
                validationMessage: ""
            };
        }
        const isValidText = await host.pathUtils.isValidPathChars(text);
        if (!isValidText) {
            return {
                isValid: false,
                validationMessage: "マクロの名前に使用できない文字が含まれています"
            };
        }

        if (text.replace(/^[\s　]+$/, "") === "") {
            return {
                isValid: false,
                validationMessage: "マクロの名前を空文字のみにできません"
            }
        }

        if (!this.macros) {
            return {
                isValid: false,
                validationMessage: "system error: this.macros is undefined."
            };
        }

        const exists = this.macros.some(macro => macro.setting.name.toLowerCase() === text.toLowerCase());
        if (exists) {
            return {
                isValid: false,
                validationMessage: "既に使用されてる名前です"
            };
        }

        return {
            isValid: true,
            validationMessage: ""
        };
    };
}

/*
    マクロのカテゴライズ
*/

export class CategorizeMacroCommandItem extends CommandItem {
    header = "ラベルを設定";
    subHeader = "label";

    updateCanShow = () => this.macros.length > 0;

    constructor(private macros: Macro[]) {
        super({ groupTag: "Macro" });
    }

    callback = () => {
        const commandPalette = useCommandPaletteStore();
        const hint = "ラベルを設定するマクロを選択してください";

        const factory = (macro: Macro) => new DecidedToManipulateCommandItem(macro, macro => this.categorize(macro));
        const commandOptions = new ManipulateCommandPaletteOptions(this.macros, hint, factory);

        commandPalette.open(commandOptions);
    }

    private categorize = (macro: Macro) => {
        MacroCategorizer.categorize(macro);
    };
}


class MacroCategorizer {
    static categorize(targetMacro: Macro) {
        const commandPalette = useCommandPaletteStore();
        const commandItem = new CommandItem({
            header: "上記のラベル名に決定する",
            subHeader: "Enterかこの項目をクリックしてラベルを設定します",
            callback: async (args) => {
                targetMacro.setting.category = args.text;
                const result = await targetMacro.applySetting();
                if (result.hasError) {
                    args.setValidationResult({
                        isValid: false,
                        validationMessage: result.errorMessage
                    });
                    return;
                }
                commandPalette.close();
            }
        })
        const options = new CommandPaletteOptions({
            text: targetMacro.setting.category,
            commandItems: [commandItem],
            closeAuto: false,
            filtering: false,
        });

        commandPalette.open(options);
    }
}


/*
    マクロの複製
*/

export class CloneMacroCommandItem extends CommandItem {
    header = "複製";
    subHeader = "clone";

    updateCanShow = () => this.macros.length > 0;

    constructor(private macros: Macro[]) {
        super({ groupTag: "Macro" });
    }

    callback = () => {
        const commandPalette = useCommandPaletteStore();
        const hint = "複製するマクロを選択してください";

        const factory = (macro: Macro) => new DecidedToManipulateCommandItem(macro, macro => this.clone(macro));
        const commandOptions = new ManipulateCommandPaletteOptions(this.macros, hint, factory);

        commandPalette.open(commandOptions);
    }

    private clone = (macro: Macro) => {
        const commandItem = new DecidedToCreateMacroCommandItem("Clone");
        commandItem.sourceMacroName = macro.name;
        const options = new CommandPaletteOptions({
            closeAuto: false,
            filtering: false,
            validator: new MacroNameValidator(this.macros),
            commandItems: [commandItem]
        });
        const commandPalette = useCommandPaletteStore();
        commandPalette.open(options);
    };
}


/*
    マクロの操作共通コマンド
*/

export class DecidedToManipulateCommandItem extends CommandItem {
    constructor(macro: Macro, callback: (macro: Macro) => void) {
        super();

        this.header = macro.setting.name;

        if (macro.setting.category) {
            this.subHeader = macro.setting.category;
        }

        this.callback = () => callback(macro);
    }
}

export class ManipulateCommandPaletteOptions extends CommandPaletteOptions {
    constructor(macros: Macro[], hint: string, factory: (macro: Macro) => ICommandItem) {
        super();

        this.hint = hint;

        this.commandItems = macros.map(macro => factory(macro));
    }
}

/*
    マクロの削除
*/

export class DeleteMacroCommandItem extends CommandItem {
    header = "削除";
    subHeader = "delete";

    updateCanShow = () => this.macros.length > 0;

    constructor(private macros: Macro[]) {
        super({ groupTag: "Macro" });
    }

    callback = () => {
        const commandPalette = useCommandPaletteStore();
        const hint = "削除するマクロを選択してください";

        const factory = (macro: Macro) => new DecidedToManipulateCommandItem(macro, macro => this.delete(macro));
        const commandOptions = new ManipulateCommandPaletteOptions(this.macros, hint, factory);

        commandPalette.open(commandOptions);
    }

    private delete = async (macro: Macro) => {
        const assignCount = await host.macroManager.getAssignCount({ macroName: macro.name });
        let questionMessage = `「${macro.name}」を削除してもよろしいですか？`;
        if (assignCount > 0) {
            questionMessage = `マクロ「${macro.name}」を削除します。\nこのマクロは${assignCount}箇所で割り当てられており、それらすべての割り当ては解除されます。\nよろしいですか？`;
        }

        if (!confirm(questionMessage)) {
            return;
        }

        const toaster = useNotificationStore();
        const result = await macro.delete();
        if (result.hasError) {
            toaster.toastMessage(result.errorMessage, {
                type: "error",
                theme: "colored",
            });
            return;
        }
        const appStore = useAppStore();
        const editing = useEditingMacro();
        if (!editing.macro) {
            return;
        }
        if (editing.macro.name === macro.name) {
            appStore.clear();
        }
        toaster.toastMessage("削除しました", {
            type: "error",
            theme: "colored",
        });
    };
}


/*
    マクロの名前変更
*/

export class RenameMacroCommandItem extends CommandItem {
    header = "名前変更";
    subHeader = "rename";

    updateCanShow = () => this.macros.length > 0;

    constructor(private macros: Macro[]) {
        super({ groupTag: "Macro" });
    }

    callback = () => {
        const commandPalette = useCommandPaletteStore();
        const hint = "名前を変更するマクロを選択してください";

        const factory = (macro: Macro) => new DecidedToManipulateCommandItem(macro, macro => this.rename(macro));
        const commandOptions = new ManipulateCommandPaletteOptions(this.macros, hint, factory);

        commandPalette.open(commandOptions);
    }

    private rename = (macro: Macro) => {
        console.log("rename: ", macro.name);
        const commandPalette = useCommandPaletteStore();

        const options = new CommandPaletteOptions({
            closeAuto: false,
            filtering: false,
            hint: "新しい名前",
            text: macro.name,
            validator: new RenameValidator(macro, this.macros),
            commandItems: [new CommandItem({
                header: "上記の名前に変更する",
                subHeader: "Enterかこの項目をクリックしてマクロの名前を変更します。",
                callback: async (args) => {
                    const newMacroName = args.text;
                    const result = await macro.renameTo(newMacroName);
                    if (result.hasError) {
                        args.setValidationResult({
                            isValid: false,
                            validationMessage: result.errorMessage
                        });
                        return;
                    }

                    const commandPalette = useCommandPaletteStore();
                    commandPalette.close();

                    const editing = useEditingMacro();
                    if (editing.macro?.name === macro.name) {
                        const appStore = useAppStore();
                        const newMacro = await host.macroManager.find({ macroName: newMacroName });
                        appStore.setNewMacro(newMacro);
                    }
                }
            })]
        });

        commandPalette.open(options);
    };
}

class RenameValidator extends MacroNameValidator {
    constructor(private macro: Macro, macros: Macro[]) {
        super(macros);
    }

    validate = async (text: string) => {
        if (text.toLowerCase() === this.macro.name.toLowerCase()) {
            return {
                isValid: false,
                validationMessage: ""
            };
        } else {
            return super.test(text);
        }
    };
}

export class AddFileCommandPaletteOptions extends CommandPaletteOptions {
    constructor() {
        super();
        this.hint = "追加するイベントを選択してください";
        for (const group of fileTemplateGroups) {
            if (group.name === "MAIN") {
                continue;
            }
            this.commandItems.push(new Label({ header: group.name, groupTag: group.name }));
            this.commandItems.push(new Separator({ groupTag: group.name }));
            for (const template of group.templates) {
                this.commandItems.push(new CommandItem({
                    header: template.header,
                    subHeader: template.subHeader,
                    groupTag: group.name,
                    callback: () => this.add(template)
                }));
            }
        }
    }

    add = async (template: IFileTemplate) => {

        const tabStore = useTabStore();
        const toaster = useNotificationStore();
        const editing = useEditingMacro();
        if (!editing.macro) {
            return;
        }

        const macro = editing.macro;
        const exists = macro.fileExists(template.type);
        if (exists) {
            toaster.toastMessage("イベントは既に追加されています。", { type: "error", theme: "colored" });
            return;
        }
        const request: IAddFileRequest = {
            macroName: macro.setting.name,
            fileName: FileTypeToFileNameConverter.convert(template.type),
            type: template.type,
            javascript: template.javascript,
            json: template.json,
        };
        const result = await host.macroManager.addFile(request);
        if (result.hasError) {
            toaster.toastMessage(result.errorMessage, { type: "error", theme: "colored", });
            return;
        }
        const file: IMacroFileSetting = {
            id: uuidv4(),
            name: request.fileName,
            type: request.type
        };
        macro.setting.files.push(file)
        macro.applySetting();
        tabStore.addTab(new MacroFile(macro, file));
    }
}
