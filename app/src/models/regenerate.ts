import { StatementPrefix, setStatementPrefix } from "../definitions/generators/defineGenerator";
import { MacroFile } from "../hosts/macroManager";
import { useAppStore } from "../stores/appStore";
import { WorkspaceSession } from "../stores/blocklyStore";
import { useEditingMacro } from "../stores/editingMacro";
import { useNotificationStore } from "../stores/notificationStore";
import * as Blockly from "blockly"

export interface IRegeneratedCode {
    file: MacroFile;
    javascript: string;
}

export interface IRegenerationResult {
    success: boolean;
    codes: IRegeneratedCode[];
}

export async function regenerateCode(): Promise<IRegenerationResult> {
    const toaster = useNotificationStore();
    const editingStore = useEditingMacro();
    const macro = editingStore.macro;
    if (!macro) {
        toaster.toastMessage("マクロが選択されていません", {
            theme: "colored",
            type: "error"
        });
        return {
            success: false,
            codes: []
        }
    }

    const isLoggerEnabled = macro.setting.debug.logger.enabled;
    const prefix = isLoggerEnabled ? StatementPrefix.CHECK_POINT : StatementPrefix.NONE;
    const workspace = new Blockly.Workspace();
    const regeneratedCodes: IRegeneratedCode[] = [];
    for (const file of macro.listFiles()) {
        const content = await file.read();
        const json = JSON.parse(content.json);
        setStatementPrefix(WorkspaceSession.javascriptGenerator, prefix);
        Blockly.serialization.workspaces.load(json, workspace);
        const javascript = WorkspaceSession.javascriptGenerator.workspaceToCode(workspace);
        file.canWrite = true;
        file.write(content.json, javascript);
        file.canWrite = false;
        regeneratedCodes.push({ file, javascript });
    }
    workspace.dispose();

    const appStore = useAppStore();
    macro.setImplementation({ code: appStore.implementation });

    return {
        success: true,
        codes: regeneratedCodes
    }
}