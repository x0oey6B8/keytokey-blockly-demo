import { defineStore } from "pinia";
import { IMacroSetting, host } from "../hosts/host";
import * as MacroMenus from "../menus/commands/macro"
import * as FindMenus from "../menus/dropdown/find"
import * as WorkspaceMenus from "../menus/dropdown/workspace"
import * as CodeGenerationMenus from "../menus/dropdown/codeGenration"
import { ICommandItem, Label, Separator } from "../models/commandPalette";
import { ITab } from "../models/tab";
import { DropDownCommandPaletteOptions, DropDownMenuToCommandItems, IAppDropDownMenu } from "../models/dropdown";
import { useCommandPaletteStore } from "./commandPaletteStore";

export const useAppStore = defineStore("AppStore", () => {

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
                new WorkspaceMenus.ClearWorkspaceMenuItem(),
            ]
        },
        {
            header: "コード生成",
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

    const tabs: ITab[] = [
        {
            id: crypto.randomUUID(),
            name: "マクロの名前マクロの名前マクロの名前マクロの名前マクロの名前マクロの名前",
            isActive: true
        },
        {
            id: crypto.randomUUID(),
            name: "マクロ終了時",
            isActive: false
        },
        {
            id: crypto.randomUUID(),
            name: "設定",
            isActive: false
        },
    ];

    return {
        appDropDownMenus,
        tabs,
        openMacroMenu,
        openDropdownMenus,
        setNewMacroSetting,
    };

    function openDropdownMenus() {
        const commandPaletteOptions = new DropDownCommandPaletteOptions(appDropDownMenus, new DropDownMenuToCommandItems());
        commandStore.open(commandPaletteOptions);
    }

    function setNewMacroSetting(setting: IMacroSetting) {
        tabs[0].name = setting.name;
    }

    async function openMacroMenu() {
        // マクロの設定取得
        let settings: IMacroSetting[] = await host.macroManager.list();
        if (!settings) {
            settings = []
        }

        // メニューのリスト作成
        const updateCanShow = () => settings.length > 0;
        const commandItems: ICommandItem[] = [
            new MacroMenus.CreateNewMacroCommandItem(new MacroMenus.CreateNewMacroCommandOptions(settings)),
            new MacroMenus.CloneMacroCommandItem(settings),
            new MacroMenus.DeleteMacroCommandItem(settings),
            new MacroMenus.RenameMacroCommandItem(settings),
            new MacroMenus.TestCommandItem(),
            new Label({ header: "マクロの切り替え", groupTag: "ChangeMacro", updateCanShow }),
            new Separator({ groupTag: "ChangeMacro", updateCanShow }),
        ];

        // マクロのメニュー作成
        const macros = settings.map(setting => new MacroMenus.ChangeCurrentMacroCommandItem(setting));
        commandItems.push(...macros);
        // コマンド表示
        const macroMenuCommandOptions = new MacroMenus.MacroMenuCommandOptions(settings);
        macroMenuCommandOptions.commandItems = commandItems;
        commandStore.open(macroMenuCommandOptions);
    }
})