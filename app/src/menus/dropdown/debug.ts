import { host } from "../../hosts/host";
import { IDropDownMenuItem } from "../../models/dropdown";
import { regenerateCode } from "../../models/regenerate";
import { useAppStore } from "../../stores/appStore";
import { useCommandPaletteStore } from "../../stores/commandPaletteStore";
import { useEditingMacro } from "../../stores/editingMacro";
import { useEditorStore } from "../../stores/editorStore";
import { useNotificationStore } from "../../stores/notificationStore";
import { SessionSelectionCommandOptions } from "../commands/debug";

export class RegenerateCodeMenuItem implements IDropDownMenuItem {
    header = "ブロックからコードを再生成";
    subHeader = "debug";
    condition = () => true;
    clicked = async () => {

        const editingStore = useEditingMacro();
        const toaster = useNotificationStore();
        if (!editingStore.macro) {
            toaster.error("マクロが選択されていません");
            return;
        }

        const result = await regenerateCode();
        const template = `/*\n    @{name}\n*/\n@{code}\n`;
        const array = result.codes.map(code => {
            return template
                .replace("@{name}", code.file.getDisplayName())
                .replace("@{code}", code.javascript);
        });

        const appStore = useAppStore();
        let code = appStore.implementation;
        if (import.meta.env.DEV) {
            const imp = await appStore.fetchImp();
            if (imp) {
                code = imp;
                appStore.implementation = code;
            }
        }
        const macro = editingStore.macro;
        if (macro && code) {
            macro.hasSetImplementationOnce = false;
            macro.setImplementation({ code, macroName: macro.name });
        }

        const editorStore = useEditorStore();
        editorStore.setCode(array.join('\n'), "javascript", true);

        toaster.toastMessage("再生成完了", {
            theme: "colored",
            type: "success",
            pauseOnFocusLoss: false
        });
    };
}

export class ReplayFromHistoryMenuItem implements IDropDownMenuItem {
    header = "マクロの実行記録を再生する";
    subHeader = "debug";
    condition = () => true;
    clicked = async () => {
        const toaster = useNotificationStore();
        const editingMacro = useEditingMacro();
        const macro = editingMacro?.macro;
        const file = editingMacro?.file;
        if (!macro || !file) {
            toaster.toastMessage("マクロが選択されていません", {
                theme: "colored",
                type: "error"
            });
            return;
        }
        const request = {
            macroName: macro.name,
            fileName: file.setting.name + ".js",
        };
        const history = await host.debug.getHistory(request);

        if (history.sessions.length < 1) {
            toaster.toastMessage("履歴がありません", {
                theme: "colored",
                type: "error"
            });
            return;
        }

        const commandPalette = useCommandPaletteStore();
        commandPalette.open(new SessionSelectionCommandOptions(history));
    };
}