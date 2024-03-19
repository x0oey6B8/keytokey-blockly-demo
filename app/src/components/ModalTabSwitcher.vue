<script lang="ts" setup>
import { useTabStore } from "../stores/tabStore";
import Modal from "./Modal.vue"
import { useTabSwitcherStore } from "../stores/tabSwitcherStore";

const tabStore = useTabStore();
const tabSwitcherStore = useTabSwitcherStore();

</script>

<template>
    <Modal :state="tabSwitcherStore.modal">
        <template #content>
            <div class="full-width full-height flex justify-center items-center">
                <div class="center rounded q-pa-sm" @click.stop>
                    <div v-for="(item, index) in tabStore.items">
                        <q-btn flat 
                            align="left"
                            no-caps
                            no-wrap
                            class="full-width font-size-16 align-left ellipsis" 
                            :class="{'active': tabSwitcherStore.selectedIndex === index}"
                            @click="tabSwitcherStore.changeTab(item)">
                            <span v-show="tabSwitcherStore.selectedIndex === index">&gt;</span>
                            <q-icon :name="item.iconName" :color="item.iconColor" class="q-mr-sm"></q-icon>
                            <span :class="{ 'text-green': tabStore.selectedTab === item.id }">{{ item.header }}</span>
                        </q-btn>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<style lang="css" scoped>
    .center {
        max-width: 600px;
        min-width: 300px;
        width: 40%;
        min-height: 300px;
        height: 60%;
        background-color: var(--bg-color-app);
        border: solid 1px var(--border-color);
    }
    .active {
        background-color: var(--secondary-bg-color);
    }
</style>
