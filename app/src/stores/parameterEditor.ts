import { defineStore } from "pinia";
import { ModalStateFactory } from "../models/modal";
import { ref } from "vue";
import { IMacroParameter } from "../hosts/macroManager";
import { useEditingMacro } from "./editingMacro";

export const useParameterEditorStore = defineStore("parameter-editor", () => {

    const editing = useEditingMacro();
    const modal = ModalStateFactory.create();
    const rows = ref<IMacroParameter[]>([]);
    modal.stateChanged = () => {
        if (modal.isShowing) {
            if (editing.macro) {
                rows.value = editing.macro.setting.parameters;
            }
        }
    };

    return {
        modal,
        rows
    }

});