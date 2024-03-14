import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { WorkspaceSession, useBlocklyStore } from "./blocklyStore";
import { useEditingMacro } from "./editingMacro";
import { useEditorStore } from "./editorStore";
import { StatementPrefix } from "../definitions/generators/defineGenerator";
import * as monaco from "monaco-editor"

export const useReplayStore = defineStore("replay", () => {

    const blockly = useBlocklyStore();
    const editing = useEditingMacro();
    const editor = useEditorStore();
    const isReplaying = ref(false);
    const ids = ref<string[]>([]);
    const selectedIndex = ref(0);
    const blockName = ref("");
    let session: (WorkspaceSession | undefined) = undefined;

    watch(selectedIndex, () => focus());

    return {
        isReplaying,
        ids,
        selectedIndex,
        blockName,
        increment,
        decrement,
        jump,
        beginReplayMode,
        endReplayMode,
        showCode
    }

    function focus() {
        if (session) {
            const index = selectedIndex.value;
            if (index >= 0 && index < ids.value.length) {
                const id = ids.value[index];
                const block = session.workspaceSvg.getBlockById(id);
                if (block) {
                    session.centerTo(block);
                    blockName.value = block.type
                }
            }
        }
    }

    function beginReplayMode(newIds: string[]) {
        ids.value = newIds;
        blockName.value = "";
        selectedIndex.value = 0;
        session = blockly.getCurrentWorkspaceSession();
        session?.setToolboxVisiblity(false);
        session?.makeWorkspaceReadOnly();
        if (editing.file) {
            editing.file.canWrite = false;
        }
        isReplaying.value = true;
        focus();
    }

    function endReplayMode() {
        ids.value.length = 0;
        selectedIndex.value = 0;
        session?.setToolboxVisiblity(true);
        session?.makeWorkspaceEditable();
        session = undefined;
        if (editing.file) {
            editing.file.canWrite = true;
        }
        isReplaying.value = false;
    }

    function increment() {
        selectedIndex.value++;
        console.log(selectedIndex.value, ids.value.length);
        if (selectedIndex.value > (ids.value.length - 1)) {
            selectedIndex.value = 0;
        }
    }

    function decrement() {
        selectedIndex.value--;
        if (selectedIndex.value < 0) {
            selectedIndex.value = ids.value.length - 1;
        }
    }

    function jump(index: number) {
        if (index >= 0 && index < ids.value.length) {
            selectedIndex.value = index;
        }
    }

    function showCode() {
        if (!session) {
            return;
        }

        const block = session.getSelectedBlock();
        if (!block) {
            const code = session.createDecodedCode(StatementPrefix.NONE);
            editor.setCode(code, "javascript", true);
            return;
        }

        const id = block.id;
        const code = session.createDecodedCode(StatementPrefix.CHECK_POINT);
        const trimmedCode = removeCheckPoints(code, id);
        const lineNumber = trimmedCode.split('\n').findIndex(line => line.includes(id)) + 1;

        editor.setCode(trimmedCode, "javascript", true, [{
            range: new monaco.Range(lineNumber, 0, lineNumber, 0),
            options: {
                isWholeLine: true,
                className: "editor-highlight-line"
            }
        }]);
    }

    function removeCheckPoints(code: string, excludedId: string) {
        // 改行文字で分割
        const lines = code.split('\n');
        // 特定の文字列を含む行を削除
        const filteredLines = lines.filter(line => !line.includes(`checkPoint(`) || line.includes(excludedId));
        return filteredLines.join('\n');
    }
});