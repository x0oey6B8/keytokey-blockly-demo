import { defineStore } from "pinia";
import { javascriptGenerator } from "blockly/javascript";
import Blockly, { WorkspaceSvg } from "blockly/core"
import { setLocaleToJa } from "../configurations/language";
import { defineTheme } from "../configurations/theme";
import { StatementPrefix, defineCodeGenerator, setStatementPrefix } from "../definitions/generators/defineGenerator";
import { defineBlocks } from "../definitions/blocks/defineBlocks";
import { options } from "../configurations/blocklyOptions"
import { defineContextMenu } from "../definitions/contextMenus/defineContextMenu";
import { Runner } from "../runner/runner";
import { Multiselect } from "@mit-app-inventor/blockly-plugin-workspace-multiselect"
//import formatXml from "xml-formatter"

export const useBlocklyStore = defineStore("blockly", () => {
    const generator = javascriptGenerator;

    let workspaceSvg: WorkspaceSvg | null = null;
    setLocaleToJa();
    defineTheme();
    defineBlocks();
    defineCodeGenerator(generator);
    defineContextMenu();
    registerGlobalyFunctions();

    return {
        generator,
        runCode,
        injectBlockly,
        isSelectedBlockFunction,
        disconnectSelectedBlock,
        canDisconnectSelectedBlock,
        backupState,
        setState,
        getState,
        getSelectedBlock,
        createCode,
        createDecodedCode,
        createXml,
        copyBlockAsXml,
        pasteBlock,
        clearWorkspace
    };

    function registerGlobalyFunctions() {
        const w = (window as any);
        w.runCode = runCode;
    }

    async function runCode() {
        const code = `
(async function() {


    {
        const results = [];
        for (var i = 0; i < 10000; i++){
        const s = performance.now();
        const v = await chrome.webview.hostObjects.aaa.Test();
        const e = performance.now();
        const elapsed = e - s;
            results.push(elapsed);
        //console.log(elapsed);
        if (i % 100 == 0){
            console.log(i);
        }
        }
        console.log("ave: " + results.reduce((a, b) => a + b) / results.length);
        return;
    }


    //const sleep = (wait) => new Promise(resolve => setTimeout(resolve, wait));
    try{
        var s = performance.now();
        for (var i = 0; i < 10; i++) {
            //alert(i);
            //await sleep(1000);
            await chrome.webview.hostObjects.aaa.Sleep(1000);
            console.log(i);
        }
        var e = performance.now();
        console.log((e - s) + "ms");
        //throw new InterruptedError("");
        var a = "a b c d";
        var array = a.split(' ');
        alert(a);
        alert(array);
        alert(a.endsWith("d", 1))

    } catch(error){
        if (error instanceof InterruptedError){

        }
    }
})();`;
        const runner = new Runner;
        runner.run(code);
    }

    function addKeyValue() {
        console.log("addKeyValue");
        alert("未実装");
    }

    function injectBlockly(container: HTMLElement) {
        workspaceSvg = Blockly.inject(container, options);
        workspaceSvg.addChangeListener(Blockly.Events.disableOrphans);
        workspaceSvg.registerButtonCallback("addKeyValue", addKeyValue);
        initPlugin();
        restoreState();
        addEntryProcedureBlock(workspaceSvg);
        Blockly.common.getMainWorkspace().addChangeListener(() => {
            backupState();
        });
    }

    function initPlugin() {
        try {
            // Initialize plugin.
            const multiselectPlugin = new Multiselect(workspaceSvg);
            multiselectPlugin.init(options);
        } catch (error) {
            console.log(error);
        }
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

    function createCode(prefix: StatementPrefix = StatementPrefix.THROW_INTERRUPTED_EXCEPTION): string {
        setStatementPrefix(generator, prefix);
        const workspace = Blockly.common.getMainWorkspace();
        const generatedCode = generator.workspaceToCode(workspace);
        const indentedCode = insertIndentation(generatedCode);
        //ここから実行：_E3_81_93_E3_81_93_E3_81_8B_E3_82_89_E5_AE_9F_E8_A1_8C()
        const entryFunction = "        _E3_81_93_E3_81_93_E3_81_8B_E3_82_89_E5_AE_9F_E8_A1_8C();"
        const codes = [
            "(async () => {",
            indentedCode,
            "    try {",
            entryFunction,
            "    } catch (error) {",
            "        if (error instanceof InterruptedError) {",
            "            console.log('interrupted');",
            "        } else {",
            "            console.log(error);",
            "        }",
            "    }",
            "})();"
        ]
        const code = codes.join("\n");
        //const code = `(async () => {\n${indentedCode}\n${entryFunction}\n})();`
        return code;
    }

    function createDecodedCode(prefix: StatementPrefix = StatementPrefix.THROW_INTERRUPTED_EXCEPTION): string {
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
