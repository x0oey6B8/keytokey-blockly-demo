import { defineStore } from "pinia";
import { javascriptGenerator } from "blockly/javascript";
import Blockly, { Block, BlockSvg, WorkspaceSvg } from "blockly/core"
import { setLocaleToJa } from "../configurations/language";
import { defineTheme } from "../configurations/theme";
import { StatementPrefix, defineCodeGenerator, setStatementPrefix } from "../definitions/generators/defineGenerator";
import { defineBlocks } from "../definitions/blocks/defineBlocks";
import { options } from "../configurations/blocklyOptions"
import { defineContextMenu } from "../definitions/contextMenus/defineContextMenu";
import { ref } from "vue";
//import formatXml from "xml-formatter"

export const useBlocklyStore = defineStore("blockly", () => {
    const generator = javascriptGenerator;

    let workspaceSvg: WorkspaceSvg | null = null;
    const isScriptRunning = ref(false);
    setLocaleToJa();
    defineTheme();
    defineBlocks();
    defineCodeGenerator(generator);
    defineContextMenu();
    registerGlobalFunctions();

    return {
        generator,
        isScriptRunning,
        injectBlockly,
        isSelectedBlockFunction,
        disconnectSelectedBlock,
        canDisconnectSelectedBlock,
        backupState,
        setState,
        getAllBlocks,
        getState,
        getSelectedBlock,
        centerToEntryBlock,
        centerTo,
        createCode,
        createDecodedCode,
        createXml,
        copyBlockAsXml,
        pasteBlock,
        clearWorkspace,
        resizeWorkspaceSvg
    };

    function registerGlobalFunctions() {
        const w = (window as any);
    }

    function addKeyValue() {
        console.log("addKeyValue");
        alert("未実装");
    }

    function injectBlockly(container: HTMLElement) {
        workspaceSvg = Blockly.inject(container, options);
        workspaceSvg.addChangeListener(Blockly.Events.disableOrphans);
        workspaceSvg.registerButtonCallback("addKeyValue", addKeyValue);

        //window.addEventListener('resize', onresize, false);
        // onresize();

        restoreState();
        addEntryProcedureBlock(workspaceSvg);
        Blockly.common.getMainWorkspace().addChangeListener(() => {
            backupState();
            if (workspaceSvg) {
                workspaceSvg.getAllBlocks(true).forEach(b => {
                    const comment = b.getIcon(Blockly.icons.IconType.COMMENT);
                    if (comment) {
                        comment.setBubbleSize({ width: 500, height: 500 });
                    }
                });
            }
        });
    }

    function centerToEntryBlock() {
        if (workspaceSvg) {
            const blocks = workspaceSvg.getAllBlocks(true);
            const anyEntryBlocks = blocks.filter(block => block.type == "procedures_defnoreturn" && block.getFieldValue("NAME") === "ここから実行");
            if (anyEntryBlocks.length > 0) {
                const block = anyEntryBlocks[0];
                workspaceSvg.centerOnBlock(block.id);
                block.select();
            }
        }
    }

    function centerTo(block: BlockSvg) {
        if (workspaceSvg) {
            workspaceSvg.centerOnBlock(block.id);
            block.select();
        }
    }

    function resizeWorkspaceSvg() {
        Blockly.svgResize(workspaceSvg as Blockly.WorkspaceSvg);
    }

    function clearWorkspace() {
        if (workspaceSvg) {
            const result = confirm("ワークスペースの内容をリセットします。\nよろしいですか？");
            if (result) {
                workspaceSvg.clear();
                addEntryProcedureBlock(workspaceSvg);
            }
        }
    }

    function getAllBlocks(): Blockly.BlockSvg[] {
        if (workspaceSvg) {
            return workspaceSvg.getAllBlocks(true);
        } else {
            return []
        }
    }

    function getSelectedBlock(): Blockly.Block | null {
        const workspace = Blockly.common.getMainWorkspace();
        const selected = Blockly.getSelected();
        if (selected) {
            const selectedBlock = workspace.getBlockById(selected.id);
            if (selectedBlock) {
                return selectedBlock;
            }
        }
        return null;
    }

    function isSelectedBlockFunction(): boolean {
        const selectedBlock = getSelectedBlock();
        if (selectedBlock) {
            if (selectedBlock.type === "procedures_defnoreturn"
                || selectedBlock.type === "procedures_defreturn") {
                return true;
            }
        }
        return false;
    }

    function canDisconnectSelectedBlock(): boolean {
        const selectedBlock = getSelectedBlock();
        if (selectedBlock) {
            const previous = selectedBlock.getPreviousBlock();
            const next = selectedBlock.getPreviousBlock();
            if (previous && next) {
                return true;
            }
        }
        return false;
    }

    function disconnectSelectedBlock() {
        const selectedBlock = getSelectedBlock();
        if (selectedBlock) {
            selectedBlock.unplug(true);
        }
    }

    function copyBlockAsXml(copyChildren: boolean | undefined) {
        const selectedBlock = getSelectedBlock();
        if (selectedBlock) {
            const dom = Blockly.Xml.blockToDom(selectedBlock, true);
            if (!copyChildren) {
                Blockly.Xml.deleteNext(dom);
            }
            let xml = `<xml>${Blockly.Xml.domToText(dom)}</xml>`
            // xml = formatXml(xml, {
            //     indentation: '  ',
            //     ignoredPaths: ["field", "comment"]
            // });
            return xml;
        }
        return "";
    }

    function pasteBlock(xml: string): string[] {
        const workspace = Blockly.common.getMainWorkspace();
        const dom = Blockly.utils.xml.textToDom(xml);
        const addedBlockIds = Blockly.Xml.domToWorkspace(dom, workspace);
        return addedBlockIds;
    }

    function createXml() {
        const workspace = Blockly.common.getMainWorkspace();
        const xmlDom = Blockly.Xml.workspaceToDom(workspace, true);
        const xml = Blockly.Xml.domToText(xmlDom);
        return xml;
    }

    function createCode(prefix: StatementPrefix = StatementPrefix.NONE): string {
        setStatementPrefix(generator, prefix);
        const workspace = Blockly.common.getMainWorkspace();
        const generatedCode = generator.workspaceToCode(workspace);
        const indentedCode = insertIndentation(generatedCode);
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
        return code;
    }

    function createDecodedCode(prefix: StatementPrefix = StatementPrefix.NONE): string {
        const code = createCode(prefix);
        const decodedCode = decode(code);
        return decodedCode;
    }

    function decode(text: string) {
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

    function insertIndentation(text: string) {
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

    function backupState() {
        const currentState = getState();
        localStorage.setItem("state", currentState);
    }

    function restoreState() {
        try {
            const previousState = localStorage.getItem("state");
            if (previousState) {
                setState(previousState);
            }
        } catch (error) {
        }
    }

    function addEntryProcedureBlock(workspaceSvg: WorkspaceSvg) {
        const procedureBlocks = workspaceSvg.getBlocksByType("procedures_defnoreturn", true);
        const anyEntryBlocks = procedureBlocks.filter(block => block.getFieldValue("NAME") === "ここから実行");
        if (anyEntryBlocks.length < 1) {
            const entryBlockXml = `<xml>
    <block type="procedures_defnoreturn" x="50" y="50">
        <field name="NAME" >ここから実行</field>
    </block>
</xml>`
            pasteBlock(entryBlockXml);
        }
    }

    function getState() {
        const workspace = Blockly.common.getMainWorkspace();
        const json = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
        return json;
    }

    function setState(json: string) {
        const workspace = Blockly.common.getMainWorkspace();
        const state = JSON.parse(json);
        Blockly.serialization.workspaces.load(state, workspace);
    }
});

