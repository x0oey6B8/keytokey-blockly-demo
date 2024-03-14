import { defineStore } from "pinia";
import * as MacroMenus from "../menus/commands/macro"
import { DropDownCommandPaletteOptions, DropDownMenuToCommandItems } from "../models/dropdown";
import { useCommandPaletteStore } from "./commandPaletteStore";
import { ref } from "vue";
import { ISourceCode, ISourceCodeWriter, useBlocklyStore } from "./blocklyStore";
import { useEditorStore } from "./editorStore";
import { Macro } from "../hosts/macroManager";
import { dropdownMenus } from "../menus/dropdown/dropdown";
import { useTabStore } from "./tabStore";
import { useEditingMacro } from "./editingMacro";
import { MacroMenuCommandPaletteOptions } from "../menus/commands/macro";
import { resize } from "../helpers/ui/resize";
import { ModalStateFactory } from "../models/modal";
import { useMacroSettingsStore } from "./macroSettingsStore";
import { useNotificationStore } from "./notificationStore";
import { useParameterEditorStore } from "./parameterEditor";

export const useAppStore = defineStore("AppStore", () => {
    const implementation = ref("");
    const toaster = useNotificationStore();
    const editingMacro = useEditingMacro();
    const blocklyStore = useBlocklyStore();
    const commandStore = useCommandPaletteStore();
    const editorStore = useEditorStore();
    const tabStore = useTabStore();
    const macroSetting = useMacroSettingsStore();
    const parameterEditor = useParameterEditorStore();
    const appDropDownMenus = dropdownMenus;
    const shortcutPage = ModalStateFactory.create();

    return {
        appDropDownMenus,
        implementation,
        shortcutPage,
        openMacroMenu,
        openDropdownMenus,
        openMenuToAddFile,
        openMacroSetting,
        openParameterEditor,
        setNewMacro,
        loadBlocks,
        clear,
        readImplementationFile
    };

    function readImplementationFile() {
        try {
            const url = import.meta.env.BASE_URL + "implementation.js";
            console.log(url);
            return fetch(url)
                .then(async (response) => {
                    if (response.ok) {
                        implementation.value = await response.text();
                    }
                })
                .catch(() => "");
        } catch (error) {
            return "";
        }
    }

    function openDropdownMenus() {
        const commandPaletteOptions = new DropDownCommandPaletteOptions(appDropDownMenus, new DropDownMenuToCommandItems());
        commandStore.open(commandPaletteOptions);
    }

    async function openMacroMenu() {
        const options = await MacroMenuCommandPaletteOptions.create();
        commandStore.open(options);
    }

    async function openMacroSetting() {
        if (!editingMacro.macro) {
            toaster.error("マクロが選択されていません");
            return;
        }
        macroSetting.modalState.isShowing = true;
    }

    function openMenuToAddFile() {
        if (!editingMacro.macro) {
            toaster.error("マクロが選択されていません");
            return;
        }
        commandStore.open(new MacroMenus.AddFileCommandPaletteOptions);
    }

    function openParameterEditor() {
        if (!editingMacro.macro) {
            toaster.error("マクロが選択されていません");
            return;
        }
        parameterEditor.modal.isShowing = true;

    }

    function clear() {
        editorStore.modalState.isShowing = false;
        blocklyStore.getCurrentWorkspaceSession()?.clearWorkspace({ ask: false });
        editingMacro.clear();
        tabStore.clear();
        openMacroMenu()
    }

    async function setNewMacro(macro: Macro) {
        try {
            editingMacro.setMacro(macro);
            if (editingMacro.file) {
                editingMacro.file.canWrite = false;
            }
            tabStore.refreshTabs();
            resize();
        } catch (error) {
            alert(error);
        }
    }

    async function loadBlocks() {
        if (!editingMacro.file) {
            return;
        }
        const session = blocklyStore.getCurrentWorkspaceSession();
        if (session) {
            try {
                editingMacro.file.canWrite = false;
                const content = await editingMacro.file.read();
                session.setState(content.json);
                editingMacro.file.canWrite = true;
            } catch (error) {
                console.log("エラー:", error);
                console.log(editingMacro.file, editingMacro.file);
                alert("読み込みエラーが発生しました。\n詳細はダイアログを閉じたあとDevToolsのコンソールを見てください（F12で表示）");
            }
        }
    }
})

export class SourceCodeWriter implements ISourceCodeWriter {

    static Default: SourceCodeWriter = new SourceCodeWriter();

    write(sourceCode: ISourceCode): void {
        const editing = useEditingMacro();
        const appStore = useAppStore();
        const json = sourceCode.json;
        const javascript = sourceCode.javascript;
        editing.file?.deboucedWrite(json, javascript);
        if (editing.macro?.debouncedSetImplementation) {
            editing.macro?.debouncedSetImplementation({ code: appStore.implementation });
        }
    }
}