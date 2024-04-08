<script setup lang="ts">
import ModalEditor from "./components/ModalEditor.vue";
import ModalMacroSettings from "./components/ModalMacroSettings.vue";
import ModalCommandPalette from "./components/ModalCommandPalette.vue";
import DropdownMenu from "./components/DropdownMenu.vue";
import Tab from "./components/Tab.vue";
import ModalShortcutGuide from "./components/ModalShortcutGuide.vue";
import ModalTabSwitcher from "./components/ModalTabSwitcher.vue";
import ModalParameterEditor from "./components/ModalParameterEditor.vue";
import ReplayMenu from "./components/ReplayMenu.vue";
import ReplayInfo from "./components/ReplayInfo.vue";
import { onMounted, onUpdated, ref, watch } from "vue";
import { SourceCodeWriter, useAppStore } from "./stores/appStore";
import { useBlocklyStore } from "./stores/blocklyStore";
import { useEditorStore } from "./stores/editorStore";
import { useCommandPaletteStore } from "./stores/commandPaletteStore";
import { useMagicKeys } from "@vueuse/core";
import { useSortable } from "@vueuse/integrations/useSortable";
import { useQuasar } from "quasar";
import { useTabStore } from "./stores/tabStore";
import { useEditingMacro } from "./stores/editingMacro";
import { resize } from "./helpers/ui/resize"
import { useTabSwitcherStore } from "./stores/tabSwitcherStore";
import { useReplayStore } from "./stores/replayStore";
import { StatementPrefix } from "./definitions/generators/defineGenerator";
import { useNotificationStore } from "./stores/notificationStore";

const appStore = useAppStore();
const editing = useEditingMacro();
const tabStore = useTabStore();
const toaster = useNotificationStore();
const tabSwitcher = useTabSwitcherStore();
const blockly = useBlocklyStore();
const editor = useEditorStore();
const replayStore = useReplayStore();
const commandPalette = useCommandPaletteStore();
const quaser = useQuasar();
quaser.dark.set(true);

toaster.topMessageModal.isShowing = true;
const tabs = ref(null);
useSortable(tabs, tabStore.items, {
    animation: 150,
    onChange: () => { }
});

useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (replayStore.isReplaying) {
            return;
        }

        if (e.type === "keyup") {
            if (e.key === "Control") {
                if (tabSwitcher.modal.isShowing) {
                    tabSwitcher.changeToCurrentIndexTab();
                    return;
                }
            }
        }

        if (e.type === "keydown") {
            if (e.ctrlKey) {
                switch (e.key) {
                    case "Tab":
                        tabSwitcher.oepnOrIncrement();
                        e.preventDefault();
                        break;
                    case "p":
                        appStore.openDropdownMenus();
                        e.preventDefault();
                        break;
                    case "m":
                        appStore.openMacroMenu();
                        e.preventDefault();
                        break;
                    case "d":
                        blockly.getCurrentWorkspaceSession()?.cloneSelectedBlock();
                        e.preventDefault();
                        break;
                }
            }
        }
    }
});

watch(tabStore.items, () => {
    resize();
});


onMounted(async () => {
    const container = document.getElementById('blocklyDiv') as HTMLElement;
    blockly.registerNewWorkspaceSession(container, async (event, session) => {
        // console.log("[event]", event);
        
        // @ts-ignore
        if (event.type === "bubble_open" && !event.isOpen) {
            if (editing.macro?.hasParameterChanged) {
                console.log("check assigns!");
            }
        }

        if (event.isUiEvent) {
            return;
        }

        const macro = editing.macro;
        if (!macro) {
            return;
        }

        const parameters = session.getParametersOfEntryBlock();
        macro.setParameters(parameters);

        const logger = editing.macro?.setting?.debug?.logger;
        if (logger) {
            const prefix = logger.enabled ? StatementPrefix.CHECK_POINT : StatementPrefix.NONE;
            const javascript = session.createCode(prefix);
            const json = session.getState();
            SourceCodeWriter.Default.write({ javascript, json });
        }
    });
    window.addEventListener("resize", resize);
    resize();
    await appStore.fetchImplementationFile();
    appStore.openMacroMenu();
});

onUpdated(() => {
    blockly.getCurrentWorkspaceSession()?.resizeWorkspaceSvg();
    resize();
});
</script>

<template>
    <div class="columns">
        <!-- ワークスペースの上に表示するコンテンツ -->
        <div id="top-row" style="height: 35px;">
            <div class="absolute-top-left full-width">
                <div class="row">
                    <!-- タブとタブ横のボタンを表示するコンテンツ -->
                    <div class="col flex no-wrap">
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
                                    <Tab 
                                        v-for="tab in tabStore.items" 
                                        :key="tab.id" 
                                        :id="tab.id"
                                        :header="tab.header"
                                        :icon-name="tab.iconName"
                                        :icon-color="tab.iconColor"
                                        :can-close-button-show="tab.canCloseButtonShow"
                                        :is-active="tabStore.selectedTab === tab.id"
                                        @close="tabStore.closeTab(tab)">
                                    </Tab>
                                </div>
                            </q-tabs>
                            <!-- タブ横ボタン -->
                            <div id="tab-side-content" class="flex no-wrap">
                                <div v-if="editing.hasMacro()">
                                    <q-btn flat icon="add" size="sm" class="side-button q-px-md full-height" @click="appStore.openMenuToAddFile"/>
                                    <q-tooltip>イベントを追加</q-tooltip>
                                </div>
                                <q-separator vertical inset class="" />
                                <div v-if="editing.hasMacro()">
                                    <q-btn flat icon="settings" size="sm" class="side-button q-px-md full-height" @click="appStore.openMacroSetting"/>
                                    <q-tooltip>マクロの設定</q-tooltip>
                                </div>
                                <div>
                                    <q-btn flat icon="menu" size="sm" class="open-menu-button side-button q-px-md full-height" @click="appStore.openDropdownMenus"/>
                                    <q-tooltip>省略されたメニューを表示</q-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="menus" class="flex">
                        <q-btn 
                            color="green-6" label="マクロ一覧" 
                            class="full-height override-button-icon-margin font-size-12 q-my-none"
                            @click="appStore.openMacroMenu()" />
                        <!-- ドロップダウンメニュー -->
                        <div class="menu" v-for="menu in appStore.appDropDownMenus" :key="menu.header">
                            <DropdownMenu :items="menu.menuItems">
                                <template #button>
                                    <div class="dropdown-header">{{ menu.header }}</div>
                                </template>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <ReplayMenu class="absolute-top-left"></ReplayMenu>
            </div>
        </div>
        <!-- ワークスペースとツールボックス -->
        <div id="blockly-space" class="full-height full-width">
            <div id="blocklyArea"></div>
            <div id="blocklyDiv" style="position: absolute;"></div>
            <ReplayInfo></ReplayInfo>
        </div>
        <div v-if="toaster.topMessage" class="full-width full-height flex justify-center align-center relative-position">
            <div style="max-width: 40%; min-width: 25%; min-height: 50px; max-height: 100px; border: solid 1px var(--border-color)"
                class="flex justify-center bg-blue q-mt-md rounded insert-shadow">
                <span class="self-center blinking">{{ toaster.topMessage }}</span>
            </div>
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
        <ModalShortcutGuide></ModalShortcutGuide>
        <ModalTabSwitcher></ModalTabSwitcher>
        <ModalParameterEditor></ModalParameterEditor>
        <!-- <Modal :state="toaster.topMessageModal">
            <template #content>
                <div style="width: 200px; height: 30px; background-color: green;">

                </div>
            </template>
        </Modal> -->
    </Teleport>
</template>

<style>

:root {
    --tab-height: 35px;
}

#top-row {
    background: var(--bg-color-app);
}

#tabs {
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
    font-size: 12px !important;
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
    .menu {
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