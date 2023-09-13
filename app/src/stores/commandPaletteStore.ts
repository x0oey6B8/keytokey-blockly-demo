import { defineStore } from "pinia";
import { IModalState } from "../components/Modal.vue";
import { ref } from "vue";
import { ICommandTextValidationResult, ICommandItem, ICommandPaletteOptions, DefaultTextValidator } from "../models/commandPalette";

export interface ICommandTextValidator {
    validate(text: string): Promise<ICommandTextValidationResult>;
}

export const useCommandPaletteStore = defineStore("commandPaletteStore", () => {
    const _modalState: IModalState = {
        isShowing: false,
        lock: false,
        stateChanged: () => { }
    };
    const modalState = ref(_modalState);
    const hint = ref("");
    const text = ref("");
    const commandItems = ref<ICommandItem[]>([]);
    const textValidator = ref(new DefaultTextValidator().validate);
    const filtering = ref(true);
    const closeAuto = ref(true);

    function open(commandOptions: ICommandPaletteOptions) {
        modalState.value.isShowing = true;
        modalState.value.lock = commandOptions.lockModal;
        filtering.value = commandOptions.filtering;
        textValidator.value = commandOptions.validator.validate;
        hint.value = commandOptions.hint;
        text.value = commandOptions.text;
        closeAuto.value = commandOptions.closeAuto;
        commandItems.value = commandOptions.commandItems;
    }

    function close() {
        modalState.value.isShowing = false;
    }

    return {
        modalState,
        hint,
        text,
        filtering,
        commandItems,
        textValidator,
        closeAuto,
        close,
        open,
    }
});