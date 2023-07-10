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

    function setCode(text: string, language_: string, showModal_: boolean) {
        textValue.value = decodeNames(text);
        console.log(textValue.value);
        showModal.value = showModal_;
        language.value = language_;
    }

    function decodeNames(text: string) {
        const regex = /(_[A-Z0-9]{2})+/g;
        const decodedStr = text.replace(regex, match => {
            try {
                const decoded = decodeURIComponent(match.replace(/_/g, '%'));
                return decoded;
            } catch (error) {
                console.log(error);
                return match;
            }
        });
        return decodedStr;
    }
});