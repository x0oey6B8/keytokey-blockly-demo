<script lang="ts" setup>
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const props = defineProps<{
    text: string;
    reverse?: boolean;
}>();
const viewModel = ref<IViewModel>({ icon: "content_paste" });
const done = useDebounceFn(() => { viewModel.value.icon = "content_paste"; }, 1500);

async function copy(text: string) {
    try {
        if (window.navigator.clipboard) {
            await window.navigator.clipboard.writeText(text);
            viewModel.value.icon = "done";
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        done();
    }
}

interface IViewModel {
    icon: string
}
</script>

<template>
    <div class="text flex" :class="{ 'test': props.reverse }" @click="copy(props.text)">
        <span class="font-size-13">{{ props.text }}</span>
        <q-icon :name="viewModel.icon" class="icon self-center" size="xs" color="green"></q-icon>
    </div>
</template>

<style lang="css" scoped>
.text {
    opacity: 0.8;
}

.text:hover {
    cursor: pointer;
    opacity: 1.0;
}

.text:hover {
    visibility: visible;
}

.test {
    flex-direction: row-reverse;
    justify-content: start;
}
</style>
