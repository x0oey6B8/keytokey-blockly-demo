import { defineStore } from "pinia";
import { IMacroSetting } from "../hosts/host";

export const useMacroSettingStore = defineStore("macroSetting", () => {

    let currentSetting: IMacroSetting | null = null;

    return {
        currentSetting
    }
})