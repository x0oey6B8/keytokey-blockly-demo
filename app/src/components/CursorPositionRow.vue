<script lang="ts" setup>
import { ICursorPoint } from '../stores/cursorPositionsStore';
import CopyableText from "./CopyableText.vue"

const props = defineProps<{
    point: ICursorPoint;
    header: string;
}>();
</script>

<template>
    <div class="text-grey q-mt-sm">{{ props.header }}</div>
    <span class="flex">
        <CopyableText :text="props.point.x.toString()"></CopyableText>
        <CopyableText class="q-ml-md" :text="props.point.y.toString()"></CopyableText>
    </span>
</template>

<style lang="css" scoped></style>
