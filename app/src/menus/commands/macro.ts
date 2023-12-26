import { Macro, host, IRequestResult } from "../../hosts/host";
import { useAppStore } from "../../stores/appStore";
import { ICallbackArgs, ICommandTextValidationResult, CommandItem, CommandPaletteOptions, ICommandItem } from "../../models/commandPalette";
import { ICommandTextValidator, useCommandPaletteStore } from "../../stores/commandPaletteStore";
import { useNotificationStore } from "../../stores/notificationStore";
import { useBlocklyStore } from "../../stores/blocklyStore";

/*
    マクロのメニューを表示するためのオプション
*/

// MacroMenuCommandPaletteOptions クラスはマクロメニューのコマンドパレットオプションを表します。
export class MacroMenuCommandPaletteOptions extends CommandPaletteOptions {
    // コンストラクター。マクロの設定を受け取り、オプションを初期化します。
    constructor(settings: Macro[], init?: Partial<CommandPaletteOptions>) {
        super(init); // 親クラスのコンストラクターを呼び出します。
        this.hint = settings.length < 1 ? "「新しいマクロを作成」からマクロを作成してください" : ""; // ヒントメッセージを設定します。

        // コマンドアイテムを設定（新しいマクロを作成するコマンドアイテムを含む）
        this.commandItems = [new DecidedToCreateMacroCommandItem("CreateNew")];
    }
}



/*
    マクロの切り替え
*/

// ChangeCurrentMacroCommandItem クラスは現在のマクロを切り替えるコマンドアイテムを表します。
export class ChangeCurrentMacroCommandItem extends CommandItem {
    groupTag?: string | undefined = "ChangeMacro"; // グループタグを設定

    // コンストラクター。マクロを受け取り、ヘッダーとサブヘッダーを設定します。
    constructor(private macro: Macro) {
        super();
        this.header = macro.setting.name; // ダイアログのヘッダー
        this.subHeader = this.getCategoryName();
    }

    private getCategoryName() {
        return this.macro.setting.category ? this.macro.setting.category : "分類なし"
    }

    private updateSubHeader(commandItem: ICommandItem) {
        commandItem.subHeader = commandItem.isSelected ? "このマクロに切り替える" : this.getCategoryName();
    }

    onSelected = (commandItem: ICommandItem) => {
        this.updateSubHeader(commandItem);
    }

    onUnselected = (commandItem: ICommandItem) => {
        this.updateSubHeader(commandItem);
    }

    onMouseEnter = (commandItem: ICommandItem) => {
        commandItem.subHeader = "このマクロに切り替える";
    }

    onMouseLeave = (commandItem: ICommandItem) => {
        this.updateSubHeader(commandItem);
    }

    // コールバック関数。アプリケーションストアを使用して現在のマクロを切り替えます。
    callback = () => {
        const appStore = useAppStore(); // アプリケーションストアを取得します。
        appStore.setNewMacro(this.macro); // 新しいマクロを設定します。
    };
}


/*
    マクロの作成
*/

// CreateNewMacroCommandItem クラスは新しいマクロを作成するコマンドアイテムを表します。
export class CreateNewMacroCommandItem extends CommandItem {
    // ダイアログのヘッダー
    header = "新しいマクロを作成";
    // ダイアログのサブヘッダー
    subHeader = "create new";

    // コールバック関数。新しいマクロの作成ダイアログを開きます。
    callback = async (_: ICallbackArgs) => {
        const commandPalette = useCommandPaletteStore(); // コマンドパレットストアを取得します。
        commandPalette.open(this.commandOptions); // ダイアログを開きます。
    };

    // コンストラクター。作成オプションを受け取ります。
    constructor(private commandOptions: CreateNewMacroCommandOptions) {
        super({ groupTag: "Macro" }); // 親クラスのコンストラクターを呼び出します。
    }
}

// CreateNewMacroCommandOptions クラスは新しいマクロの作成オプションを表します。
export class CreateNewMacroCommandOptions extends CommandPaletteOptions {
    // ヒントメッセージ
    hint = "新しく作るマクロの名前（Enterで決定）";
    // フィルタリングを無効に設定
    filtering = false;
    // 自動で閉じないように設定
    closeAuto = false;

    // コンストラクター。既存のマクロの配列を受け取ります。
    constructor(macros: Macro[]) {
        super({}); // 親クラスのコンストラクターを呼び出します。

        // バリデーション用の MacroNameValidator インスタンスを作成
        this.validator = new MacroNameValidator(macros);
        // コマンドアイテムを設定
        this.commandItems = [new DecidedToCreateMacroCommandItem("CreateNew")];
    }
}

// MacroCreationType はマクロの作成タイプを表す型です。
// "CreateNew" は新しいマクロを作成することを示し、"Clone" はマクロの複製を表します。
export type MacroCreationType = "CreateNew" | "Clone";



// DecidedToCreateMacroCommandItem クラスはマクロの作成または複製コマンドアイテムを表します。
export class DecidedToCreateMacroCommandItem extends CommandItem {
    // ダイアログのヘッダー
    header = "上記の名前に決定する";
    // ダイアログのサブヘッダー
    subHeader = "Enterかこの項目をクリックしてマクロを作成します";
    // ソースマクロの名前を初期化
    sourceMacroName: string = "";

    // コンストラクター。マクロ作成タイプを受け取ります。
    constructor(private creationType: MacroCreationType) {
        super();
    }

    // コールバック関数。マクロの作成または複製を行います。
    callback = async (args: ICallbackArgs) => {
        let result: IRequestResult;

        // マクロ作成タイプに応じて処理を分岐
        if (this.creationType === "CreateNew") {
            // 新しいマクロを作成
            result = await host.macroManager.create({ macroName: args.text });
        } else {
            // マクロを複製
            result = await host.macroManager.clone({ sourceMacroName: this.sourceMacroName, newMacroName: args.text });
        }

        if (result.hasError) {
            // エラーがある場合、バリデーション結果を設定して処理を中断
            args.setValidationResult({
                isValid: false,
                validationMessage: result.errorMessage
            });
            return;
        }

        // 新しいマクロを取得し、アプリケーションストアに設定
        const macro = await host.macroManager.find({ macroName: args.text });
        const appStore = useAppStore();
        appStore.setNewMacro(macro);

        const commandPalette = useCommandPaletteStore();
        commandPalette.close(); // コマンドパレットを閉じる
        return;
    }
}

// MacroNameValidator クラスはマクロ名のバリデーションを行います。
export class MacroNameValidator implements ICommandTextValidator {
    constructor(private macros: Macro[]) { }

    // バリデーションを行う validate メソッド
    validate = (text: string) => this.test(text);

    // テキストのバリデーションを行う test メソッド
    async test(text: string): Promise<ICommandTextValidationResult> {
        if (!text) {
            // テキストが空の場合、バリデーションエラー
            return {
                isValid: false,
                validationMessage: ""
            };
        }
        // マクロ名に無効な文字が含まれているかチェック
        const isValidText = await host.pathUtils.isValidPathChars(text);
        if (!isValidText) {
            return {
                isValid: false,
                validationMessage: "マクロの名前に使用できない文字が含まれています"
            };
        }

        if (text.replace(/^[\s　]+$/, "") === "") {
            // マクロ名が空白文字のみの場合、バリデーションエラー
            return {
                isValid: false,
                validationMessage: "マクロの名前を空文字のみにできません"
            }
        }

        if (!this.macros) {
            // this.macros が未定義の場合、バリデーションエラー
            return {
                isValid: false,
                validationMessage: "system error: this.macros is undefined."
            };
        }

        // 同じ名前のマクロが既に存在するかチェック
        const exists = this.macros.some(macro => macro.setting.name === text);
        if (exists) {
            return {
                isValid: false,
                validationMessage: "既に使用されてる名前です"
            };
        }

        // バリデーションが成功した場合
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
    // ヘッダーとサブヘッダーを設定します。
    header = "マクロにカテゴリーを設定"; // ダイアログのヘッダー
    subHeader = "categorize"; // ダイアログのサブヘッダー

    // 表示条件を更新するコールバック関数を設定します。
    updateCanShow = () => this.macros.length > 0;

    // コンストラクター。マクロの配列を受け取ります。
    constructor(private macros: Macro[]) {
        super({ groupTag: "Macro" }); // 親クラスのコンストラクターを呼び出します。
    }

    // コールバック関数。マクロの複製ダイアログを開くために使用されます。
    callback = () => {
        const commandPalette = useCommandPaletteStore(); // コマンドパレットストアを取得します。
        const hint = "カテゴリーを設定するマクロを選択してください"; // ヒントメッセージ

        // マクロを操作するコマンドアイテムを作成するためのファクトリ関数とオプションを設定します。
        const factory = (macro: Macro) => new DecidedToManipulateCommandItem(macro, macro => this.categorize(macro));
        const commandOptions = new ManipulateCommandPaletteOptions(this.macros, hint, factory);

        // コマンドパレットを開きます。
        commandPalette.open(commandOptions);
    }

    // マクロの複製を行うプライベートメソッド
    private categorize = (macro: Macro) => {
        console.log("categorize: ", macro.name); // コンソールに複製したマクロの名前を表示します。
        MacroCategorizer.categorize(macro);
    };
}


class MacroCategorizer {
    static categorize(categorizationTarget: Macro) {
        // コマンドパレットストアを取得します。
        const commandPalette = useCommandPaletteStore();

        // 新しいマクロを作成するコマンドアイテムを作成します。
        const commandItem = new CommandItem({
            header: "上記のカテゴリー名に決定する",
            subHeader: "Enterかこの項目をクリックしてカテゴリーを設定します",
            callback: async (args) => {
                const macroSetting = categorizationTarget.setting;
                macroSetting.category = args.text;
                const result = await host.macroManager.updateSetting(macroSetting);
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

        // 新しいマクロの名前を入力するためのダイアログオプションを設定します。
        const options = new CommandPaletteOptions({
            hint: "マクロに設定するカテゴリー名", // ヒントメッセージ
            text: categorizationTarget.setting.category,
            closeAuto: false,
            filtering: false,
            commandItems: [commandItem] // コマンドアイテムを設定
        });

        commandPalette.open(options); // コマンドパレットを開きます。
    }
}


/*
    マクロの複製
*/

// CloneMacroCommandItem クラスをエクスポートします。これはコマンドアイテムのサブクラスです。
export class CloneMacroCommandItem extends CommandItem {
    // ヘッダーとサブヘッダーを設定します。
    header = "マクロを複製"; // ダイアログのヘッダー
    subHeader = "clone"; // ダイアログのサブヘッダー

    // 表示条件を更新するコールバック関数を設定します。
    updateCanShow = () => this.macros.length > 0;

    // コンストラクター。マクロの配列を受け取ります。
    constructor(private macros: Macro[]) {
        super({ groupTag: "Macro" }); // 親クラスのコンストラクターを呼び出します。
    }

    // コールバック関数。マクロの複製ダイアログを開くために使用されます。
    callback = () => {
        const commandPalette = useCommandPaletteStore(); // コマンドパレットストアを取得します。
        const hint = "複製するマクロを選択してください"; // ヒントメッセージ

        // マクロを操作するコマンドアイテムを作成するためのファクトリ関数とオプションを設定します。
        const factory = (macro: Macro) => new DecidedToManipulateCommandItem(macro, macro => this.clone(macro));
        const commandOptions = new ManipulateCommandPaletteOptions(this.macros, hint, factory);

        // コマンドパレットを開きます。
        commandPalette.open(commandOptions);
    }

    // マクロの複製を行うプライベートメソッド
    private clone = (macro: Macro) => {
        console.log("clone: ", macro.name); // コンソールに複製したマクロの名前を表示します。

        // 新しいマクロを作成するコマンドアイテムを作成します。
        const commandItem = new DecidedToCreateMacroCommandItem("Clone");
        commandItem.sourceMacroName = macro.name;

        // 新しいマクロの名前を入力するためのダイアログオプションを設定します。
        const options = new CommandPaletteOptions({
            validator: new MacroNameValidator(this.macros), // 名前の妥当性を検証するためのバリデータ
            hint: "新しく作成するマクロの名前", // ヒントメッセージ
            closeAuto: false,
            filtering: false,
            commandItems: [commandItem] // コマンドアイテムを設定
        });

        const commandPalette = useCommandPaletteStore(); // コマンドパレットストアを取得します。
        commandPalette.open(options); // コマンドパレットを開きます。
    };
}


/*
    マクロの操作共通コマンド
*/

// DecidedToManipulateCommandItem クラスはマクロの操作に共通のコマンドアイテムを表します。
export class DecidedToManipulateCommandItem extends CommandItem {
    constructor(macro: Macro, callback: (macro: Macro) => void) {
        super();

        // ヘッダーをマクロの設定名に設定します。
        this.header = macro.setting.name;

        if (macro.setting.category) {
            this.subHeader = macro.setting.category;
        }

        // メニューをクリック、Enterを押した際に実行するコールバックの設定
        this.callback = () => callback(macro);
    }
}

// ManipulateCommandPaletteOptions クラスはマクロの操作コマンドパレットのオプションを表します。
export class ManipulateCommandPaletteOptions extends CommandPaletteOptions {
    constructor(macros: Macro[], hint: string, factory: (macro: Macro) => ICommandItem) {
        super();

        // ヒントメッセージを設定します。
        this.hint = hint;

        // マクロの配列からコマンドアイテムの配列を生成します。
        this.commandItems = macros.map(macro => factory(macro));
    }
}

/*
    マクロの削除
*/

// DeleteMacroCommandItem クラスはコマンドアイテムのサブクラスで、マクロの削除機能を提供します。
export class DeleteMacroCommandItem extends CommandItem {
    // ダイアログのヘッダー
    header = "マクロを削除";
    // ダイアログのサブヘッダー
    subHeader = "delete";

    // 表示条件を更新するためのコールバック関数を設定します。
    updateCanShow = () => this.macros.length > 0;

    // コンストラクター。マクロの配列を受け取ります。
    constructor(private macros: Macro[]) {
        super({ groupTag: "Macro" }); // 親クラスのコンストラクターを呼び出します。
    }

    // コールバック関数。マクロの削除ダイアログを開くために使用されます。
    callback = () => {
        const commandPalette = useCommandPaletteStore(); // コマンドパレットストアを取得します。
        const hint = "削除するマクロを選択してください"; // ヒントメッセージ

        // マクロを操作するコマンドアイテムを作成するためのファクトリ関数とオプションを設定します。
        const factory = (macro: Macro) => new DecidedToManipulateCommandItem(macro, macro => this.delete(macro));
        const commandOptions = new ManipulateCommandPaletteOptions(this.macros, hint, factory);

        // コマンドパレットを開きます。
        commandPalette.open(commandOptions);
    }

    // マクロの削除を行うプライベートメソッド
    private delete = (macro: Macro) => {
        const commandPalette = useCommandPaletteStore(); // コマンドパレットストアを再度取得します。

        // 削除確認ダイアログのオプションを設定します。
        const options = new CommandPaletteOptions({
            hint: `本当に「${macro.name}」を削除しますか？`, // 確認メッセージ
            filtering: true,
            closeAuto: false,
            validator: {
                validate: async function (text) {
                    const result = {
                        isValid: text === "y",
                        validationMessage: text === "y" ? "" : "削除する場合は、半角で「y」と入力してください"
                    }
                    return result;
                }
            },
            commandItems: [new CommandItem({
                header: `「${macro.name}」を削除する`,
                subHeader: "削除する場合は、半角で「y」と入力してください。",
                updateCanShow: (args) => args.text === "y",
                callback: async () => {
                    console.log("delete: ", macro.name); // コンソールに削除したマクロの名前を表示します。
                    await host.macroManager.delete({ macroName: macro.name }); // マクロを削除します。
                    const appStore = useAppStore();
                    const hasCleared = appStore.clearCurrentMacroIfItsSameWith(macro);
                    if (hasCleared) {
                        const blocklyStore = useBlocklyStore();
                        blocklyStore.getCurrentWorkspaceSession()?.clearWorkspace({ ask: false, addEntryBlock: false });
                        appStore.openMacroMenu();
                    }
                    const toaster = useNotificationStore();
                    toaster.toastMessage("削除しました", {
                        type: "error",
                        theme: "colored",
                    });
                    commandPalette.close(); // コマンドパレットを閉じます。
                }
            })]
        });

        // コマンドパレットを開きます。
        commandPalette.open(options);
    };
}


/*
    マクロの名前変更
*/

// RenameMacroCommandItem クラスはコマンドアイテムのサブクラスで、マクロの名前変更機能を提供します。
export class RenameMacroCommandItem extends CommandItem {
    // ダイアログのヘッダー
    header = "マクロの名前を変更";
    // ダイアログのサブヘッダー
    subHeader = "rename";

    // 表示条件を更新するためのコールバック関数を設定します。
    updateCanShow = () => this.macros.length > 0;

    // コンストラクター。マクロの配列を受け取ります。
    constructor(private macros: Macro[]) {
        super({ groupTag: "Macro" }); // 親クラスのコンストラクターを呼び出します。
    }

    // コールバック関数。マクロの名前変更ダイアログを開くために使用されます。
    callback = () => {
        const commandPalette = useCommandPaletteStore(); // コマンドパレットストアを取得します。
        const hint = "名前を変更するマクロを選択してください"; // ヒントメッセージ

        // マクロを操作するコマンドアイテムを作成するためのファクトリ関数とオプションを設定します。
        const factory = (macro: Macro) => new DecidedToManipulateCommandItem(macro, macro => this.rename(macro));
        const commandOptions = new ManipulateCommandPaletteOptions(this.macros, hint, factory);

        // コマンドパレットを開きます。
        commandPalette.open(commandOptions);
    }

    // マクロの名前変更を行うプライベートメソッド
    private rename = (macro: Macro) => {
        console.log("rename: ", macro.name); // コンソールにマクロの名前を表示します。
        const commandPalette = useCommandPaletteStore(); // コマンドパレットストアを再度取得します。

        // 名前変更ダイアログのオプションを設定します。
        const options = new CommandPaletteOptions({
            closeAuto: false,
            filtering: false,
            hint: "新しい名前",
            text: macro.name,
            validator: new RenameValidator(macro, this.macros), // 名前の妥当性を検証するためのバリデータ
            commandItems: [new CommandItem({
                header: "上記の名前に変更する",
                subHeader: "Enterかこの項目をクリックしてマクロの名前を変更します。",
                callback: async (args) => {
                    const newMacroName = args.text;

                    // マクロの名前を変更するための処理を実行し、結果を処理します。
                    const result = await host.macroManager.rename({
                        sourceMacroName: macro.name,
                        newMacroName: args.text
                    });

                    if (result.hasError) {
                        args.setValidationResult({
                            isValid: false,
                            validationMessage: result.errorMessage
                        });
                        return;
                    }

                    // コマンドパレットを閉じます。
                    const commandPalette = useCommandPaletteStore();
                    commandPalette.close();

                    // アプリケーションストアを使用して、新しいマクロを設定します。
                    const appStore = useAppStore();
                    const newMacro = await host.macroManager.find({ macroName: newMacroName });
                    if (appStore.currentMacro?.name === macro.name) {
                        appStore.setNewMacro(newMacro);
                    }
                }
            })]
        });

        // コマンドパレットを開きます。
        commandPalette.open(options);
    };
}

class RenameValidator extends MacroNameValidator {
    // コンストラクター。マクロとマクロの配列を受け取ります。
    constructor(private macro: Macro, macros: Macro[]) {
        super(macros); // 親クラスのコンストラクターを呼び出します。
    }

    // バリデーションを行う validate メソッド
    validate = async (text: string) => {
        // 入力されたテキストがマクロの名前と一致する場合
        if (text === this.macro.name) {
            return {
                isValid: false, // バリデーションエラー
                validationMessage: "" // エラーメッセージは空
            };
        } else {
            // 親クラスのテストメソッドを呼び出してバリデーションを実行
            return super.test(text);
        }
    };
}
