import { defineStore } from "pinia";
import { javascriptGenerator } from "blockly/javascript";
import Blockly, { WorkspaceSvg } from "blockly/core"
import { setLocaleToJa } from "../configurations/language";
import { defineTheme } from "../configurations/theme";
import { defineCodeGenerator } from "../generators/defineGenerator";
import { defineBlocks } from "../blocks/defineBlocks";
import { options } from "../configurations/blocklyOptions"
import { defineWorkspaceContextMenu } from "../configurations/workspaceContextMenu";
//import formatXml from "xml-formatter"

export const useBlocklyStore = defineStore("blockly", () => {
    const generator = javascriptGenerator;

    let workspaceSvg: WorkspaceSvg | null = null;
    setLocaleToJa();
    defineTheme();
    defineBlocks();
    defineCodeGenerator(generator);
    defineWorkspaceContextMenu();

    return {
        generator,
        injectBlockly,
        backupState,
        setState,
        getState,
        createCode,
        createXml,
        copyBlockAsXml,
        pasteBlock
    };

    function injectBlockly(container: HTMLElement) {
        workspaceSvg = Blockly.inject(container, options);
        workspaceSvg.addChangeListener(Blockly.Events.disableOrphans);
        restoreState();
        Blockly.common.getMainWorkspace().addChangeListener(() => {
            backupState();
        });
    }

    function copyBlockAsXml(copyChildren: boolean | undefined) {
        const workspace = Blockly.common.getMainWorkspace();
        const selected = Blockly.getSelected();
        if (selected) {
            const selectedBlock = workspace.getBlockById(selected.id);
            if (selectedBlock) {
                if (selectedBlock?.type == "main") {
                    alert("開始ブロックはコピーできません。");
                    return;
                }
                const dom = Blockly.Xml.blockToDom(selectedBlock, false);
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
        }
        return "";
    }

    function pasteBlock(xml: string) {
        const workspace = Blockly.common.getMainWorkspace();
        const dom = Blockly.utils.xml.textToDom(xml);
        const results = Blockly.Xml.domToWorkspace(dom, workspace);
        console.log(results);
    }

    function createXml() {
        const workspace = Blockly.common.getMainWorkspace();
        const xmlDom = Blockly.Xml.workspaceToDom(workspace);
        const xml = Blockly.Xml.domToText(xmlDom);
        return xml;
    }

    function createCode(): string {
        const workspace = Blockly.common.getMainWorkspace();
        const code = javascriptGenerator.workspaceToCode(workspace);
        return code;
    }

    function backupState() {
        localStorage.setItem("state", getState());
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

    function addMainBlock() {
        const block = workspaceSvg?.newBlock("main");
        block?.moveTo(new Blockly.utils.Coordinate(100, 100));
        block?.initSvg();
        block?.initModel();
        block?.render();
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
