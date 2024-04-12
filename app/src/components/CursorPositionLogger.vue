<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useCursorPositionsStore } from '../stores/cursorPositionsStore';
import { v4 as uuidv4 } from 'uuid';
import CursorPositionRow from './CursorPositionRow.vue';
import { useWindowSize } from '@vueuse/core';
import CopyableText from './CopyableText.vue';

const store = useCursorPositionsStore();
const height = ref(0);
const margin = ref(0);

onMounted(async () => {
    updateWidth();
    updateHeight();
    await store.loadTrigger();
});

const { height: wh } = useWindowSize();
watch(wh, () => {
    updateHeight();
    updateWidth();
});

function updateWidth() {
    const toolbox = document.querySelector(".blocklyToolboxDiv");
    if (toolbox) {
        margin.value = toolbox?.clientWidth;
        if (toolbox.scrollHeight > toolbox.clientHeight) {
            margin.value += 10;
        }
    }
}

function updateHeight() {
    const area = document.getElementById("blocklyDiv");
    if (area) {
        height.value = area.clientHeight;
    }
}
</script>

<template>
    <div id="test" class="flex justify-end non-selectable" :style="{ height: `${height}px` }">
        <div class="container scrollbar-colorizer" :style="{ marginRight: `${margin}px` }">
            <div>
                <div class="menu bg-gray flex q-py-xs q-px-sm justify-between items-center">
                    <div class="flex">
                        <div v-if="!store.isLogging">
                            <q-btn flat dense color="green" @click="store.start">
                                <q-icon name="play_arrow" size="xs"></q-icon>
                            </q-btn>
                            <q-tooltip>記録開始</q-tooltip>
                        </div>
                        <div v-if="store.isLogging">
                            <q-btn flat dense color="red" @click="store.stop">
                                <q-icon name="stop" size="xs"></q-icon>
                            </q-btn>
                            <q-tooltip>記録停止</q-tooltip>
                        </div>
                        <div>
                            <q-btn flat dense @click="store.clear">
                                <q-icon name="not_interested" size="xs"></q-icon>
                            </q-btn>
                            <q-tooltip>内容をクリア</q-tooltip>
                        </div>
                    </div>
                    <div>
                        <q-btn flat dense class="q-px-md" size="md" @click="store.changeKey">
                            <span v-if="!store.isWaitingForInput">{{ store.keyName }}</span>
                            <span v-else class="blinking">入力待機中</span>
                            <q-icon name="autorenew" size="xs"></q-icon>
                        </q-btn>
                        <q-tooltip>記録キーを変更</q-tooltip>
                    </div>
                    <div class="flex">
                        <div>
                            <q-btn flat dense @click="store.close">
                                <q-icon name="close" size="xs"></q-icon>
                            </q-btn>
                            <q-tooltip>閉じる</q-tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rows scrollbar full-width">
                <div v-for="(row, index) in store.rows" :key="uuidv4()">
                    <q-expansion-item @update:model-value="v => row.visibility = v" dense class="text-gray no-border font-size-13">
                        <template v-slot:header>
                            <q-item-section>
                                <div class=" overflow-hidden full-width flex q-py-sm">
                                    <span class="text-grey q-mr-sm self-center">{{ `[${(store.rows.length - index)}]` }}</span>
                                    <span>{{ `${row.point.x}, ${row.point.y}` }}</span>
                                    <span>　{{ row.processName }}</span>
                                </div>
                            </q-item-section>
                        </template>
                        <div class="border-left" style="height: 400px">
                            <q-card v-if="row.visibility" dense class="q-mb-lg">
                                <q-card-section class="q-py-sm p-px-lg font-size-13">
                                    <CursorPositionRow header="メインモニター基準" :point="row.point"></CursorPositionRow>
                                    <div class="text-grey q-mt-sm">アクティブウィンドウ基準</div>
                                    <div class="q-pl-sm">
                                        <CursorPositionRow header="位置" :point="row.activeWindowBased.point"></CursorPositionRow>
                                        <CursorPositionRow header="タイトルバーを含まない" :point="row.activeWindowBased.pointWithoutTitlebar"></CursorPositionRow>
                                        <CursorPositionRow header="パーセント" :point="row.activeWindowBased.percentagePoint"></CursorPositionRow>
                                        <CursorPositionRow header="パーセント（タイトルバーを含まない）" :point="row.activeWindowBased.percentagePointWithoutTitlebar"></CursorPositionRow>
                                    </div>
                                    <div class="text-grey q-mt-sm">プロセス名</div>
                                    <CopyableText class="max-width-full overflow-hidden" :text="row.processName" :reverse="true"></CopyableText>
                                    <div class="text-grey q-mt-sm">ウィンドウタイトル</div>
                                    <CopyableText class="max-width-full overflow-hidden" :text="row.windowTitle" :reverse="true"></CopyableText>
                                </q-card-section>
                            </q-card>
                        </div>
                    </q-expansion-item>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.container {
    width: 300px;
    display: grid;
    grid-template-rows: auto 1fr;
    max-height: 100%;
    background-color: var(--bg-color-app);
    border: solid 1px var(--border-color);
    z-index: 3;
}

.overflow-hidden {
    flex-wrap: nowrap;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.max-width-full {
    max-width: 100% !important;
}

.border-left {
    border-left: solid 5px green !important;
}

.menu {
    border-bottom: solid 1px var(--border-color);
}

.rows {
    overflow-y: scroll;
}

.no-radius {
    border-radius: 0px !important;
}

.q-item {
    border-radius: 0px !important;
}

.q-dark {
    background: var(--bg-color-app) !important;
}

.row-detail {
    margin-bottom: 20px;
}

.parent:hover .scrollbar::-webkit-scrollbar {
    /* スクロールバーの背景色 */
    background-color: #EEEEEE10;
}

.parent:hover .scrollbar::-webkit-scrollbar-thumb {
    background-color: #EEEEEE40;
}
</style>
