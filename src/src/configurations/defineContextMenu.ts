import Blockly from "blockly";
import { useEditorStore } from "../stores/editorStore";
import { useBlocklyStore } from "../stores/blocklyStore";

import { toast } from "vue3-toastify"
import 'vue3-toastify/dist/index.css';

function toastMessage(message: string) {
    toast(message, {
        autoClose: 3000,
        theme: "colored",
        type: "info"
    });
}

export function defineContextMenu() {

    const blocklyStore = useBlocklyStore();
    const editorStore = useEditorStore();

    Blockly.ContextMenuRegistry.registry.register({
        displayText: "テキストとしてコピー（子ブロックなし）",
        id: "copy as xml without children",
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        weight: 100,
        callback: () => {
            const xml = blocklyStore.copyBlockAsXml(false);
            if (xml) {
                editorStore.setCode(xml, "xml", true);
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(xml);
                    toastMessage("コピーしました。");
                }
            }
        },
        preconditionFn: () => {
            return "enabled"
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
                    toastMessage("コピーしました。");
                }
            }
        },
        preconditionFn: () => {
            return "enabled"
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
            return "enabled"
        },
    });
}