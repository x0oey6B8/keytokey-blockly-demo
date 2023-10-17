import Blockly from "blockly";
import { useEditorStore } from "../../stores/editorStore";
import { useBlocklyStore } from "../../stores/blocklyStore";
import { useNotificationStore } from "../../stores/notificationStore";

export function defineContextMenu() {

    const blocklyStore = useBlocklyStore();
    const editorStore = useEditorStore();
    const notification = useNotificationStore();

    const getEnabledOrDisabled = (condition: boolean) => {
        return condition ? "enabled" : "disabled";
    }

    Blockly.ContextMenuRegistry.registry.register({
        displayText: "ブロックの接続を解除",
        id: "ブロックの接続を解除",
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        weight: 5,
        callback: () => {
            blocklyStore.getCurrentWorkspaceSession()?.disconnectSelectedBlock();
        },
        preconditionFn: () => {
            const canDisconnect = blocklyStore.getCurrentWorkspaceSession()?.canDisconnectSelectedBlock();
            return !canDisconnect ? "disabled" : getEnabledOrDisabled(canDisconnect);
        },
    });

    Blockly.ContextMenuRegistry.registry.register({
        displayText: "テキストとしてコピー（子ブロックなし）",
        id: "テキストとしてコピー（子ブロックなし）",
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        weight: 100,
        callback: () => {
            const workspaceSession = blocklyStore.getCurrentWorkspaceSession();
            if (workspaceSession) {
                const xml = workspaceSession.copyBlockAsXml(false);
                if (xml) {
                    editorStore.setCode(xml, "xml", true);
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(xml);
                        notification.toastMessage("コピーしました。");
                    }
                }
            }
        },
        preconditionFn: () => {
            const isSelectedBlockFunction = blocklyStore.getCurrentWorkspaceSession()?.isSelectedBlockFunction();
            return !isSelectedBlockFunction ? "enabled" : getEnabledOrDisabled(!isSelectedBlockFunction);
        },
    });

    Blockly.ContextMenuRegistry.registry.register({
        displayText: "テキストとしてコピー（子ブロックあり）",
        id: "テキストとしてコピー（子ブロックあり）",
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        weight: 100,
        callback: () => {
            const workspaceSession = blocklyStore.getCurrentWorkspaceSession()
            if (workspaceSession) {
                const xml = workspaceSession.copyBlockAsXml(true);
                if (xml) {
                    editorStore.setCode(xml, "xml", true);
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(xml);
                        notification.toastMessage("コピーしました。");
                    }
                }
            }
        },
        preconditionFn: () => {
            return getEnabledOrDisabled(true);
        },
    });

    Blockly.ContextMenuRegistry.registry.register({
        displayText: "テキストからブロックを貼り付け",
        id: "テキストからブロックを貼り付け",
        scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
        weight: 100,
        callback: () => {
            navigator.clipboard.readText()
                .then(text => {
                    blocklyStore.getCurrentWorkspaceSession()?.pasteBlock(text);
                });
        },
        preconditionFn: () => {
            return getEnabledOrDisabled(true);
        },
    });

    Blockly.ContextMenuRegistry.registry.register({
        displayText: "ブロックのIDをコピー",
        id: "ブロックのIDをコピー",
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        weight: 100,
        callback: (scope) => {
            if (navigator?.clipboard && scope.block) {
                navigator.clipboard.writeText(scope.block.id);
                const notification = useNotificationStore();
                notification.toastMessage("コピーしました");
            }
        },
        preconditionFn: () => {
            return getEnabledOrDisabled(true);
        },
    });
}