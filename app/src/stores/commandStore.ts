import { defineStore } from "pinia";
import { IModalState } from "../components/Modal.vue";
import { ICommandItem } from "../components/Command.vue";
import { ref } from "vue";

export const useCommandStore = defineStore("commandStore", () => {
    const modalState: IModalState = {
        isShowing: false,
        lock: false,
        stateChanged: () => { }
    };

    const hint = ref("");

    let commandItems = ref([] as ICommandItem[]);

    function setCommandItems(newCommandItems: ICommandItem[]) {
        commandItems.value = newCommandItems;
    }

    return {
        modalState,
        hint,
        commandItems,
        setCommandItems,
        createMacroMenuCommandItems
    }

    function createMacroMenuCommandItems() {
        const commands: ICommandItem[] = [
            {
                header: "新規作成",
                subHeader: "新しいマクロを作成します。",
                elementType: "COMMAND",
                callback: () => {
                    setCommandItems([
                        {
                            header: "ああああ",
                            subHeader: "いいいい",
                            elementType: "COMMAND"
                        },
                        {
                            header: "ああああ",
                            subHeader: "いいいい",
                            elementType: "COMMAND"
                        },
                        {
                            header: "ああああ",
                            subHeader: "いいいい",
                            elementType: "COMMAND"
                        },
                    ]);
                    modalState.isShowing = true;
                }
            },
            {
                header: "複製",
                subHeader: "マクロの設定を複製します。",
                elementType: "COMMAND"
            },
            {
                header: "削除",
                subHeader: "現在選択しているマクロを削除します。",
                elementType: "COMMAND"
            },
            {
                header: "名前変更",
                subHeader: "現在選択しているマクロの名前を変更します。",
                elementType: "COMMAND"
            },
            {
                header: "",
                elementType: "SEPARATOR"
            },
            {
                header: "マクロの切り替え",
                subHeader: "",
                elementType: "LABEL"
            },
            {
                header: "",
                elementType: "SEPARATOR"
            },
            {
                header: "設定ファイル1",
                subHeader: "this is test command item.",
                elementType: "COMMAND"
            },
            {
                header: "設定ファイル2",
                subHeader: "this is test command item.",
                elementType: "COMMAND"
            },
            {
                header: "設定ファイル3",
                elementType: "COMMAND"
            },
            {
                header: "設定ファイル4",
                elementType: "COMMAND"
            },
            {
                header: "設定ファイル5",
                elementType: "COMMAND"
            },
            {
                header: "設定ファイル6",
                elementType: "COMMAND"
            },
        ]
        return commands;
    }
});