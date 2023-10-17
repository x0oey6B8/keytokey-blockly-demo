<script setup lang="ts">
import { onMounted } from "vue";
import ModalEditor from "./components/ModalEditor.vue";
import ModalCommandPalette from "./components/ModalCommandPalette.vue";
import DropdownMenu from "./components/DropdownMenu.vue";
import Tab from "./components/Tab.vue";
import Setting from "./components/icons/Setting.vue"
import Plus from "./components/icons/Plus.vue"
import Menu from "./components/icons/Menu.vue"
import { useAppStore } from "./stores/appStore";
import { useBlocklyStore } from "./stores/blocklyStore";
import { useEditorStore } from "./stores/editorStore";
import { useCommandPaletteStore } from "./stores/commandPaletteStore";

const appStore = useAppStore();
const blockly = useBlocklyStore();
const editor = useEditorStore();
const commandPalette = useCommandPaletteStore();
// const overflow = ref(false);

onMounted(() => {
    const container = document.getElementById('blocklyDiv') as HTMLElement;
    blockly.registerNewWorkspaceSession(container);
    window.addEventListener("resize", resize);
    resize();
    appStore.openMacroMenu();
    blockly.getCurrentWorkspaceSession()?.setInitialScrollPosition();
});

function resize() {
    const firstRow = document.querySelector(".first-row-container") as HTMLElement;
    const height = firstRow.clientHeight;
    const blocklyDiv = document.getElementById('blocklyDiv') as HTMLElement;
    blocklyDiv.style.height = (window.innerHeight - height - 1) + 'px';
    blockly.getCurrentWorkspaceSession()?.resizeWorkspaceSvg();

    // const overlay = document.getElementById("overlay") as HTMLElement;
    // overlay.style.width = blocklyDiv.clientWidth + "px";
    // overlay.style.height = blocklyDiv.clientHeight + "px";
    // overflow.value = window.innerWidth < firstRow.clientWidth;
}
</script>

<template>
    <div class="grid-container">
        <div class="first-row-container">
            <div class="tab-container">
                <span v-if="appStore.currentMacro == undefined"
                    style="margin: 0px 0px 6px 12px; font-size: 14px; color: #777;">
                    マクロが選択されていません
                </span>
                <Tab :tabs="appStore.tabs"></Tab>
                <div class="icon-container">
                    <Plus class="icon" :disabled="true"></Plus>
                    <span class="separator">|</span>
                    <Setting class="icon" :disabled="true"></Setting>
                </div>
            </div>
            <div class="button-container">
                <button id="button" @click="appStore.openMacroMenu()">
                    <Menu class="icon" style="margin: 0"></Menu>
                    <span style="margin-bottom: 3px;">マクロ一覧</span>
                </button>
                <button class="dropdown-menus-button" @click="appStore.openDropdownMenus()">
                    <Menu class="icon" style="margin: 0"></Menu>
                    <span style="margin-bottom: 3px;">メニュー</span>
                </button>
                <!-- ドロップダウンメニュー -->
                <!-- :class="{'hidden-overflow': overflow}" -->
                <div class="dropdown-menus">
                    <div class="menu" v-for="menu in appStore.appDropDownMenus" :key="menu.header">
                        <DropdownMenu :items="menu.menuItems">
                            <template #button>
                                <div class="dropdown-header">{{ menu.header }}</div>
                            </template>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
        <div style="position: relative; background-color: transparent;">
            <!-- <div id="overlay" style="background-color: transparent; z-index: 3; position: absolute; pointer-events: none;">
                <div style="display: flex; justify-content: end;" background-color="transparent">
                    <div class="side-menu-container">
                        <Menu class="icon side-menu-toggle" style="margin: 0"></Menu>
                        <div class="side-menu">
                            <button id="button" style="height: 35px;" @click="appStore.openMacroMenu()">
                                <Menu class="icon" style="margin: 0"></Menu>
                                <span style="margin-bottom: 3px;">マクロ一覧</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div> -->
            <div id="blocklyArea"></div>
            <div id="blocklyDiv" style="position: absolute;"></div>
        </div>
    </div>
    <Teleport to="body">
        <ModalEditor :modal-state="editor.modalState"></ModalEditor>
        <ModalCommandPalette 
            :modal-state="commandPalette.modalState"
            :items="commandPalette.commandItems"
            :hint="commandPalette.hint"
            :text="commandPalette.text"
            :filtering="commandPalette.filtering"
            :text-validator="commandPalette.textValidator"
            :close-auto="commandPalette.closeAuto">
        </ModalCommandPalette>
    </Teleport>
</template>

<style>


/* .side-menu-container {
    margin-right: 175px;
    margin-top: 5px;
    pointer-events: auto;
    position: relative;
}

.side-menu {
    height: 35px; 
    padding: 7px;
    border-radius: 8px;
    background-color: #2A2A2A;
    position: absolute;
    left: -130px;
    top: 5px;
}

.side-menu-toggle {
    position: absolute;
    left: -155px;
    top: 280px;
    padding: 5px;
    background-color: #2A2A2A;
    border-radius: 5px 0 0 5px;
} */

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
    /* fill: #424242; */
    user-select: none;
}

.icon:hover:not([disabled]) {
    opacity: 0.7;
    cursor: pointer;
}

.icon[disabled] {
    cursor: default;
    fill: #424242;
}

.separator {
    color: #9C9C9C;
    /* color: #424242; */
    margin: 0 3px;
    user-select: none;
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
    height: 35px;
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
    background-color: #43A047;
    user-select: none;
    padding: 0 12px;
    box-shadow: #9C9C9C;
}

#button:hover {
    opacity: 0.7;
}

.disabled-button {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
}
.dropdown-menus {
    /* overflow-x: hidden; */
    display: flex;
}

.dropdown-menus-button {
    display: none;
}

@media (width <= 1200px) {
    .dropdown-menus {
        display: none;
    }

    .dropdown-menus-button {
        display: flex;
    }
}

.hidden-overflow {
    display: none;
}
.dropdown-header {
    user-select: none;
}

.tab-container {
    display: flex;
    align-items: end;
}

</style>