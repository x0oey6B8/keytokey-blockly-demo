import { StatementPrefix } from "../../definitions/generators/defineGenerator";
import { IDropDownMenuItem } from "../../models/dropdown";
import { useAppStore } from "../../stores/appStore";
import { useBlocklyStore } from "../../stores/blocklyStore";
import { useEditorStore } from "../../stores/editorStore";

export class CreateCodeMenuItem implements IDropDownMenuItem {
    header = "実行用コード";
    subHeader = "code";
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

export class ShowCurrentBlockDescriptionMenuItem extends CreateDecodedCodeMenuItem {
    constructor() {
        super();
        this.header = "簡易コードを表示"
    }
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        const workspaceSession = blocklyStore.getCurrentWorkspaceSession()
        if (workspaceSession) {
            const code = workspaceSession.createDescriptionCode();
            const comment = "//" + this.commentOut(code);
            const editorStore = useEditorStore();
            editorStore.setCode(comment, "javascript", true);
        }
    }

    commentOut(code: string) {
        return code.split('\n').join('\n//');
    }
}

export class ShowBackgroundImplementationMenuItem extends CreateDecodedCodeMenuItem {
    constructor() {
        super();
        this.header = "バックグラウンドコードを表示"
    }
    clicked = () => {
        const editor = useEditorStore();
        const appStore = useAppStore();
        editor.setCode(appStore.implementation, "javascript", true);
    }
}