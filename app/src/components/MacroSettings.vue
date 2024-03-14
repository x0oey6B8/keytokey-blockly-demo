<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useEditingMacro } from '../stores/editingMacro';
import { regenerateCode } from '../models/regenerate';
import { useParameterEditorStore } from '../stores/parameterEditor';
import { useMacroSettingsStore } from '../stores/macroSettingsStore';

export interface ISettingTab {
    header: string;
    isSelected: boolean;
}

const store = useMacroSettingsStore();
const editingMacro = useEditingMacro();
const parameterEditor = useParameterEditorStore();
const macroName = ref("");
const isLoggerEnabled = ref(false);
const preload = ref(false);
if (editingMacro.macro) {
    const setting = editingMacro.macro.setting;
    macroName.value = setting.name;
    isLoggerEnabled.value = setting.debug.logger.enabled;
    preload.value = true;
}

watch(isLoggerEnabled, async (newValue) => {
    if (editingMacro.macro) {
        editingMacro.macro.setting.debug.logger.enabled = newValue;
        await editingMacro.macro.applySetting();
        regenerateCode();
    }
});

watch(preload, async (newValue) => {
    if (editingMacro.macro) {
        editingMacro.macro.setting.preload = newValue;
        await editingMacro.macro.applySetting();
    }
});

function changeTabSelection(clickedTab: ISettingTab) {
    for (const tab of store.tabs) {
        tab.isSelected = false;
    }
    clickedTab.isSelected = true;
    store.selectedTab = clickedTab.header;
}

function openParameterSetting() {
    parameterEditor.modal.isShowing = true;
    const store = useMacroSettingsStore();
    store.modalState.isShowing = false;
}

</script>


<template>
    <div class="entire">
        <div class="center-panel" @click.stop>
            <div class="header">
                <span class="font-size-14 header-title">{{ macroName }}</span>
                <span>の設定</span>
            </div>
            <hr/>
            <div class="settings">
                <div class="tabs-wrapper">
                    <div class="tabs">
                        <div v-for="tab in store.tabs" :key="tab.header">
                            <q-btn 
                                flat
                                class="fit-content tab-button" 
                                :class="{ selected: tab.isSelected }"
                                @click="changeTabSelection(tab)">
                                {{ tab.header }}
                            </q-btn>
                        </div>
                    </div>
                </div>
                <div class="contents-container">
                    <div class="q-py-sm">
                        <div v-if="store.selectedTab === '一般'">
                            <q-item tag="label" v-ripple style="user-select: none;" round>
                                <q-item-section>
                                    <q-item-label>事前読み込み</q-item-label>
                                    <q-item-label caption class="font-size-12">
                                        マクロを即時実行できる状態にします。
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-toggle color="green" val="friend" v-model="preload" />
                                </q-item-section>
                                <q-tooltip>
                                    オフ：<br>
                                    ・実行直前に読み込みます。<br>
                                    ・実行までの速度が遅くなります。<br>
                                    ・直前読み込みによってブロックの変更をリアルタイムで反映させることができます。<br>
                                    以下の要素はリアルタイム反映されません。<br>
                                    ・マクロの設定変更<br>
                                    ・引数の設定変更<br>
                                    ・イベントの追加<br>
                                </q-tooltip>
                            </q-item>
                        </div>
                        <div v-if="store.selectedTab === '引数'">
                            <q-item class="q-mb-md">
                                <q-item-section>
                                    <q-btn color="green" outline size="md" class="q-px-lg" @click="openParameterSetting">「マクロ選択画面」に表示する引数の設定</q-btn>
                                </q-item-section>
                            </q-item>
                        </div>
                        <div v-if="store.selectedTab === 'デバッグ'">
                            <q-item tag="label" v-ripple style="user-select: none;" class="rounded">
                                <q-item-section>
                                    <q-item-label>マクロの実行を記録</q-item-label>
                                    <q-item-label caption class="font-size-12">ブロックマクロが生成するコードに記録用のコードを挿入します。</q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-toggle color="green" v-model="isLoggerEnabled" val="friend" />
                                </q-item-section>
                                <q-tooltip>
                                    実行記録はデバッグメニューから再生することができます。<br>
                                    ※この設定はメモリの使用量が多くなるので必要なときにのみオンにしてください。
                                </q-tooltip>
                            </q-item>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .header {
        padding: 3px 0 10px 0px;
        grid-row: 1;
        display: flex;
        justify-content: center;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    .header span {
        user-select: none;
    }

    .header-title {
        max-width: 400px;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        user-select: none;
    }

    .tab-button {
        min-height: 1.972em !important;
        margin-bottom: 7px;
        border-radius: 6px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .tab-button:selected {
        background: var(--secondary-bg-color);
    }

    .entire {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .center-panel {
        width: 600px;
        height: 400px;
        padding: 12px;
        margin-bottom: 60px;
        border-radius: 10px;
        border: 1px solid var(--border-color);
        background-color: var(--bg-color-app);
        display: grid;
        grid-template-rows: 45px auto 1fr;
    }

    .settings {
        display: flex;
        grid-row: 3;
        width: 100%;
        margin-top: 0px;
    }

    .tabs-wrapper {
        margin-top: 14px;
        width: 25%;
        /* height: 100%; */
        border-right: 1px solid var(--border-color);
        padding-right: 0px;
    }

    .tabs {
        /* background-color: antiquewhite; */
        width: 100%;
        margin-top: 5px;
        margin-left: 10px;
        padding-right: 15px;
        font-size: 14px;
        display:flex;
        flex-direction: column;
    }

    .tab {
        padding: 3px 10px;
        margin-bottom: 7px;
        border-radius: 5px;
        width: fit-content;
        user-select: none;
    }

    .tab span {
        overflow-wrap: break-word;
    }

    .tab:hover {
        cursor: pointer;
    }

    .selected {
        background: var(--secondary-bg-color);
    }

    .contents-container {
        height: 100%;
        width: 100%;
        margin-left: 10px;
    }
</style>
../stores/macroSettingsStore