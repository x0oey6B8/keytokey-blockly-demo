import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { IModalState } from "../components/Modal.vue";

export const useEditorStore = defineStore("editorStore", () => {
    let textValue = ref("");
    let language = ref("");
    const modalState: Ref<IModalState> = ref({
        isShowing: false,
        lock: false,
        stateChanged: () => console.log("aaa")
    });

    return {
        textValue,
        language,
        modalState,
        setCode
    }

    function setCode(code: string, language_: string, showModal_: boolean) {
        textValue.value = code;
        modalState.value.isShowing = showModal_;
        language.value = language_;
    }
});