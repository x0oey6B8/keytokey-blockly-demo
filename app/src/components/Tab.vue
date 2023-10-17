<script lang="ts" setup>
import { ITab } from '../models/tab';

const props = defineProps<{tabs: ITab[]}>();

function active(tabToActive: ITab) {
    if (!tabToActive.isEnabled) {
        return;
    }

    for (const tab of props.tabs) {
        tab.isActive = false;
    }
    tabToActive.isActive = true;
}
</script>

<template>
    <div class="tab"
        :class="[{ 'tab-active': tab.isActive }, { 'tab-disbled': !tab.isEnabled }]"
        :disabled="!tab.isEnabled"
        @click="active(tab)"
        v-for="tab in props.tabs">
        <span class="tab-text">{{ tab.name }}</span>
    </div>
</template>

<style lang="css" scoped>
    .tab {
    display: flex;
    align-items: center;
    user-select: none;
    font-size: 12px;
    color: #E7E7E7;
    /* background-color: #1B5E20; */
    padding-left: 15px;
    padding-right: 15px;
    border-left: solid 1px #525252;
    border-top: solid 1px #525252;
    border-right: solid 1px #525252;
    border-top-left-radius: 3px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 1px;
    min-width: 60px;
    max-width: 200px;
    height: 24px;
    margin-left: 1px;
    margin-right: 1px;
    overflow: hidden;
}

.tab-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    flex: 1;
    text-align: center;
}

.tab:hover{
    color: #C7C7C7;
    background-color: #525252;
    cursor: pointer;
}

.tab-active {
    /* background-color: #424242; */
}

.tab-active:hover {
    background-color: #424242;
    color: #E7E7E7;
}
</style>
