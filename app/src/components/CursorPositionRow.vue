<script lang="ts" setup>
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { ICursorPoint } from '../stores/cursorPositionsStore';


const props = defineProps<{
    point: ICursorPoint;
    header: string;
}>();

const button1 = ref<IViewModel>({ icon: "content_paste" });
const button2 = ref<IViewModel>({ icon: "content_paste" });

const done = useDebounceFn((viewModel: IViewModel) => { viewModel.icon = "content_paste"; }, 1500);

async function copy(num: number, viewModel: IViewModel) {
    try {
        if (window.navigator.clipboard) {
            await window.navigator.clipboard.writeText(num.toString());
            viewModel.icon = "done";
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        done(viewModel);
    }
}

interface IViewModel {
    icon: string
}

</script>

<template>
    <div class="text-grey q-mt-sm">{{ props.header }}</div>
    <span class="flex align-center">
        {{props.point.x}}
        <q-btn
            flat
            color="green"
            :icon="button1.icon"
            size="xs"
            class="q-mx-xs q-pa-xs"
            @click="copy(props.point.x, button1)">
            <q-tooltip>コピー（横の座標）</q-tooltip>
        </q-btn> 
        {{ props.point.y }}
        <q-btn
            flat
                color="green"
                :icon="button2.icon"
                size="xs"
                class="q-mx-xs q-pa-xs"
                @click="copy(props.point.y, button2)">
                <q-tooltip>コピー（縦の座標）</q-tooltip>
        </q-btn>  
    </span>
</template>

<style lang="css" scoped>
    
</style>
