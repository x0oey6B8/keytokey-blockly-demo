import { host } from "../../hosts/host";
import * as FindMenus from "./find"
import * as WorkspaceMenus from "./workspace"
import * as CodeGenerationMenus from "./codeGeneration"
import * as DebugMenus from "./debug"
import * as HelpMenus from "./help"
import { IAppDropDownMenu } from "../../models/dropdown";

export const dropdownMenus: IAppDropDownMenu[] = [
    {
        header: "探す",
        menuItems: [
            new FindMenus.FindEntryProcedureBlockMenuItem(),
            new FindMenus.FindBlockByIdMenuItem(),
            new FindMenus.FindProcedureBlockFromListMenuItem(),
        ]
    },
    {
        header: "ワークスペース",
        menuItems: [
            new WorkspaceMenus.SetEntryBlockDefaultPosition(),
            new WorkspaceMenus.SwitchToolboxPositionMenuItem(),
            // new WorkspaceMenus.MakeWorkspaceReadOnlyMenuItem(),
            // new WorkspaceMenus.MakeWorkspaceEditableMenuItem(),
            new WorkspaceMenus.CopyWorkspaceAsXmlMenuItem(),
            new WorkspaceMenus.CopyWorkspaceAsJsonMenuItem(),
            new WorkspaceMenus.ClearWorkspaceMenuItem(),
            new WorkspaceMenus.ClearSpecificBlockByIdMenuItem(),
        ]
    },
    // {
    //     header: "ツール",
    //     menuItems: [
    //         {
    //             header: "Not Implemented",
    //             subHeader: "tool",
    //             condition: () => true,
    //             clicked: async () => {
    //             }
    //         }
    //     ]
    // },
    {
        header: "デバッグ",
        menuItems: [
            new DebugMenus.RegenerateCodeMenuItem(),
            new DebugMenus.ReplayFromHistoryMenuItem(),
        ]
    },
    {
        header: "コードの確認",
        menuItems: [
            new CodeGenerationMenus.CreateCodeMenuItem(),
            new CodeGenerationMenus.CreateDecodedCodeNoCheckPointsMenuItem(),
        ]
    },
    {
        header: "ヘルプ",
        menuItems: [
            new HelpMenus.ShowUsage(),
            new HelpMenus.ShowShortcutList(),
        ]
    },
];

if (import.meta.env.DEV) {
    dropdownMenus.push({
        header: "開発用",
        menuItems: [
            {
                header: "テスト",
                subHeader: "dev",
                condition: () => true,
                clicked: async () => {
                    console.log(await host.templateMatchingSettings.listAll());

                },
            }
        ]
    })
}