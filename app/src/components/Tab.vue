<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
    id: string;
    header: string;
    canCloseButtonShow: boolean;
    isActive: boolean;
    iconName?: string;
    iconColor?: string;
}>();
const emits = defineEmits<{
    (e: "close"): void;
}>();
const hover = ref(false);
const menuHover = ref(false);
const canButtonShow = computed(() => props.canCloseButtonShow && (props.isActive || hover.value));
const isShowing = ref(false);
const menu = ref(null);
onMounted(() => {
    window.addEventListener('click', () => {
        if (!menuHover.value) {
            isShowing.value = false;
        }
    });
});

</script>

<template>
    <q-tab 
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        class="tab q-px-sm"
        :class="{'q-px-md': !props.iconName && !props.iconName }"
        :name="props.id"
        no-caps>
        <div class="flex justify-between no-wrap align-center">
            <q-icon 
                v-if="props.iconName" 
                :name="props.iconName" 
                :color="props.iconColor" 
                class="q-my-auto q-mx-xs">
            </q-icon>
            <span class="tab-header self-center font-size-12">{{ props.header }}</span>
            <div v-if="props.canCloseButtonShow" class="close-button-container flex align-center justify-center"
                :class="{ 'opacity-0': !canButtonShow }">
                <q-btn v-show="canButtonShow" round flat @click.stop="emits('close')" size="20" class="close-button">
                    <q-icon name="close" size="12px"></q-icon>
                </q-btn>
            </div>
        </div>
        <q-menu 
            ref="menu"
            v-if="props.canCloseButtonShow" context-menu v-model="isShowing"
            :touch-position="false">
            <q-list style="min-width: 100px;">
                <q-item clickable v-close-popup
                    @click="emits('close')"
                    @mouseenter="menuHover = true"
                    @mouseleave="menuHover = false">
                    <q-item-section>タブを閉じる</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-tab>
</template>

<style scoped>
    .tab {
        min-width: 50px;
        /* border-right: 1px solid var(--border-color) */
    }

    .tab-icon {
        margin-top: auto;
        margin-bottom: auto;
    }

    .tab-header {
        max-width: 400px;
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }

    .close-button-container {
        width: 20px;
        margin-left: 5px;
    }

    .close-button {
        width: 20px;
        height: 20px;
        min-width: 20px;
        min-height: 20px;
    }

    .opacity-0 {
        opacity: 0;
    }
</style>
