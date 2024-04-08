import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { IModalState } from "../models/modal";
import * as monaco from "monaco-editor"

export const useEditorStore = defineStore("editorStore", () => {
    let textValue = ref("");
    let language = ref("");
    let highlights: monaco.editor.IModelDeltaDecoration[] = [];
    const willMakeInvalidIdentifierTextWhite = ref(true);
    const modalState: Ref<IModalState> = ref({
        isShowing: false,
        lock: false,
        stateChanged: () => { }
    });
    let _editor: monaco.editor.IStandaloneCodeEditor | undefined = undefined;

    return {
        textValue,
        language,
        modalState,
        highlights,
        willMakeInvalidIdentifierTextWhite,
        editor: _editor,
        getHighlights,
        setCode,
    }

    function getHighlights() {
        return highlights;
    }

    function setCode(code: string, language_: string, showModal_: boolean, highlights_: monaco.editor.IModelDeltaDecoration[] = []) {
        highlights = highlights_;
        textValue.value = code;
        modalState.value.isShowing = showModal_;
        language.value = language_;

    }
});