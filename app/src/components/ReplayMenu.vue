<script lang="ts" setup>
import { JumpCommandOptions } from '../menus/commands/replay';
import { useCommandPaletteStore } from '../stores/commandPaletteStore';
import { useReplayStore } from '../stores/replayStore';

const replayStore = useReplayStore();

function openJumpCommandPalette() {
    const commandPalette = useCommandPaletteStore();
    commandPalette.open(new JumpCommandOptions());
}
</script>

<template>
    <div v-if="replayStore.isReplaying" class="bg-deep-purple-10 full-width full-height">
        <div class="flex justify-center align-center full-height">
            <div>
                <q-btn flat label="前へ" v-touch-repeat:0:600:500:300:150:75.mouse.enter.space="replayStore.decrement"></q-btn>
                <q-btn flat label="次へ" v-touch-repeat:0:600:500:300:150:75.mouse.enter.space="replayStore.increment"></q-btn>
                <q-btn flat label="ジャンプ" @click="openJumpCommandPalette"></q-btn>
                <q-btn flat label="実行コード表示" @click="replayStore.showCode"></q-btn>
                <q-btn flat label="終了" @click="replayStore.endReplayMode()"></q-btn>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
</style>
