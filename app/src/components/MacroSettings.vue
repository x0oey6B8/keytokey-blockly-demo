<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useEditingMacro } from '../stores/editingMacro';

interface ISettingTab {
    header: string;
    isSelected: boolean;
}

const tabs = ref<ISettingTab[]>([
    { header: "一般", isSelected: true },
    { header: "デバッグ", isSelected: false },
]);
const editingMacro = useEditingMacro();
const macroName = ref("");
const isLoggerEnabled = ref(false);
const preload = ref(false);
const selectedTab = ref(tabs.value[0].header);
if (editingMacro.macro) {
    const setting = editingMacro.macro.setting;
    macroName.value = setting.name;
    isLoggerEnabled.value = setting.debug.logger.isEnabled;
    preload.value = true;
}

watch(isLoggerEnabled, async (newValue) => {
    if (editingMacro.macro) {
        editingMacro.macro.setting.debug.logger.isEnabled = newValue;
        await editingMacro.macro.applySetting();
    }
});

watch(preload, async (newValue) => {
    if (editingMacro.macro) {
        editingMacro.macro.setting.preload = newValue;
        await editingMacro.macro.applySetting();
    }
});

function changeTabSelection(clickedTab: ISettingTab) {
    for (const tab of tabs.value) {
        tab.isSelected = false;
    }
    clickedTab.isSelected = true;
    selectedTab.value = clickedTab.header;
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
                        <div v-for="tab in tabs" :key="tab.header">
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
                        <div v-if="selectedTab === '一般'">
                            <q-item tag="label" v-ripple style="user-select: none;" round>
                                <q-item-section>
                                    <q-item-label>事前読み込み</q-item-label>
                                    <q-item-label caption class="font-size-12">マクロを事前に読み込み、即時実行できるようにします。<br>オフ：<br>・実行直前に読み込みます。<br>・マクロの変更をリアルタイムで反映させることができます。<br>・実行までの速度が遅くなります。</q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-toggle color="green" val="friend" v-model="preload" />
                                </q-item-section>
                            </q-item>
                        </div>
                        <div v-if="selectedTab === 'デバッグ'">
                            <q-item tag="label" v-ripple style="user-select: none;" class="rounded">
                                <q-item-section>
                                    <q-item-label>マクロの実行を記録</q-item-label>
                                    <q-item-label caption class="font-size-12">ブロックマクロが生成するコードに記録用のコードを挿入します。実行記録はデバッグメニューから再生することができます。なお、この設定はメモリの使用量が多くなるので必要なときにのみオンにしてください。</q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-toggle color="green" v-model="isLoggerEnabled" val="friend" />
                                </q-item-section>
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
