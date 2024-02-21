import { defineStore } from "pinia";
import { host } from "../hosts/host";
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

export const useAppStore = defineStore("AppStore", () => {
    const implementation = ref("");
    const editingMacro = useEditingMacro();
    const blocklyStore = useBlocklyStore();
    const commandStore = useCommandPaletteStore();
    const editorStore = useEditorStore();
    const tabStore = useTabStore();
    const appDropDownMenus = dropdownMenus;
    const shortcutPage = ModalStateFactory.create();

    return {
        appDropDownMenus,
        implementation,
        shortcutPage,
        openMacroMenu,
        openDropdownMenus,
        openMenuToAddFile,
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
                        host.macroManager.setImplementation({
                            code: implementation.value
                        });
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

    function openMenuToAddFile() {
        commandStore.open(new MacroMenus.AddFileCommandPaletteOptions);
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
        const json = sourceCode.json;
        const javascript = sourceCode.javascript;
        editing.file?.write(json, javascript);
    }
}