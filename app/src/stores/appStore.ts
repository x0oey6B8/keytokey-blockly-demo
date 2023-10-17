import { defineStore } from "pinia";
import { Macro, MacroFile, host } from "../hosts/host";
import * as MacroMenus from "../menus/commands/macro"
import * as FindMenus from "../menus/dropdown/find"
import * as WorkspaceMenus from "../menus/dropdown/workspace"
import * as CodeGenerationMenus from "../menus/dropdown/codeGenration"
import { ICommandItem, Label, Separator } from "../models/commandPalette";
import { ITab } from "../models/tab";
import { DropDownCommandPaletteOptions, DropDownMenuToCommandItems, IAppDropDownMenu } from "../models/dropdown";
import { useCommandPaletteStore } from "./commandPaletteStore";
import { ref } from "vue";
import { useBlocklyStore } from "./blocklyStore";
import { useEditorStore } from "./editorStore";

export const useAppStore = defineStore("AppStore", () => {

    const currentMacro = ref<Macro>();
    const currentMacroFile = ref<MacroFile>();
    const tabs = ref<ITab[]>([]);

    const blocklyStore = useBlocklyStore();
    const commandStore = useCommandPaletteStore();
    const appDropDownMenus: IAppDropDownMenu[] = [
        {
            header: "探す",
            menuItems: [
                new FindMenus.FindEntryProcedureBlockMenuItem(),
                new FindMenus.FindBlockByIdMenuItem(),
                new FindMenus.FindProcedureBlockFromListMenuItem(),
                new FindMenus.ReplayMenuItem(),
            ]
        },
        {
            header: "ワークスペース",
            menuItems: [
                new WorkspaceMenus.SwitchToolboxPositionMenuItem(),
                new WorkspaceMenus.MakeWorkspaceReadOnlyMenuItem(),
                new WorkspaceMenus.MakeWorkspaceEditableMenuItem(),
                new WorkspaceMenus.CopyWorkspaceAsXmlMenuItem(),
                new WorkspaceMenus.CopyWorkspaceAsJsonMenuItem(),
                new WorkspaceMenus.ClearWorkspaceMenuItem(),
                new WorkspaceMenus.ClearSpecificBlockByIdMenuItem()
            ]
        },
        {
            header: "コードの確認",
            menuItems: [
                new CodeGenerationMenus.CreateCodeMenuItem(),
                new CodeGenerationMenus.CreateCodeNoCheckPointsMenuItem(),
                new CodeGenerationMenus.CreateDecodedCodeMenuItem(),
                new CodeGenerationMenus.CreateDecodedCodeNoCheckPointsMenuItem(),
            ]
        },
        {
            header: "デバッグ",
            menuItems: [
                {
                    header: "デバッグを開始",
                    condition: () => true,
                    clicked: () => {
                        openDropdownMenus()
                    }
                }
            ]
        },
        {
            header: "ヘルプ",
            menuItems: [
                {
                    header: "使用方法",
                    condition: () => true,
                    clicked: () => {
                        openDropdownMenus()
                    }
                }
            ]
        },
    ];

    if (import.meta.env.DEV) {
        appDropDownMenus.push({
            header: "開発用",
            menuItems: [
                {
                    header: "テスト",
                    condition: () => true,
                    clicked: () => { },
                }
            ]
        })
    }

    return {
        appDropDownMenus,
        currentMacro,
        currentMacroFile,
        tabs,
        openMacroMenu,
        openDropdownMenus,
        setNewMacro,
        clearCurrentMacroIfItsSameWith,
        clear
    };

    function openDropdownMenus() {
        const commandPaletteOptions = new DropDownCommandPaletteOptions(appDropDownMenus, new DropDownMenuToCommandItems());
        commandStore.open(commandPaletteOptions);
    }

    function clearCurrentMacroIfItsSameWith(macro: Macro): boolean {
        if (currentMacro.value?.name === macro.name) {
            clearCurrentMacro()
            return true;
        }
        return false;
    }

    function clearCurrentMacro() {
        currentMacro.value = undefined;
        currentMacroFile.value = undefined;
        tabs.value.length = 0;
    }

    async function setNewMacro(macro: Macro) {
        currentMacro.value = undefined;
        currentMacroFile.value = undefined;

        try {
            currentMacro.value = macro;
            tabs.value.length = 0;
            tabs.value.push(...[
                {
                    id: crypto.randomUUID(),
                    name: macro.setting.name,
                    isActive: true,
                    isEnabled: true
                },
                // {
                //     id: crypto.randomUUID(),
                //     name: "設定",
                //     isActive: false,
                //     isEnabled: false
                // }
            ]);
            const session = blocklyStore.getCurrentWorkspaceSession();
            if (session) {
                session.canWriteToFile = false;
                currentMacroFile.value = macro.listFiles()[0];
                const content = await currentMacroFile.value.read();
                session.setState(content.json);
                session.canWriteToFile = true;
            }
        } catch (error) {
            alert(error);
        }
    }

    async function openMacroMenu() {
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
            new MacroMenus.CreateNewMacroCommandItem(new MacroMenus.CreateNewMacroCommandOptions(macros)),
            new MacroMenus.CategorizeMacroCommandItem(macros),
            new MacroMenus.CloneMacroCommandItem(macros),
            new MacroMenus.DeleteMacroCommandItem(macros),
            new MacroMenus.RenameMacroCommandItem(macros),
            new MacroMenus.TestCommandItem(),
            new Label({ header: "マクロの切り替え", groupTag: "ChangeMacro", updateCanShow }),
            new Separator({ groupTag: "ChangeMacro", updateCanShow }),
        ];

        // マクロのメニュー作成
        const macroCommandItems = macros.map(setting => new MacroMenus.ChangeCurrentMacroCommandItem(setting));
        commandItems.push(...macroCommandItems);

        // コマンド表示
        const macroMenuCommandOptions = new MacroMenus.MacroMenuCommandPaletteOptions(macros);
        macroMenuCommandOptions.commandItems = commandItems;
        commandStore.open(macroMenuCommandOptions);
    }

    function clear() {
        const editorStore = useEditorStore();
        editorStore.modalState.isShowing = false;
        clearCurrentMacro();
        openMacroMenu()
    }
})