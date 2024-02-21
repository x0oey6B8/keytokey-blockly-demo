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
    const generator = javascriptGenerator;
    console.log(generator); // 消さないで：何故かは知らないけど出力するとgeneratorがundefinedにならない

    let workspaceSession: WorkspaceSession | undefined = undefined;

    setLocaleToJa();
    defineTheme();
    defineBlocks();
    defineCodeGenerator(generator);
    defineTestCodeGenerator(generator);
    defineContextMenu();
    overwriteMessages();
    registerGlobalFunctions();

    return {
        generator,
        registerNewWorkspaceSession,
        getCurrentWorkspaceSession
    };

    function registerNewWorkspaceSession(container: HTMLElement, sourceCodeWriter: ISourceCodeWriter) {
        workspaceSession = new WorkspaceSession(container, true, generator, sourceCodeWriter);
    }

    function getCurrentWorkspaceSession() {
        return workspaceSession;
    }

    function registerGlobalFunctions() {

    }
});

class WorkspaceSession {

    workspace: Blockly.Workspace | null;
    workspaceSvg: WorkspaceSvg
    isMainWorkspace: boolean;
    javascriptGenerator: any;

    constructor(container: HTMLElement, isMainWorkspace: boolean, javascriptGenerator: any, private sourceCodeWriter: ISourceCodeWriter) {
        this.javascriptGenerator = javascriptGenerator;
        this.isMainWorkspace = isMainWorkspace;
        this.workspaceSvg = Blockly.inject(container, options);
        this.workspaceSvg.addChangeListener(Blockly.Events.disableOrphans);
        // this.workspaceSvg.registerButtonCallback("addKeyValue", this.addKeyValue);
        this.workspace = Blockly.common.getWorkspaceById(this.workspaceSvg.id);
        this.workspaceSvg.addChangeListener((e) => {
            //if (e.recordUndo) {
            console.log(e);
            const json = this.getState();
            const javascript = this.createCode(StatementPrefix.CHECK_POINT);
            this.sourceCodeWriter.write({ json, javascript });
            //}
        });
    }

    setInitialScrollPosition() {
        this.workspaceSvg.scroll(0, 0);
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

        // 接続
        const nextBlock = selectedBlock.getNextBlock(); // 元のブロックの次のブロックを取得

        // 新しいブロックと元のブロックの接続を行う前に、それぞれの接続が存在するかを確認
        const newBlockPrevConnection = newBlock.previousConnection;
        const selectedBlockNextConnection = selectedBlock.nextConnection;

        if (nextBlock && newBlockPrevConnection && selectedBlockNextConnection) {
            // 接続を解除せずに接続を行う
            newBlockPrevConnection.connect(nextBlock.previousConnection);
            selectedBlockNextConnection.connect(newBlockPrevConnection);
        } else if (selectedBlockNextConnection && newBlockPrevConnection) {
            // 元のブロックに次のブロックがない場合の接続
            selectedBlockNextConnection.connect(newBlockPrevConnection);
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
        //ここから実行：_E3_81_93_E3_81_93_E3_81_8B_E3_82_89_E5_AE_9F_E8_A1_8C()
        console.log(performance.now() - s);
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