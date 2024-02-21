import { defineStore } from "pinia"
import { ref } from "vue";
import { Macro, MacroFile } from "../hosts/macroManager";

export const useEditingMacro = defineStore("editing-macro", () => {
    const currentMacro = ref<Macro>();
    const currentFile = ref<MacroFile>();

    return {
        macro: currentMacro,
        file: currentFile,
        setMacro,
        setFile,
        findMacroById,
        clear,
        clearIfMacroHasSelected,
        hasMacro,
    }

    function hasMacro() {
        return currentMacro.value !== undefined;
    }

    function clear() {
        currentMacro.value = undefined;
        currentFile.value = undefined;
    }

    function clearIfMacroHasSelected(macro_: Macro) {
        if (currentMacro.value?.name === macro_.name) {
            clear();
            return true;
        }
        return false;
    }

    function setMacro(newMacro: Macro) {
        currentMacro.value = newMacro;
        currentFile.value = newMacro.listFiles()[0];
    }

    function setFile(id: string) {
        currentFile.value = findMacroById(id);
    }

    function findMacroById(id: string) {
        if (!currentMacro.value) {
            throw new Error();
        }
        const files = currentMacro.value.listFiles();
        const file = files.find(file => file.setting.id == id);
        if (!file) {
            return;
        }
        return file;
    }
})