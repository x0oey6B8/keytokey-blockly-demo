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
        id: "disconnect selected block",
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        weight: 5,
        callback: () => {
            blocklyStore.disconnectSelectedBlock();
        },
        preconditionFn: () => {
            const canDisconnect = blocklyStore.canDisconnectSelectedBlock();
            return getEnabledOrDisabled(canDisconnect);
        },
    });

    Blockly.ContextMenuRegistry.registry.register({
        displayText: "テキストとしてコピー（子ブロックなし）",
        id: "copy without children as xml",
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        weight: 100,
        callback: () => {
            const xml = blocklyStore.copyBlockAsXml(false);
            if (xml) {
                editorStore.setCode(xml, "xml", true);
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(xml);
                    notification.toastMessage("コピーしました。");
                }
            }
        },
        preconditionFn: () => {
            const isSelectedBlockFunction = blocklyStore.isSelectedBlockFunction();
            return getEnabledOrDisabled(!isSelectedBlockFunction);
        },
    });

    Blockly.ContextMenuRegistry.registry.register({
        displayText: "テキストとしてコピー（子ブロックあり）",
        id: "copy as xml",
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        weight: 100,
        callback: () => {
            const xml = blocklyStore.copyBlockAsXml(true);
            if (xml) {
                editorStore.setCode(xml, "xml", true);
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(xml);
                    notification.toastMessage("コピーしました。");
                }
            }
        },
        preconditionFn: () => {
            return getEnabledOrDisabled(true);
        },
    });

    Blockly.ContextMenuRegistry.registry.register({
        displayText: "テキストからブロックを貼り付け",
        id: "paste block from xml",
        scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
        weight: 100,
        callback: () => {
            navigator.clipboard.readText()
                .then(text => {
                    blocklyStore.pasteBlock(text);
                });
        },
        preconditionFn: () => {
            return getEnabledOrDisabled(true);
        },
    });
}