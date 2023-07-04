<script setup lang="ts">
import { onMounted } from "vue";
import { useBlocklyStore } from "./stores/blocklyStore";
import Modal from "./components/modal/Modal.vue"
import Editor from "./components/Editor.vue";
import { useEditorStore } from "./stores/editorStore";
const store = useBlocklyStore();
const editorStore = useEditorStore();

onMounted(() => {
    const container = document.getElementById('blocklyDiv') as HTMLElement;
    store.injectBlockly(container);
});

function createCode() {
    const code = store.createCode();
    editorStore.setCode(code, "javascript", true);
}
</script>

<template>
    <div class="grid-container">
        <div class="button-container">
            <button @click.stop="editorStore.showModal = true;">show modal</button>
            <button @click.stop="createCode()">create javascript code</button>
            <button @click.stop="store.clearWorkspace()">clear workspace</button>
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
    height: 97%;
    width: 100%;
    border: none;
}

.grid-container {
    display: grid;
    grid-template-rows: auto 1fr;
}

.button-container {
    display: flex;
    background-color: #121212;
    padding: 3px 5px;
}
</style>
