<script setup lang="ts">
import ModalEditor from "./components/ModalEditor.vue";
import ModalMacroSettings from "./components/ModalMacroSettings.vue";
import ModalCommandPalette from "./components/ModalCommandPalette.vue";
import DropdownMenu from "./components/DropdownMenu.vue";
import CloseableTab from "./components/CloseableTab.vue";
import ShortcutGuide from "./components/ShortcutGuide.vue";
import { onMounted, onUpdated, ref, watch } from "vue";
import { SourceCodeWriter, useAppStore } from "./stores/appStore";
import { useBlocklyStore } from "./stores/blocklyStore";
import { useEditorStore } from "./stores/editorStore";
import { useCommandPaletteStore } from "./stores/commandPaletteStore";
import { useMagicKeys } from "@vueuse/core";
import { useSortable } from "@vueuse/integrations/useSortable";
import { useMacroSettingsStore } from "./stores/useMacroSettingsStore";
import { useQuasar } from "quasar";
import { useTabStore } from "./stores/tabStore";
import { useEditingMacro } from "./stores/editingMacro";
import { resize } from "./helpers/ui/resize"

const appStore = useAppStore();
const editing = useEditingMacro();
const tabStore = useTabStore();
const blockly = useBlocklyStore();
const editor = useEditorStore();
const commandPalette = useCommandPaletteStore();
const macroSettingsStore = useMacroSettingsStore();
const quaser = useQuasar();
quaser.dark.set(true);


const tabs = ref(null);
useSortable(tabs, tabStore.items, {
    animation: 150,
    onChange: () => { }
});

useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (e.ctrlKey && e.key === 'p' && e.type === "keydown") {
            appStore.openDropdownMenus();
            e.preventDefault();
        }
        else if (e.ctrlKey && e.key === 'm' && e.type === "keydown"){
            appStore.openMacroMenu();
            e.preventDefault();
        }
        else if (e.ctrlKey && e.key === 'Tab' && e.type === "keydown") {
            tabStore.selectNextTab();
            e.preventDefault();
        }
    }
});

watch(tabStore.items, () => {
    resize();
});

onMounted(async () => {
    const container = document.getElementById('blocklyDiv') as HTMLElement;
    blockly.registerNewWorkspaceSession(container, SourceCodeWriter.Default);
    window.addEventListener("resize", resize);
    resize();
    await appStore.readImplementationFile();
    appStore.openMacroMenu();
    //blockly.getCurrentWorkspaceSession()?.setInitialScrollPosition();
});

onUpdated(() => {
    resize();
});
</script>

<template>
    <div class="columns">
        <!-- ワークスペースの上に表示するコンテンツ -->
        <div id="first-row" class="row first-row">
            <!-- タブとタブ横のボタンを表示するコンテンツ -->
            <div id="first-row-left" class="col flex no-wrap content-start v-touch-pan.mouse.horizontal">
                <div class="flex no-wrap">
                    <q-tabs
                        id="tabs"
                        draggable
                        outside-arrows
                        v-model="tabStore.selectedTab" 
                        indicator-color="green" 
                        class="tabs text-white full-height">
                        <!-- マクロが選択されてないときに表示するタブ -->
                        <q-tab class="tab" name="no-macro-selected" label="マクロが選択されていません" no-caps v-if="!editing.hasMacro()">
                            <q-tooltip>右側にある「マクロ一覧」からマクロを選択してください</q-tooltip>
                        </q-tab>
                        <!-- タブ -->
                        <div ref="tabs" class="flex no-wrap">
                            <CloseableTab 
                                v-for="tab in tabStore.items" 
                                :key="tab.id" 
                                :id="tab.id"
                                :header="tab.header"
                                :icon-name="tab.iconName"
                                :icon-color="tab.iconColor"
                                :can-close-button-show="tab.canCloseButtonShow"
                                :is-active="tabStore.selectedTab === tab.id"
                                @close="tabStore.closeTab(tab)">
                            </CloseableTab>
                        </div>
                    </q-tabs>
                </div>
                <!-- タブ横ボタン -->
                <div id="tab-side-content" class="flex no-wrap" v-if="editing.hasMacro()">
                    <div>
                        <q-btn flat icon="add" size="sm" class="side-button q-px-md full-height" @click="appStore.openMenuToAddFile"/>
                        <q-tooltip>イベントを追加</q-tooltip>
                    </div>
                    <q-separator vertical inset class="" />
                    <div>
                        <q-btn flat icon="settings" size="sm" class="side-button q-px-md full-height" @click="macroSettingsStore.modalState.isShowing = true"/>
                        <q-tooltip>マクロの設定</q-tooltip>
                    </div>
                </div>
            </div>
            <div id="first-row-right" class="flex">
                <div>
                    <q-btn 
                        color="green-6" label="マクロ一覧" 
                        class="full-height override-button-icon-margin font-size-12 q-my-none"
                        @click="appStore.openMacroMenu()" />
                </div>
                <!-- ウィンドウの幅が小さいときに表示するメニューボタン -->
                <q-btn 
                    color="bg-dark" icon="menu" label="メニュー" 
                    class="open-menu-button full-height override-button-icon-margin font-size-12"
                    @click="appStore.openDropdownMenus()" />
                <!-- ドロップダウンメニュー -->
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
        <!-- ワークスペースとツールボックス -->
        <div class="row">
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
        <ModalMacroSettings></ModalMacroSettings>
        <ShortcutGuide></ShortcutGuide>
    </Teleport>
</template>

<style>

:root {
    --tab-height: 35px;
}

.first-row {
    background: var(--bg-color-app);
}

/* .q-scrollarea__bar--h, .q-scrollarea__thumb--h{
    bottom: 0px !important;
    height: 3px;
} */

.tabs {
    max-height: var(--tab-height) !important;
}

.tab {
    max-height: var(--tab-height) !important;
}

.q-tab {
    min-height: var(--tab-height) !important;
    max-height: var(--tab-height) !important;
}

.q-tab--inactive {
    min-height: var(--tab-height) !important;
}

.q-tab__label {
    line-height: 0 !important;
    font-size: var(--font-size-12) !important;
}

.q-tabs {
    min-height: var(--tab-height) !important;
    max-height: var(--tab-height) !important;
}

.q-tabs__arrows--outside {
    min-height: var(--tab-height) !important;
}

.q-tabs__content {
    justify-content: start !important;
}


#blocklyDiv {
    width: 100%;
    border: none;
}

button {
    display: flex;
    align-items: center;
    background-color: #252525;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    font-family: Noto Sans Jp;
    color: var(--font-color);
    box-shadow: 2;
    padding: 7px 10px;
    white-space: nowrap;
    transition: opacity 0.5s;
}

button:hover {
    background-color: var(--hover-color);
    cursor: pointer;
}

.dropdown-menus {
    display: flex;
}

.open-menu-button {
    display: none !important;
}

@media (width <= 1200px) {
    .dropdown-menus {
        display: none;
    }

    .open-menu-button {
        display: flex !important;
    }
}

.dropdown-header {
    user-select: none;
    font-size: 12px;
}
</style>