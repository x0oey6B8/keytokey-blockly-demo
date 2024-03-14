<script lang="ts" setup>
import { useReplayStore } from '../stores/replayStore';
const replayStore = useReplayStore();
</script>

<template>
    <div v-if="replayStore.isReplaying" class="floating full-width flex justify-center">
        <div class="container bg-grey-9 rounded q-py-xs q-px-lg column align-center">
            <div class="self-center">{{ replayStore.selectedIndex }} / {{ replayStore.ids.length - 1 }}</div>
            <!-- <div class="self-center">{{ replayStore.blockName }}</div> -->
        </div>
    </div>
</template>

<style lang="css" scoped>
    .floating {
        position: absolute;
        top: 40px;
        user-select: none;
    }
    .container {
        border: solid 1px var(--border-color);
        min-width: 100px;
    }
</style>
