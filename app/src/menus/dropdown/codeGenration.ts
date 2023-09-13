import { StatementPrefix } from "../../definitions/generators/defineGenerator";
import { IDropDownMenuItem } from "../../models/dropdown";
import { useBlocklyStore } from "../../stores/blocklyStore";
import { useEditorStore } from "../../stores/editorStore";

export class CreateCodeMenuItem implements IDropDownMenuItem {
    header = "実行用コード";
    condition = () => true;
    clicked = () => {
        this.createCode(StatementPrefix.CHECK_POINT)
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

export class CreateCodeNoCheckPointsMenuItem extends CreateCodeMenuItem {
    constructor() {
        super();
        this.header = "実行用コード（チェックポイントなし）"
    }
    clicked = () => {
        this.createCode(StatementPrefix.NONE);
    }
}

export class CreateDecodedCodeMenuItem implements IDropDownMenuItem {
    header = "復号化";
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
        this.header = "復号化 + チェックポイントなし"
    }
    clicked = () => {
        this.createDecodedCode(StatementPrefix.NONE);
    }
}