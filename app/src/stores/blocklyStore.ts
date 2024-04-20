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
import { useDebounceFn } from "@vueuse/core";
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
        this.workspace = Blockly.common.getWorkspaceById(this.workspaceSvg.id);
        //this.workspaceSvg.addChangeListener(Blockly.Events.disableOrphans);
        this.workspaceSvg.addChangeListener(disableOrphans);
        this.workspaceSvg.addChangeListener((e) => this.onChange(e, this));
        this.workspaceSvg.scrollbar?.setVisible(false);
        // this.workspaceSvg.registerButtonCallback("addKeyValue", this.addKeyValue);
    }

    toggleScrollbarVisiblity() {
        const newVisibility = !this.workspaceSvg.scrollbar?.isVisible();
        this.workspaceSvg.scrollbar?.setVisible(newVisibility);
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
            getAllChildBlocks(selectedBlock).forEach(block => block.setEnabled(false));
            logCurrentBlockStatus(selectedBlock.workspace.id, selectedBlock);
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
            logCurrentBlockStatus(selectedBlock.workspace.id, selectedBlock);
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
            try {
                const state = JSON.parse(json);
                Blockly.Events.disable();
                Blockly.serialization.workspaces.load(state, workspace);
                this.setInitialScrollPosition();
                useDebounceFn(() => { Blockly.Events.enable(); }, 500)();
            } catch (error) {
                console.log("---------------読み込みエラー---------------");
                console.log(error);
                console.log(json);
                console.log("---------------読み込みエラー---------------");
                throw error;
            }
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

/*
    Blockly.Events.disableOrphans
*/
type LoggedStatusDictionary = {
    [workspaceId: string]: LoggedStatus;
}

type BlockStatus = { [id: string]: boolean }

const loggedBlockDic: LoggedStatusDictionary = {};

class LoggedStatus {
    constructor(public blocks: BlockSvg[], public blockStatus: BlockStatus, public isConnectedRootStatement: boolean) {
    }
}

export function disableOrphans(event: Blockly.Events.Abstract) {

    if (!(event.type === Blockly.Events.SELECTED
        || event.type === Blockly.Events.MOVE
        || event.type === Blockly.Events.BLOCK_DRAG
        || event.type === Blockly.Events.CHANGE)) {
        return;
    }

    if (!event.workspaceId) {
        return;
    }

    // イベントが発生したワークスペース取得
    const workspace = Blockly.common.getWorkspaceById(event.workspaceId) as WorkspaceSvg;
    if (!event.workspaceId) {
        return;
    }

    // 選択しているブロックのIDを取得
    const id = Blockly.getSelected()?.id;
    if (!id) {
        return;
    }

    // 選択しているブロックを取得
    const block = workspace.getBlockById(id);
    if (!block) {
        return;
    }

    // ルートのステートメントブロックの場合
    if (isRootStatement(block)) {
        return;
    }

    if (event.type === Blockly.Events.CHANGE) {
        logCurrentBlockStatus(workspace.id, block);
        return;
    }

    // ルートブロックに接続されてないブロックを探し無効にする
    const topBlocks = workspace.getTopBlocks();
    for (const topBlock of topBlocks) {
        if (topBlock.nextConnection) {
            const children = getAllChildBlocks(topBlock);
            children.forEach(child => child.setEnabled(false));
        }
    }

    // 選択したときに一連のブロックとブロックの状態を取得して記録しておく
    if (event.type === Blockly.Events.SELECTED) {
        logCurrentBlockStatus(workspace.id, block);

        // ドラッグ開始したとき
    } else if (event.type === Blockly.Events.BLOCK_DRAG && !(event as Blockly.Events.BlockDrag)?.isStart) {
        // ドラッグ時に記録した子ブロックを取得
        for (const block of loggedBlockDic[workspace.id].blocks) {
            block.setEnabled(true);
        }
        // ブロックの位置が変更されたため記録を更新する
        logCurrentBlockStatus(workspace.id, block);
    }
}

export function logCurrentBlockStatus(workspaceId: string, block: BlockSvg) {
    // すべての子ブロックを取得
    const blocks = getAllChildBlocks(block);
    // ルートブロックを取得
    const rootStatement = getRootBlock(block);
    // ルートブロックがあるかどうかチェックする
    const isConnectedToRootStatement = rootStatement !== undefined;
    // 記録しておく
    loggedBlockDic[workspaceId] = new LoggedStatus(blocks, {}, isConnectedToRootStatement);
}

export function isRootStatement(block: BlockSvg | undefined) {
    if (!block) {
        return false;
    }
    const isBlockStatement = block.statementInputCount > 0;
    const canConnectPrevious = block.previousConnection !== null;
    return isBlockStatement && !canConnectPrevious;
}

export function getAllChildBlocks(block: BlockSvg) {
    const results = [];
    let current: BlockSvg | null = block;
    do {
        results.push(current);
        current = current.getNextBlock();
    } while (current);
    return results;
}

export function getParentStatementBlocks(block: BlockSvg) {
    let ancestor = block;
    const blocks: BlockSvg[] = [];
    while (true) {
        let parent = ancestor.getParent();
        if (!parent) { break; }
        if (parent.statementInputCount) {
            blocks.push(parent);
        }
        ancestor = parent;
    }
    return blocks;
}

export function getRootBlock(block: BlockSvg) {
    let ancestor = block;
    while (true) {
        let parent = ancestor.getParent();
        if (!parent) { break; }
        ancestor = parent;
    }
    return ancestor.id !== block.id ? ancestor : undefined;
}