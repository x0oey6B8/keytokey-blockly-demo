<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useCursorPositionsStore } from '../stores/cursorPositionsStore';
import { v4 as uuidv4 } from 'uuid';
import CursorPositionRow from './CursorPositionRow.vue';

const store = useCursorPositionsStore();

const height = ref(0);
const maxHeight = ref(0);
const margin = ref(0);

onMounted(async () => {
    const toolbox = document.querySelector(".blocklyToolboxDiv");
    if (toolbox) {
        margin.value = toolbox?.clientWidth;
    }
    updateHeight();

    await store.loadTrigger();

});

function updateHeight() {
    const area = document.getElementById("blocklyDiv");
    const menu = document.querySelector(".menu-container");
    if (area && menu) {
        const h = area.clientHeight - menu.clientHeight - 3;
        height.value = h;
        maxHeight.value = h;
    }
}

</script>

<template>
    <div id="test" class="flex justify-end">
        <div class="container scrollbar-colorizer" :style="{ marginRight: `${margin}px`}">
            <div class="menu-container">
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
            <div class="rows scrollbar full-width" 
                :style="{ height: `${height}px`,  maxHeight: `${height}px`}">
                <div v-for="row in store.rows" :key="uuidv4()">
                    <q-expansion-item
                        dense
                        class="text-gray no-border font-size-13 non-selectable"
                        :label="`${row.point.x}, ${row.point.y}`">
                        <q-card dense class="q-mb-lg">
                            <q-card-section class="q-py-sm p-px-lg font-size-13" style="border-left: solid 5px green;">
                                <CursorPositionRow header="位置" :point="row.point"></CursorPositionRow>
                                <div class="text-grey q-mt-sm">アクティブウィンドウ基準</div>
                                <div class="q-pl-sm">
                                    <CursorPositionRow header="位置" :point="row.activeWindowBased.point"></CursorPositionRow>
                                    <CursorPositionRow header="タイトルバーを含まない" :point="row.activeWindowBased.pointWithoutTitlebar"></CursorPositionRow>
                                    <CursorPositionRow header="パーセント" :point="row.activeWindowBased.percentagePoint"></CursorPositionRow>
                                    <CursorPositionRow header="パーセント（タイトルバーを含まない）" :point="row.activeWindowBased.percentagePointWithoutTitlebar"></CursorPositionRow>
                                </div>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>

                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .container {
        width: 300px;
        background-color: var(--bg-color-app);
        z-index: 3;
        border: solid 1px var(--border-color)
    }

    .menu {
        border-bottom: solid 1px var(--border-color);
    }

    .menu-container {
    }

    .rows {
        overflow-y: scroll;
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
  background-color: #EEEEEE10; /* スクロールバーの背景色 */
}

.parent:hover .scrollbar::-webkit-scrollbar-thumb {
  background-color: #EEEEEE40; /* スクロールバーサムネイルの背景色 */
}
</style>
