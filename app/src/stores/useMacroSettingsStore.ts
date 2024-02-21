import { defineStore } from "pinia";
import { IModalState } from "../models/modal";

export const useMacroSettingsStore = defineStore("macro-config", () => {
    const modalState: IModalState = {
        isShowing: false,
        lock: false,
        stateChanged: () => {

        }
    };

    function open() {
        modalState.isShowing = true;
    }

    return {
        modalState,
        open
    }
})