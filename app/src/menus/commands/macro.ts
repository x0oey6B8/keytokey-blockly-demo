import { IMacroSetting, host } from "../../hosts/host";
import { useAppStore } from "../../stores/appStore";
import { ICallbackArgs, ICommandTextValidationResult, CommandItem, CommandPaletteOptions } from "../../models/commandPalette";
import { ICommandTextValidator, useCommandPaletteStore } from "../../stores/commandPaletteStore";

export class TestCommandItem extends CommandItem {
    header: string = "テスト";
    subHeader: string = "";
    callback = async (args: ICallbackArgs) => {
        console.log(args.text);
        console.log(await host.macroManager.hasMacroSelected());
    }
}

export class ChangeCurrentMacroCommandItem extends CommandItem {
    groupTag?: string | undefined = "ChangeMacro";
    constructor(setting: IMacroSetting) {
        super();
        this.header = setting.name;
        this.subHeader = setting.id;
    }
}

export class MacroNameValidator implements ICommandTextValidator {

    constructor(private settings: IMacroSetting[]) {
    }

    validate = async (text: string): Promise<ICommandTextValidationResult> => {
        if (!text) {
            return {
                isValid: false,
                validationMessage: ""
            }
        }
        const isValidText = await host.pathUtils.isValidPathChars(text);
        if (!isValidText) {
            return {
                isValid: false,
                validationMessage: "マクロの名前に使用できない文字が含まれています"
            }
        }

        if (!this.settings) {
            return {
                isValid: false,
                validationMessage: "settings are undefined"
            }
        }

        const exists = this.settings.some(setting => setting.name === text);
        if (exists) {
            return {
                isValid: false,
                validationMessage: "既に使用されている名前です"
            }
        }

        return {
            isValid: true,
            validationMessage: ""
        }
    }
}


export class MacroMenuCommandOptions extends CommandPaletteOptions {
    constructor(settings: IMacroSetting[], init?: Partial<CommandPaletteOptions>) {
        super(init);
        this.lockModal = settings.length < 1;
        this.hint = settings.length < 1 ? "新規作成からマクロを作成してください" : "";
        this.commandItems = [new DecidedToCreateMacroCommandItem()]
    }
}

export class CreateNewMacroCommandItem extends CommandItem {
    header = "新規作成";
    subHeader = "新しいマクロを作成します。";
    callback = async (_: ICallbackArgs) => {
        const commandPalette = useCommandPaletteStore();
        commandPalette.open(this.commandOptions)
    };
    constructor(private commandOptions: CreateNewMacroCommandOptions) {
        super();
    }
}

export class DeleteMacroCommandItem extends CommandItem {
    header = "削除";
    subHeader = "現在選択しているマクロを削除します。";
    updateCanShow = () => this.settings.length > 0;
    constructor(private settings: IMacroSetting[]) {
        super();
    }
}

export class CloneMacroCommandItem extends CommandItem {
    header = "複製";
    subHeader = "マクロの設定を複製します。";
    updateCanShow = () => this.settings.length > 0;
    constructor(private settings: IMacroSetting[]) {
        super();
    }
}

export class RenameMacroCommandItem extends CommandItem {
    header = "名前を変更";
    subHeader = "現在選択しているマクロの名前を変更します。";
    updateCanShow = () => this.settings.length > 0;
    constructor(private settings: IMacroSetting[]) {
        super();
    }
}

export class CreateNewMacroCommandOptions extends CommandPaletteOptions {
    hint = "新しく作るマクロの名前（Enterで決定）";
    filtering = false;
    closeAuto = false;
    constructor(settings: IMacroSetting[]) {
        super({});
        this.validator = new MacroNameValidator(settings);
        this.commandItems = [new DecidedToCreateMacroCommandItem()];
    }
}

export class DecidedToCreateMacroCommandItem extends CommandItem {
    header = "上記の名前に決定する";
    subHeader = "Enterかこの項目をクリックしてマクロを作成します"
    callback = async (args: ICallbackArgs) => {
        const result = await host.macroManager.create({ name: args.text });
        if (result.hasError) {
            args.setValidationResult({
                isValid: false,
                validationMessage: result.errorMessage
            })
            return;
        }

        const setting = await host.macroManager.select({ name: args.text });
        const appStore = useAppStore();
        appStore.setNewMacroSetting(setting);
        const commandPalette = useCommandPaletteStore();
        commandPalette.close();
        return;
    }


}