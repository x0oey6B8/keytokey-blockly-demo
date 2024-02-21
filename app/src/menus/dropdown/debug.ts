import { host } from "../../hosts/host";
import { IDropDownMenuItem } from "../../models/dropdown";
import { useCommandPaletteStore } from "../../stores/commandPaletteStore";
import { useEditingMacro } from "../../stores/editingMacro";
import { useNotificationStore } from "../../stores/notificationStore";
import { SessionSelectionCommandOptions } from "../commands/debug";

export class RegenerateCodeMenuItem implements IDropDownMenuItem {
    header = "ブロックからコードを再生成";
    subHeader = "debug";
    condition = () => true;
    clicked = () => {
        alert("not implemented.");
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