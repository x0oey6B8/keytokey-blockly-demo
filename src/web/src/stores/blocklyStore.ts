import { defineStore } from "pinia";
import { javascriptGenerator } from "blockly/javascript";
import Blockly, { WorkspaceSvg } from "blockly/core"
import { setLocaleToJa } from "../configurations/language";
import { defineTheme } from "../configurations/theme";
import { defineCodeGenerator } from "../definitions/generators/defineGenerator";
import { defineBlocks } from "../definitions/blocks/defineBlocks";
import { options } from "../configurations/blocklyOptions"
import { defineContextMenu } from "../definitions/contextMenus/defineContextMenu";
//import formatXml from "xml-formatter"

export const useBlocklyStore = defineStore("blockly", () => {
    const generator = javascriptGenerator;

    let workspaceSvg: WorkspaceSvg | null = null;
    setLocaleToJa();
    defineTheme();
    defineBlocks();
    defineCodeGenerator(generator);
    defineContextMenu();

    return {
        generator,
        injectBlockly,
        disconnectSelectedBlock,
        canDisconnectSelectedBlock,
        backupState,
        setState,
        getState,
        createCode,
        createXml,
        copyBlockAsXml,
        pasteBlock,
        clearWorkspace
    };

    function addKeyValue() {
        console.log("addKeyValue");
        alert("未実装");
    }

    function injectBlockly(container: HTMLElement) {
        workspaceSvg = Blockly.inject(container, options);
        workspaceSvg.addChangeListener(Blockly.Events.disableOrphans);
        workspaceSvg.registerButtonCallback("addKeyValue", addKeyValue);
        restoreState();
        addEntryProcedureBlock(workspaceSvg);
        Blockly.common.getMainWorkspace().addChangeListener(() => {
            backupState();
        });
    }

    function clearWorkspace() {
        if (workspaceSvg) {
            const result = confirm("作業スペースの内容をリセットします。よろしいですか？");
            if (result) {
                workspaceSvg.clear();
                addEntryProcedureBlock(workspaceSvg);
            }
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

    function createCode(): string {
        const workspace = Blockly.common.getMainWorkspace();
        const code = javascriptGenerator.workspaceToCode(workspace);
        return code;
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
        <comment pinned="false" h="160" w="160"></comment>
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
