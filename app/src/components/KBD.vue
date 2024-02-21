<script lang="ts" setup>

const props = defineProps<{
    keys: string[]
}>();

</script>

<template>
    <div v-for="(key, index) of props.keys" class="inline-block">
        <span class="kbd rounded">{{ key }}</span>
        <span 
            v-if="index < props.keys.length - 1" 
            class="q-mx-sm">
            +
        </span>
    </div>
</template>

<style scoped>
    .kbd {
        color: var(--font-color);
        background-color: var(--secondary-bg-color);
        padding: 3px 7px;
    }
</style>
