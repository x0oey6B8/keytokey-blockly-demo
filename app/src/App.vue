<script setup lang="ts">
import { onMounted } from "vue";
import { useBlocklyStore } from "./stores/blocklyStore";
import Modal from "./components/modal/Modal.vue"
import Editor from "./components/Editor.vue";
import { useEditorStore } from "./stores/editorStore";
import { useNotificationStore } from "./stores/notificationStore";
const store = useBlocklyStore();
const editorStore = useEditorStore();
const notification = useNotificationStore();

onMounted(() => {
    const container = document.getElementById('blocklyDiv') as HTMLElement;
    store.injectBlockly(container);
});

function createCode() {
    const code = store.createCode();
    editorStore.setCode(code, "javascript", true);
}

function createDecodedCode() {
    const code = store.createDecodedCode();
    editorStore.setCode(code, "javascript", true);
}

function copyWorkspace() {
    const xml = store.createXml();
    editorStore.setCode(xml, "xml", true);
    if (navigator.clipboard) {
        navigator.clipboard.writeText(xml);
        notification.toastMessage("コピーしました。");
    }
}

</script>

<template>
    <div class="grid-container">
        <div class="button-container">
            <button @click.stop="store.runCode">実行</button>
            <button @click.stop="createCode()">コード生成</button>
            <button @click.stop="createDecodedCode()">コード生成（デコード後）</button>
            <button @click.stop="copyWorkspace">ワークスペースの内容をコピー</button>
            <button @click.stop="store.clearWorkspace()">ワークスペースをクリア</button>
        </div>
        <div>
            <div id="blocklyArea"></div>
            <div id="blocklyDiv" style="position: absolute;"></div>
        </div>
    </div>
    <Teleport to="body">
        <Modal :show="editorStore.showModal" @close="editorStore.showModal = false">
            <template #content><Editor></Editor></template>
        </Modal>
    </Teleport>
</template>

<style scoped>
#blocklyDiv {
    height: 96%;
    width: 100%;
    border: none;
}

.grid-container {
    display: grid;
    grid-template-rows: auto 1fr;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    background-color: #121212;
    padding: 3px 5px;
}

button {
    background-color: #121212;
    border: none;
    font-size: 12px;
    color: #e9e9e9;
    box-shadow: 2;
    font-family: Noto Sans Jp;
    padding: 7px 10px;
    border-radius: 2px;

}

button:hover {
    background-color: #323232;
    cursor: pointer;
}

</style>
