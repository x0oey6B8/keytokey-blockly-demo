<script setup lang="ts">
import { onMounted } from "vue";
import { useBlocklyStore } from "./stores/blocklyStore";
import Modal from "./components/modal/Modal.vue"
import Editor from "./components/Editor.vue";
import { useEditorStore } from "./stores/editorStore";
import { useNotificationStore } from "./stores/notificationStore";
import { IDropDownMenuItem } from "./components/DropdownMenu.vue";
import DropdownMenu from "./components/DropdownMenu.vue";
import { StatementPrefix } from "./definitions/generators/defineGenerator";
import { GlobalFactory, GlobalRegister } from "./scripts/global";
const store = useBlocklyStore();
const editorStore = useEditorStore();
const notification = useNotificationStore();

const codeGenerationMenuItems: IDropDownMenuItem[] = [
    {
        header: "デコードなし",
        enabled: true,
        clicked: () => createCode(),
    },
    {
        header: "デコードなし（デバッグ用）",
        enabled: true,
        clicked: () => createCode(StatementPrefix.HIGHLIGHT_BLOCK)
    },
    {
        header: "デコードなし（PREFIXなし）",
        enabled: true,
        clicked: () => createCode(StatementPrefix.NONE)
    },
    {
        header: "デコードあり",
        enabled: true,
        clicked: () => createDecodedCode()
    },
    {
        header: "デコードあり（デバッグ用）",
        enabled: true,
        clicked: () => createDecodedCode(StatementPrefix.HIGHLIGHT_BLOCK)
    },
    {
        header: "デコードあり（PREFIXなし）",
        enabled: true,
        clicked: () => createDecodedCode(StatementPrefix.NONE)
    }
]

onMounted(() => {
    const container = document.getElementById('blocklyDiv') as HTMLElement;
    store.injectBlockly(container);
});

function createCode(prefix: StatementPrefix = StatementPrefix.THROW_INTERRUPTED_EXCEPTION) {
    const code = store.createCode(prefix);
    editorStore.setCode(code, "javascript", true);
}

function createDecodedCode(prefix: StatementPrefix = StatementPrefix.THROW_INTERRUPTED_EXCEPTION) {
    const code = store.createDecodedCode(prefix);
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

function runCode() {
    const instance = new GlobalFactory().create();
    const register = new GlobalRegister();
    register.register(instance);
    //store.runCode();
}
</script>

<template>
    <div class="grid-container">
        <div class="button-container">
            <button @click.stop="runCode">実行（開発中）</button>
            <DropdownMenu ref="generatingMenu" :items="codeGenerationMenuItems">
                <template #button>
                    <div>
                        コード生成
                    </div>
                </template>
            </DropdownMenu>
            <button @click.stop="copyWorkspace">ワークスペースの内容をコピー</button>
            <button @click.stop="store.clearWorkspace">ワークスペースをクリア</button>
        </div>
        <div>
            <div id="blocklyArea"></div>
            <div id="blocklyDiv" style="position: absolute;"></div>
        </div>
    </div>
    <Teleport to="body">
        <Modal :show="editorStore.showModal" @close="editorStore.showModal = false">
            <template #content>
                <Editor></Editor>
            </template>
        </Modal>
    </Teleport>
</template>

<style>
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

.dropBtn {
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
