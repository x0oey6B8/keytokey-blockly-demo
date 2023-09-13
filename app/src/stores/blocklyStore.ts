import { defineStore } from "pinia";
import { javascriptGenerator } from "blockly/javascript";
import Blockly, { BlockSvg, WorkspaceSvg } from "blockly/core"
import { setLocaleToJa } from "../configurations/language";
import { defineTheme } from "../configurations/theme";
import { StatementPrefix, defineCodeGenerator, setStatementPrefix } from "../definitions/generators/defineGenerator";
import { defineBlocks } from "../definitions/blocks/defineBlocks";
import { options } from "../configurations/blocklyOptions"
import { defineContextMenu } from "../definitions/contextMenus/defineContextMenu";
import { overwriteMessages } from "../definitions/message/overwrite"
//import formatXml from "xml-formatter"

export const useBlocklyStore = defineStore("blockly", () => {
    const generator = javascriptGenerator;

    //Blockly.FieldDropdown.MAX_MENU_HEIGHT_VH = 0.65
    let workspaceSession: WorkspaceSession | undefined = undefined;

    setLocaleToJa();
    defineTheme();
    defineBlocks();
    defineCodeGenerator(generator);
    defineContextMenu();
    overwriteMessages();
    registerGlobalFunctions();

    return {
        registerNewWorkspaceSession,
        getCurrentWorkspaceSession
    };

    function registerNewWorkspaceSession(container: HTMLElement) {
        workspaceSession = new WorkspaceSession(container, true, generator);
    }

    function getCurrentWorkspaceSession() {
        return workspaceSession;
    }

    function registerGlobalFunctions() {

    }
});

class WorkspaceSession {

    workspaceSvg: WorkspaceSvg
    isMainWorkspace: boolean;
    javascriptGenerator: any;

    constructor(container: HTMLElement, isMainWorkspace: boolean, javascriptGenerator: any) {
        this.javascriptGenerator = javascriptGenerator;
        this.isMainWorkspace = isMainWorkspace;
        this.workspaceSvg = Blockly.inject(container, options);
        this.workspaceSvg.addChangeListener(Blockly.Events.disableOrphans);
        this.workspaceSvg.registerButtonCallback("addKeyValue", this.addKeyValue);

        this.restoreState();
        this.addEntryProcedureBlock();
        this.workspaceSvg.addChangeListener((e) => {
            this.backupState();
            console.log(e);
        });
    }

    addKeyValue() {
        // notificationStore.toastMessage("未実装ダヨ", {
        //     position: "top-center",
        //     autoClose: 3000,
        //     type: "info",
        //     onClose: () => console.log("end")
        // })
    }

    makeWorkspaceReadOnly() {
        this.workspaceSvg.options.readOnly = true;
    }

    makeWorkspaceEditable() {
        this.workspaceSvg.options.readOnly = false;
    }

    centerToEntryBlock() {
        const entryBlock = this.getEntryProcedureBlock();
        if (entryBlock) {
            this.centerTo(entryBlock);
        }
    }

    zoomToFit() {
        this.workspaceSvg.zoomToFit();
    }

    centerTo(block: BlockSvg) {
        this.workspaceSvg.centerOnBlock(block.id);
        block.select();
    }

    centerToProcedureDefinition() {
        const block = this.getSelectedBlock();
        if (block) {
            const name = block.getFieldValue("NAME");
            const procedureBlock = Blockly.Procedures.getDefinition(name, this.workspaceSvg) as BlockSvg;
            if (procedureBlock) {
                this.centerTo(procedureBlock);
            }
        }
    }

    getProcedureBlocksByName() {
        const procedureBlocks = this.workspaceSvg.getAllBlocks(true).filter(block => this.isProcedureBlock(block));
        return procedureBlocks.map(block => {
            const name = block.getFieldValue("NAME");
            return { block, name }
        })
    }

    isProcedureBlock(block: BlockSvg) {
        return block.type === "procedures_defnoreturn"
            || block.type === "procedures_defreturn";
    }

    public resizeWorkspaceSvg() {
        Blockly.svgResize(this.workspaceSvg as Blockly.WorkspaceSvg);
    }

    clearWorkspace() {
        const result = confirm("ワークスペースの内容をリセットします。\nよろしいですか？");
        if (result) {
            this.workspaceSvg.clear();
            this.addEntryProcedureBlock();
        }
    }

    getAllBlocks(): Blockly.BlockSvg[] {
        return this.workspaceSvg.getAllBlocks(true);
    }

    getSelectedBlock(): Blockly.BlockSvg | null {
        const selected = Blockly.getSelected();
        if (selected) {
            const selectedBlock = this.workspaceSvg.getBlockById(selected.id);
            if (selectedBlock) {
                return selectedBlock;
            }
        }
        return null;
    }

    isSelectedBlockFunction(): boolean {
        const selectedBlock = this.getSelectedBlock();
        if (selectedBlock) {
            if (selectedBlock.type === "procedures_defnoreturn"
                || selectedBlock.type === "procedures_defreturn") {
                return true;
            }
        }
        return false;
    }

    canDisconnectSelectedBlock(): boolean {
        const selectedBlock = this.getSelectedBlock();
        if (selectedBlock) {
            const previous = selectedBlock.getPreviousBlock();
            const next = selectedBlock.getPreviousBlock();
            if (previous && next) {
                return true;
            }
        }
        return false;
    }

    disconnectSelectedBlock() {
        const selectedBlock = this.getSelectedBlock();
        if (selectedBlock) {
            selectedBlock.unplug(true);
        }
    }

    copyBlockAsXml(copyChildren: boolean) {
        const selectedBlock = this.getSelectedBlock();
        if (selectedBlock) {
            const dom = Blockly.Xml.blockToDom(selectedBlock, true);
            if (!copyChildren) {
                Blockly.Xml.deleteNext(dom);
            }
            let xml = `<xml>${Blockly.Xml.domToText(dom)}</xml>`
            return xml;
        }
        return "";
    }

    pasteBlock(xml: string): string[] {
        const dom = Blockly.utils.xml.textToDom(xml);
        const addedBlockIds = Blockly.Xml.domToWorkspace(dom, this.workspaceSvg);
        return addedBlockIds;
    }

    createXml() {
        const xmlDom = Blockly.Xml.workspaceToDom(this.workspaceSvg, true);
        const xml = Blockly.Xml.domToText(xmlDom);
        return xml;
    }

    createCode(prefix: StatementPrefix = StatementPrefix.NONE): string {
        const s = performance.now();
        setStatementPrefix(this.javascriptGenerator, prefix);
        const generatedCode = this.javascriptGenerator.workspaceToCode(this.workspaceSvg);
        const indentedCode = this.insertIndentation(generatedCode);
        //ここから実行：_E3_81_93_E3_81_93_E3_81_8B_E3_82_89_E5_AE_9F_E8_A1_8C()
        const entryFunction = "    _E3_81_93_E3_81_93_E3_81_8B_E3_82_89_E5_AE_9F_E8_A1_8C();"
        const codes = [
            "(() => {",
            indentedCode,
            entryFunction,
            "",
            "})();"
        ]
        const code = codes.join("\n");
        console.log(performance.now() - s);
        return code;
    }

    createDecodedCode(prefix: StatementPrefix = StatementPrefix.NONE): string {
        const code = this.createCode(prefix);
        const decodedCode = this.decode(code);
        return decodedCode;
    }

    private decode(text: string) {
        const regex = /(_[A-Z0-9]{2})+/g;
        const decodedStr = text.replace(regex, match => {
            try {
                const decoded = decodeURIComponent(match.replace(/_/g, '%'));
                return decoded;
            } catch (error) {
                return match;
            }
        });
        return decodedStr;
    }

    private insertIndentation(text: string) {
        // 改行文字で文字列を分割し、配列に格納する
        var lines = text.split('\n');

        // 各行の先頭に半角スペース4つを挿入する
        for (var i = 0; i < lines.length; i++) {
            lines[i] = '    ' + lines[i];
        }

        // 改行文字を用いて配列の要素を結合し、新しい文字列を生成する
        var indentedText = lines.join('\n');

        return indentedText;
    }

    backupState() {
        const currentState = this.getState();
        localStorage.setItem("state", currentState);
    }

    restoreState() {
        try {
            const previousState = localStorage.getItem("state");
            if (previousState) {
                this.setState(previousState);
            }
        } catch (error) {
        }
    }

    getEntryProcedureBlock() {
        const anyEntryBlocks = this.workspaceSvg.getAllBlocks(true).filter(block => block.type === "procedures_defnoreturn" && block.getFieldValue("NAME") === "ここから実行");
        return anyEntryBlocks.length > 0 ? anyEntryBlocks[0] : null;
    }

    addEntryProcedureBlock() {
        const entryBlock = this.getEntryProcedureBlock();
        if (!entryBlock) {
            const entryBlockXml = `
            <xml>
                <block type="procedures_defnoreturn" x="50" y="50">
                    <field name="NAME" >ここから実行</field>
                </block>
            </xml>
            `
            this.pasteBlock(entryBlockXml);
        }
    }

    getState() {
        const workspace = Blockly.common.getWorkspaceById(this.workspaceSvg.id);
        if (!workspace) {
            return "";
        }
        const json = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
        return json;
    }

    setState(json: string) {
        const workspace = Blockly.common.getWorkspaceById(this.workspaceSvg.id);
        if (workspace) {
            const state = JSON.parse(json);
            Blockly.serialization.workspaces.load(state, workspace);
        }
    }
}