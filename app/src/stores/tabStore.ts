import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { ITab } from "../models/tab";
import { useEditingMacro } from "./editingMacro";
import { MacroFile } from "../hosts/macroManager";
import { useAppStore } from "./appStore";


export const useTabStore = defineStore("tab", () => {
    const editingMacro = useEditingMacro();
    const appStore = useAppStore();
    const selectedTab = ref("");
    const selectedTabIndex = ref(0);
    const items = ref<ITab[]>([]);

    watch(selectedTab, async (newTab) => await tabChanged(newTab));

    return {
        selectedTab,
        selectedTabIndex,
        items,
        addTab,
        clear,
        closeTab,
        refreshTabs,
        selectTab,
        selectNextTab,
    }

    function clear() {
        selectedTab.value = "";
        items.value.length = 0;
    }

    function selectNextTab() {
        let currentIndex = items.value.findIndex(item => item.id === selectedTab.value);
        if (currentIndex > -1) {
            currentIndex++;
            if (currentIndex > (items.value.length - 1)) {
                currentIndex = 0;
            }
            selectedTabIndex.value = currentIndex;
            selectedTab.value = items.value[currentIndex].id;
        }
    }

    function selectTab(tab: ITab) {
        selectedTab.value = tab.id;
        selectedTabIndex.value = items.value.findIndex(item => item.id === tab.id);
    }

    async function tabChanged(newTabId: string) {
        if (!editingMacro.macro) {
            return;
        }
        selectedTabIndex.value = items.value.findIndex(item => item.id === newTabId);
        editingMacro.setFile(newTabId);
        appStore.loadBlocks();
    }

    function refreshTabs() {
        if (!editingMacro.macro) {
            return;
        }
        items.value = editingMacro.macro.listFiles().map(file => createTab(file));
        selectedTabIndex.value = 0;
        selectedTab.value = items.value[0].id;
    }

    function addTab(macroFile: MacroFile) {
        const tab = createTab(macroFile);
        items.value.push(tab);
    }

    function createTab(macroFile: MacroFile) {
        const file = macroFile.setting;
        const newTab: ITab = {
            id: file.id,
            header: macroFile.getDisplayName(),
            canCloseButtonShow: file.type !== "MAIN",
            iconColor: file.type !== "MAIN" ? "yellow" : "",
            iconName: file.type !== "MAIN" ? "bolt" : ""
        };
        return newTab;
    }

    function closeTab(tab: ITab) {
        const macro = editingMacro.macro;
        const files = editingMacro.macro?.listFiles();
        if (!macro || !files) {
            return;
        }

        const index = files.findIndex(file => file.setting.id == tab.id);
        if (index < 0) {
            alert("ファイルが見つかりませんでした。");
            return;
        }

        const file = files[index];
        const confirmed = confirm(`「${tab.header}」を削除しますか？`);
        if (confirmed) {
            macro.removeFile(file);
            editingMacro.setFile(files[0].setting.id);
            const i = items.value.findIndex(t => t.id === tab.id);
            items.value.splice(i, 1);
            if (selectedTab.value === tab.id) {
                selectedTab.value = items.value[0].id;
                selectedTabIndex.value = 0;
            }
        }
    }
})