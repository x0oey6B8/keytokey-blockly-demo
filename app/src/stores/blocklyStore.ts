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
import { defineTestCodeGenerator } from "../definitions/generators/defineCodeGenerator";
import { definedCodeGenerators } from "../definitions/generators/codeGenerator";
//import formatXml from "xml-formatter"

export const useBlocklyStore = defineStore("blockly", () => {
    /*
        消してはいけない
    */
    const generator = javascriptGenerator;
    console.log(generator);
    /*
        消さない
    */

    let workspaceSession: WorkspaceSession | undefined = undefined;

    setLocaleToJa();
    defineTheme();
    defineBlocks();
    defineCodeGenerator(generator);
    defineTestCodeGenerator(generator);
    defineContextMenu();
    overwriteMessages();
    registerGlobalFunctions();

    WorkspaceSession.javascriptGenerator = generator;

    return {
        generator,
        registerNewWorkspaceSession,
        getCurrentWorkspaceSession
    };

    function registerNewWorkspaceSession(container: HTMLElement, onChange: BlocklyOnChange) {
        console.log(typeof onChange);
        workspaceSession = new WorkspaceSession(container, true, onChange);
    }

    function getCurrentWorkspaceSession() {
        return workspaceSession;
    }

    function registerGlobalFunctions() {

    }
});

export type BlocklyOnChange = (e: Blockly.Events.Abstract, session: WorkspaceSession) => void;

export class WorkspaceSession {

    static javascriptGenerator: any;
    workspace: Blockly.Workspace | null;
    workspaceSvg: WorkspaceSvg
    isMainWorkspace: boolean;
    isToolboxShowing = true;

    constructor(container: HTMLElement, isMainWorkspace: boolean, private onChange: BlocklyOnChange) {
        this.isMainWorkspace = isMainWorkspace;
        this.workspaceSvg = Blockly.inject(container, options);
        this.workspaceSvg.addChangeListener(Blockly.Events.disableOrphans);
        this.workspace = Blockly.common.getWorkspaceById(this.workspaceSvg.id);
        this.workspaceSvg.addChangeListener((e) => this.onChange(e, this));
        // this.workspaceSvg.registerButtonCallback("addKeyValue", this.addKeyValue);
    }

    setInitialScrollPosition() {
        this.workspaceSvg.scroll(0, 0);
    }

    toggleToolboxVisiblity() {
        this.setToolboxVisiblity(!this.isToolboxShowing);
    }

    setToolboxVisiblity(visibility: boolean) {
        const toolbox = this.workspaceSvg.getToolbox();
        toolbox?.setVisible(this.isToolboxShowing = visibility);
        this.resizeWorkspaceSvg();
    }

    addKeyValue() {
        throw new Error("not implemented");
    }

    makeWorkspaceReadOnly() {
        this.workspaceSvg.options.readOnly = true;
    }

    makeWorkspaceEditable() {
        this.workspaceSvg.options.readOnly = false;
    }

    moveTo(block: BlockSvg, x: number, y: number) {
        block.moveTo(new Blockly.utils.Coordinate(x, y));

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

    hasEntryBlock() {
        const entryBlock = this.getProcedureBlocksByName().find(data => data.name === "_E3_81_93_E3_81_93_E3_81_8B_E3_82_89_E5_AE_9F_E8_A1_8C");
        return entryBlock !== undefined;
    }

    getParametersOfEntryBlock() {
        const block = this.getEntryProcedureBlock();
        if (!block) {
            return [];
        }

        const parameters = block?.getVars();
        const names: string[] = JSON.parse(JSON.stringify(parameters));
        return names;
    }

    isProcedureBlock(block: BlockSvg) {
        return block.type === "procedures_defnoreturn"
            || block.type === "procedures_defreturn";
    }

    public resizeWorkspaceSvg() {
        Blockly.svgResize(this.workspaceSvg as Blockly.WorkspaceSvg);
    }

    clearWorkspace(options: IWorkspaceClearOptions = { ask: true, }) {
        if (options.ask) {
            const result = confirm("ワークスペースの内容をリセットします。\nよろしいですか？");
            if (result) {
                this.workspaceSvg.clear();
            }
        } else {
            this.workspaceSvg.clear();
        }
    }

    removeBlock(block: BlockSvg) {
        block.dispose();
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

    cloneSelectedBlock() {
        const selectedBlock = this.getSelectedBlock();
        if (!selectedBlock) {
            return;
        }

        const xml = this.copyBlockAsXml(false);
        if (!xml) {
            return;
        }

        const blockIds = this.pasteBlock(xml);
        if (blockIds.length < 1) {
            return;
        }

        const newBlock = this.workspaceSvg.getBlockById(blockIds[0]);
        if (!newBlock) {
            return;
        }

        if (selectedBlock.nextConnection && newBlock.previousConnection) {
            selectedBlock.nextConnection.connect(newBlock.previousConnection);
        } else {
            this.centerTo(newBlock);
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
        setStatementPrefix(javascriptGenerator, prefix);
        const generatedCode = javascriptGenerator.workspaceToCode(this.workspaceSvg);
        //ここから実行：_E3_81_93_E3_81_93_E3_81_8B_E3_82_89_E5_AE_9F_E8_A1_8C()
        return generatedCode;
    }

    createDecodedCode(prefix: StatementPrefix = StatementPrefix.NONE): string {
        const code = this.createCode(prefix);
        const decodedCode = this.decode(code);
        return decodedCode;
    }

    createDescriptionCode() {
        for (const gen of definedCodeGenerators) { gen.target = "DESCRIPTION" }
        const code = this.createDecodedCode(StatementPrefix.NONE);
        for (const gen of definedCodeGenerators) { gen.target = "JAVASCRIPT" }
        return code;
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

    getEntryProcedureBlock() {
        const anyEntryBlocks = this.workspaceSvg.getAllBlocks(true).filter(block => block.type === "procedures_defnoreturn" && block.getFieldValue("NAME") === "ここから実行");
        return anyEntryBlocks.length > 0 ? anyEntryBlocks[0] : null;
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
            Blockly.Events.disable();
            Blockly.serialization.workspaces.load(state, workspace);
            this.setInitialScrollPosition();
            Blockly.Events.enable();
        }
    }
}

export interface IWorkspaceClearOptions {
    ask: boolean,
}

export interface ISourceCodeWriter {
    write(sourceCode: ISourceCode): void;
}

export interface ISourceCode {
    json: string,
    javascript: string,
}