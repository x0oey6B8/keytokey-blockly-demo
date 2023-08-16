<script setup lang="ts">
import { onMounted } from "vue";
import ModalEditor from "./components/ModalEditor.vue";
import ModalCommand from "./components/ModalCommand.vue";
import DropdownMenu from "./components/DropdownMenu.vue";
import { useAppStore } from "./stores/appStore";
import { useBlocklyStore } from "./stores/blocklyStore";
import { useEditorStore } from "./stores/editorStore";
import { useCommandStore } from "./stores/commandStore";

const appStore = useAppStore();
const blocklyStore = useBlocklyStore();
const editorStore = useEditorStore();
const commandStore = useCommandStore();

onMounted(() => {
    const container = document.getElementById('blocklyDiv') as HTMLElement;
    blocklyStore.injectBlockly(container);

    window.addEventListener("resize", () => {
        resize();
    })

    resize();
});

function resize() {
    const firstRow = document.querySelector(".button-container") as HTMLElement;
    const height = firstRow.clientHeight;
    const blocklyDiv = document.getElementById('blocklyDiv') as HTMLElement;
    blocklyDiv.style.height = (window.innerHeight - height - 1) + 'px';
    blocklyStore.resizeWorkspaceSvg();

    const toolbox = document.querySelector(".blocklyToolboxDiv") as HTMLElement;
    const width = toolbox.clientWidth;
    const button = document.getElementById("button") as HTMLButtonElement;
    button.style.width = width + "px";
}

</script>

<template>
    <div class="grid-container">
        <div class="first-row-container">
            <div class="button-container">
                <button id="button" @click="appStore.showMacroMenuCommand()">マクロ一覧</button>
            </div>
            <div class="text-container">
                <div class="text">マクロの名前</div>
            </div>
            <div class="button-container">
                <DropdownMenu :items="appStore.findMenuItems">
                    <template #button>
                        <div>探す</div>
                    </template>
                </DropdownMenu>
                <DropdownMenu :items="appStore.workspaceMenuItems">
                    <template #button>
                        <div>ワークスペース</div>
                    </template>
                </DropdownMenu>
                <DropdownMenu ref="generatingMenu" :items="appStore.codeGenerationMenuItems">
                    <template #button>
                        <div>
                            コード生成
                        </div>
                    </template>
                </DropdownMenu>
            </div>
        </div>
        <div>
            <div id="blocklyArea"></div>
            <div id="blocklyDiv" style="position: absolute;"></div>
        </div>
    </div>
    <Teleport to="body">
        <ModalEditor :modal-state="editorStore.modalState"></ModalEditor>
        <ModalCommand 
            :modal-state="commandStore.modalState"
            :items="commandStore.commandItems"
            :hint="commandStore.hint">
        </ModalCommand>
    </Teleport>
</template>

<style>
#blocklyDiv {
    /* height: 100%; */
    width: 100%;
    border: none;
}

.grid-container {
    display: grid;
    grid-template-rows: auto 1fr;
}

.first-row-container {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
}

.text-container {
    flex: 1;
    color: #C7C7C7;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin: 3px 0; */
    user-select: none;
}

.text {
    font-family: initial;
    font-size: 13px;
}

.button-container {
    display: flex;
    background-color: #252525;
    padding: 0px 0px;
}

button {
    background-color: #252525;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    font-family: Noto Sans Jp;
    color: #e9e9e9;
    box-shadow: 2;
    padding: 7px 10px;

}

button:hover {
    background-color: #323232;
    cursor: pointer;
}

#button {
    background-color: green;
}

#button:hover {
    opacity: 0.7;
}

.disabled-button {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
}

</style>
