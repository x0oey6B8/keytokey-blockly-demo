import { defineStore } from "pinia";
import { IDropDownMenuItem } from "../components/DropdownMenu.vue";
import { StatementPrefix } from "../definitions/generators/defineGenerator";
import { useNotificationStore } from "./notificationStore";
import { useEditorStore } from "./editorStore";
import { useBlocklyStore } from "./blocklyStore";
import { useCommandStore } from "./commandStore";
import { ICommandItem } from "../components/Command.vue";
import { Block, BlockSvg } from "blockly";

export const useAppStore = defineStore("AppStore", () => {

    const editorStore = useEditorStore();
    const blocklyStore = useBlocklyStore();
    const notification = useNotificationStore();
    const commandStore = useCommandStore();
    const codeGenerationMenuItems = createCodeGenerationMenuItems();
    const workspaceMenuItems = createWorkspaceMenuItems();
    const findMenuItems = createFindMenuItems();

    return {
        codeGenerationMenuItems,
        workspaceMenuItems,
        findMenuItems,
        createCode,
        createDecodedCode,
        copyWorkspace,
        showMacroMenuCommand,
    };

    function createCode(prefix: StatementPrefix = StatementPrefix.NONE) {
        const code = blocklyStore.createCode(prefix);
        editorStore.setCode(code, "javascript", true);
    }

    function createDecodedCode(prefix: StatementPrefix = StatementPrefix.NONE) {
        const code = blocklyStore.createDecodedCode(prefix);
        editorStore.setCode(code, "javascript", true);
    }

    function copyWorkspace() {
        const xml = blocklyStore.createXml();
        editorStore.setCode(xml, "xml", true);
        if (navigator.clipboard) {
            navigator.clipboard.writeText(xml);
            notification.toastMessage("コピーしました。");
        }
    }

    function showFindBlockCommand() {
        const blocks = blocklyStore.getAllBlocks();
        if (blocks) {
            const commandItems = blocks.map(block => blockToCommandItem(block));
            commandStore.hint = "ブロックIDを入力してください";
            commandStore.setCommandItems(commandItems);
            commandStore.modalState.isShowing = true;
        }
    }

    function blockToCommandItem(block: BlockSvg): ICommandItem {
        return {
            header: block.id,
            subHeader: block.type,
            elementType: "COMMAND",
            callback: () => {
                blocklyStore.centerTo(block);
                block.select();
            }
        }
    }

    function showMacroMenuCommand() {
        commandStore.hint = "";
        commandStore.setCommandItems(commandStore.createMacroMenuCommandItems());
        commandStore.modalState.isShowing = true;
    }

    function createCodeGenerationMenuItems() {
        const codeGenerationMenuItems: IDropDownMenuItem[] = [
            {
                header: "デコードなし",
                enabled: true,
                clicked: () => createCode(),
            },
            {
                header: "デコードなし（チェックポイント）",
                enabled: true,
                clicked: () => createCode(StatementPrefix.CHECK_POINT)
            },
            {
                header: "デコードあり",
                enabled: true,
                clicked: () => createDecodedCode()
            },
            {
                header: "デコードあり（チェックポイント）",
                enabled: true,
                clicked: () => createDecodedCode(StatementPrefix.CHECK_POINT)
            },
        ]
        return codeGenerationMenuItems;
    }

    function createWorkspaceMenuItems() {
        const workspaceMenuItems: IDropDownMenuItem[] = [
            {
                header: "コピー（XML）",
                enabled: true,
                clicked: () => copyWorkspace()
            },
            {
                header: "クリア",
                enabled: true,
                clicked: () => blocklyStore.clearWorkspace()
            }
        ]
        return workspaceMenuItems;
    }

    function createFindMenuItems() {
        return [
            {
                header: "「ここから実行」ブロックを探す",
                enabled: true,
                clicked: () => blocklyStore.centerToEntryBlock()
            },
            {
                header: "IDからブロックを探す",
                enabled: true,
                clicked: () => showFindBlockCommand()
            }
        ] as IDropDownMenuItem[]
    }
})