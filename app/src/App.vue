<script setup lang="ts">
import { onMounted, ref } from "vue";
import ModalEditor from "./components/ModalEditor.vue";
import ModalCommand from "./components/ModalCommand.vue";
import DropdownMenu from "./components/DropdownMenu.vue";
import Setting from "./components/icons/Setting.vue"
import Plus from "./components/icons/Plus.vue"
import Menu from "./components/icons/Menu.vue"
import { useAppStore } from "./stores/appStore";
import { useBlocklyStore } from "./stores/blocklyStore";
import { useEditorStore } from "./stores/editorStore";
import { useCommandStore } from "./stores/commandStore";

const appStore = useAppStore();
const blocklyStore = useBlocklyStore();
const editorStore = useEditorStore();
const commandStore = useCommandStore();

const tabs = ref<ITab[]>([
    {
        id: crypto.randomUUID(),
        name: "マクロの名前マクロの名前マクロの名前マクロの名前マクロの名前マクロの名前",
        isActive: true
    },
    {
        id: crypto.randomUUID(),
        name: "マクロ終了時",
        isActive: false
    },
    {
        id: crypto.randomUUID(),
        name: "イベント2",
        isActive: false
    },
])

interface ITab {
    id: string,
    name: string,
    isActive: boolean
}

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

    // const toolbox = document.querySelector(".blocklyToolboxDiv") as HTMLElement;
    // const width = toolbox.clientWidth;
    // const button = document.getElementById("button") as HTMLButtonElement;
    // button.style.width = width + "px";
}

function activeTab(tabToActive: ITab) {
    for (const tab of tabs.value) {
        tab.isActive = false;
    }

    tabToActive.isActive = true;
}

</script>

<template>
    <div class="grid-container">
        <div class="first-row-container">
            <div class="button-container">
                <div class="tab-container">
                    <div class="tab"
                        :class="{ 'tab-active': tab.isActive }"
                        @click="activeTab(tab)"
                        v-for="tab in tabs">
                        <span class="tab-text">{{ tab.name }}</span>
                    </div>
                </div>
                <div class="icon-container">
                    <Plus class="icon"></Plus>
                    <span class="separator">|</span>
                    <Setting class="icon"></Setting>
                </div>
            </div>
            <!-- <div class="text-container">
                <div class="text">マクロの名前</div>
            </div> -->
            <div class="button-container">
                <button id="button" @click="appStore.showMacroMenuCommand()">
                    <Menu class="icon" style="margin: 0"></Menu>
                    <span style="margin-bottom: 3px;">マクロ一覧</span>
                </button>
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

.icon-container {
    display: flex;
    align-items: end;
    padding: 3px;
}

.icon {
    width: 20px;
    height: 20px;
    margin: 0 8px;
    fill: #E7E7E7;
    user-select: none;
}

.icon:hover {
    opacity: 0.7;
    cursor: pointer;
}

.separator {
    color: #9C9C9C;
    margin: 0 3px;
}

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
    /* background-color: #252525; */
    padding: 0px 0px;
}

button {
    display: flex;
    align-items: center;
    background-color: #252525;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    font-family: Noto Sans Jp;
    color: #e9e9e9;
    box-shadow: 2;
    padding: 7px 10px;
    white-space: nowrap;
}

button:hover {
    background-color: #323232;
    cursor: pointer;
}

#button {
    background-color: green;
    user-select: none;
    padding: 0 12px;
}

#button:hover {
    opacity: 0.7;
}

.disabled-button {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
}

.tab-container {
    display: flex;
    align-items: end;
}

.tab {
    display: flex;
    align-items: center;
    user-select: none;
    font-size: 12px;
    color: #E7E7E7;
    /* background-color: #1B5E20; */
    padding-left: 15px;
    padding-right: 15px;
    border-left: solid 1px #424242;
    border-top: solid 1px #424242;
    border-right: solid 1px #424242;
    border-top-left-radius: 3px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 1px;
    min-width: 60px;
    max-width: 200px;
    height: 24px;
    margin-left: 1px;
    margin-right: 1px;
    overflow: hidden;
}

.tab-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    flex: 1;
    text-align: center;
}

.tab:hover {
    color: #C7C7C7;
    background-color: #424242;
    cursor: pointer;
}

.tab-active {
    background-color: #2E7D32;
}

.tab-active:hover {
    background-color: #2E7D32;
    color: #E7E7E7;
}

</style>
