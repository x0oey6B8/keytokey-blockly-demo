import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { IModalState } from "../models/modal";

export const useEditorStore = defineStore("editorStore", () => {
    let textValue = ref("");
    let language = ref("");
    const willMakeInvalidIdentifierTextWhite = ref(true);
    const modalState: Ref<IModalState> = ref({
        isShowing: false,
        lock: false,
        stateChanged: () => console.log("aaa")
    });

    return {
        textValue,
        language,
        modalState,
        willMakeInvalidIdentifierTextWhite,
        setCode
    }

    function setCode(code: string, language_: string, showModal_: boolean) {
        textValue.value = code;
        modalState.value.isShowing = showModal_;
        language.value = language_;
    }
});