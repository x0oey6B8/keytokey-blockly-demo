import Blockly from "blockly";
import { useEditorStore } from "../stores/editorStore";
import { useBlocklyStore } from "../stores/blocklyStore";

export function defineWorkspaceContextMenu() {

    const blocklyStore = useBlocklyStore();
    const editorStore = useEditorStore();

    Blockly.ContextMenuRegistry.registry.register({
        displayText: "コピー（xml）",
        id: "copy as xml",
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        weight: 100,
        callback: () => {
            const xml = blocklyStore.copyBlockAsXml(true);
            if (xml) {
                editorStore.setCode(xml, "xml", true);
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(xml);
                }
            }
        },
        preconditionFn: () => {
            return "enabled"
        },
    });

    Blockly.ContextMenuRegistry.registry.register({
        displayText: "貼り付け（xml）",
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