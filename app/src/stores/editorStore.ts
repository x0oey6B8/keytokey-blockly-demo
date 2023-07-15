import { defineStore } from "pinia";
import { ref } from "vue";

export const useEditorStore = defineStore("editorStore", () => {
    let textValue = ref("");
    let language = ref("");
    let showModal = ref(false);
    return {
        textValue,
        language,
        showModal,
        setCode
    }

    function setCode(code: string, language_: string, showModal_: boolean) {
        textValue.value = code;
        showModal.value = showModal_;
        language.value = language_;
    }
});