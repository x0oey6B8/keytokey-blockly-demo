import { BlockSvg } from "blockly";
import { switchToolBoxPosition } from "../../configurations/blocklyOptions";
import { CommandItem, CommandPaletteOptions } from "../../models/commandPalette";
import { IDropDownMenuItem } from "../../models/dropdown";
import { useBlocklyStore } from "../../stores/blocklyStore";
import { useCommandPaletteStore } from "../../stores/commandPaletteStore";
import { useEditorStore } from "../../stores/editorStore";
import { useNotificationStore } from "../../stores/notificationStore";

export class SetEntryBlockDefaultPosition implements IDropDownMenuItem {
    header = "選択中のブロックを初期位置に設定";
    subHeader = "workspace";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        const session = blocklyStore.getCurrentWorkspaceSession();
        if (session) {
            const block = session.getSelectedBlock();
            if (block) {
                session.moveTo(block, 16, -17);
            }
        }
    };
}

export class SwitchToolboxPositionMenuItem implements IDropDownMenuItem {
    header = "ツールボックスの位置を切り替える";
    subHeader = "workspace";
    condition = () => true;
    clicked = () => {
        switchToolBoxPosition();
    };
}

export class MakeWorkspaceReadOnlyMenuItem implements IDropDownMenuItem {
    header = "Make Workspace Readonly";
    subHeader = "workspace";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        blocklyStore.getCurrentWorkspaceSession()?.makeWorkspaceReadOnly();
    };
}

export class MakeWorkspaceEditableMenuItem implements IDropDownMenuItem {
    header = "Make Workspace Editable";
    subHeader = "workspace";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        blocklyStore.getCurrentWorkspaceSession()?.makeWorkspaceEditable();
    };
}

export class CopyWorkspaceAsXmlMenuItem implements IDropDownMenuItem {
    header = "内容をテキストとしてコピー（XML)";
    subHeader = "workspace";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        const workspaceSession = blocklyStore.getCurrentWorkspaceSession()
        if (workspaceSession) {
            const xml = workspaceSession.createXml();
            const editorStore = useEditorStore();
            const notification = useNotificationStore();
            editorStore.setCode(xml, "xml", true);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(xml);
                notification.toastMessage("コピーしました。");
            }
        }
    };
}

export class CopyWorkspaceAsJsonMenuItem implements IDropDownMenuItem {
    header = "【開発用】クリップボードにJSONをコピー";
    subHeader = "workspace";
    condition = () => true;
    canVisible = () => import.meta.env.DEV;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        const workspaceSession = blocklyStore.getCurrentWorkspaceSession()
        if (workspaceSession) {
            const json = workspaceSession.getState();
            const editorStore = useEditorStore();
            const notification = useNotificationStore();
            const formattedJson = JSON.stringify(JSON.parse(json), null, 2);
            editorStore.setCode(formattedJson, "json", true);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(json);
                notification.toastMessage("コピーしました。");
            }
        }
    };
}

export class ClearWorkspaceMenuItem implements IDropDownMenuItem {
    header = "内容をクリア";
    subHeader = "workspace";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        blocklyStore.getCurrentWorkspaceSession()?.clearWorkspace();
    };
}

export class ClearSpecificBlockByIdMenuItem implements IDropDownMenuItem {
    header = "特定のブロックを強制削除";
    subHeader = "workspace";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        const session = blocklyStore.getCurrentWorkspaceSession();
        if (!session) {
            return;
        }
        const blockToCommandItem = (block: BlockSvg) => {
            return new CommandItem({
                header: block.id,
                subHeader: block.type,
                callback() {
                    block.dispose();
                },
            });
        };
        const commandPalette = useCommandPaletteStore();
        commandPalette.open(new CommandPaletteOptions({
            hint: "削除するブロックのIDを入力してください",
            commandItems: session.getAllBlocks().map(block => blockToCommandItem(block)),
        }));
    };

}