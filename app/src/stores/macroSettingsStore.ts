import { defineStore } from "pinia";
import { IModalState } from "../models/modal";
import { ref } from "vue";
import { ISettingTab } from "../components/MacroSettings.vue";

export const useMacroSettingsStore = defineStore("macro-setting", () => {
    const modalState: IModalState = {
        isShowing: false,
        lock: false,
        stateChanged: () => {
        }
    };
    const tabs = ref<ISettingTab[]>([
        { header: "一般", isSelected: true },
        { header: "引数", isSelected: false },
        { header: "デバッグ", isSelected: false },
    ]);
    const selectedTab = ref(tabs.value[0].header);

    function open() {
        modalState.isShowing = true;
    }

    return {
        modalState,
        tabs,
        selectedTab,
        open
    }
})