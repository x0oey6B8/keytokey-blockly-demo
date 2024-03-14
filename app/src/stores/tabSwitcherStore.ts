import { defineStore } from "pinia";
import { ModalStateFactory } from "../models/modal";
import { ref } from "vue";
import { useTabStore } from "./tabStore";
import { ITab } from "../models/tab";

export const useTabSwitcherStore = defineStore("tab-switcher", () => {

    const tabStore = useTabStore();
    const modal = ref(ModalStateFactory.create());
    const selectedIndex = ref(0);

    return {
        modal,
        selectedIndex,
        close,
        changeTab,
        changeToCurrentIndexTab,
        oepnOrIncrement
    }

    function changeToCurrentIndexTab() {
        const tab = tabStore.items[selectedIndex.value];
        changeTab(tab);
    }

    function changeTab(tab: ITab) {
        tabStore.selectTab(tab);
        close();
    }

    function close() {
        modal.value.isShowing = false;
    }

    function oepnOrIncrement() {
        if (!modal.value.isShowing) {
            open();
        } else {
            incrementIndex();
        }
    }

    function open() {
        modal.value.isShowing = true;
        selectedIndex.value = tabStore.selectedTabIndex;
    }

    function incrementIndex() {
        const length = tabStore.items.length;
        selectedIndex.value++;
        if (selectedIndex.value >= length) {
            selectedIndex.value = 0;
        }
    }
});