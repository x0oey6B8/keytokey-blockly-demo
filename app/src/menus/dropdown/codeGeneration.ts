import { StatementPrefix } from "../../definitions/generators/defineGenerator";
import { IDropDownMenuItem } from "../../models/dropdown";
import { useBlocklyStore } from "../../stores/blocklyStore";
import { useEditingMacro } from "../../stores/editingMacro";
import { useEditorStore } from "../../stores/editorStore";

export class CreateCodeMenuItem implements IDropDownMenuItem {
    header = "実行用コード";
    subHeader = "code";
    condition = () => true;
    clicked = () => {
        const editingMacro = useEditingMacro();
        if (!editingMacro.macro) {
            return;
        }
        const isLoggerEnabled = editingMacro.macro.setting.debug.logger.enabled;
        const prefix = isLoggerEnabled ? StatementPrefix.CHECK_POINT : StatementPrefix.NONE;
        this.createCode(prefix);
    };
    createCode = (prefix: StatementPrefix = StatementPrefix.NONE) => {
        const blocklyStore = useBlocklyStore();
        const workspaceSession = blocklyStore.getCurrentWorkspaceSession()
        if (workspaceSession) {
            const code = workspaceSession.createCode(prefix);
            const editorStore = useEditorStore();
            editorStore.setCode(code, "javascript", true);
        }
    }
}

export class CreateDecodedCodeMenuItem implements IDropDownMenuItem {
    header = "復号化";
    subHeader = "code";
    condition = () => true;
    clicked = () => {
        this.createDecodedCode(StatementPrefix.CHECK_POINT)
    };
    createDecodedCode = (prefix: StatementPrefix = StatementPrefix.NONE) => {
        const blocklyStore = useBlocklyStore();
        const workspaceSession = blocklyStore.getCurrentWorkspaceSession()
        if (workspaceSession) {
            const code = workspaceSession.createDecodedCode(prefix);
            const editorStore = useEditorStore();
            editorStore.setCode(code, "javascript", true);
        }
    }
}

export class CreateDecodedCodeNoCheckPointsMenuItem extends CreateDecodedCodeMenuItem {
    constructor() {
        super();
        this.header = "読みやすいコード"
    }
    clicked = () => {
        this.createDecodedCode(StatementPrefix.NONE);
    }
}