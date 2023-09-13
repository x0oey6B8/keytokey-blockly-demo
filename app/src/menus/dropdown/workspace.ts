import { switchToolBoxPosition } from "../../configurations/blocklyOptions";
import { IDropDownMenuItem } from "../../models/dropdown";
import { useBlocklyStore } from "../../stores/blocklyStore";
import { useEditorStore } from "../../stores/editorStore";
import { useNotificationStore } from "../../stores/notificationStore";

export class SwitchToolboxPositionMenuItem implements IDropDownMenuItem {
    header = "ツールボックスの位置を切り替える";
    condition = () => true;
    clicked = () => {
        switchToolBoxPosition();
    };
}

export class MakeWorkspaceReadOnlyMenuItem implements IDropDownMenuItem {
    header = "Make workspace readonly";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        blocklyStore.getCurrentWorkspaceSession()?.makeWorkspaceReadOnly();
    };
}

export class MakeWorkspaceEditableMenuItem implements IDropDownMenuItem {
    header = "Make workspace editable";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        blocklyStore.getCurrentWorkspaceSession()?.makeWorkspaceEditable();
    };
}

export class CopyWorkspaceAsXmlMenuItem implements IDropDownMenuItem {
    header = "テキストとしてコピー（XML)";
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

export class ClearWorkspaceMenuItem implements IDropDownMenuItem {
    header = "内容をクリア";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        blocklyStore.getCurrentWorkspaceSession()?.clearWorkspace()
    };
}