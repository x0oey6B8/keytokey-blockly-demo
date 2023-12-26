import Blockly, { Block } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";

export function defineJavascriptBlocks() {
    Blockly.Blocks['embedded_multiline_javascript'] = {
        init: function () {

            const code = `/*\n    任意のコードを埋め込みできます。\n*/`;

            this.appendDummyInput()
                .appendField("  javascriptを埋め込む")
            this.appendDummyInput()
                .appendField(new Blockly.FieldMultilineInput(code), "CODE");
            this.setColour(BlockColors.Action);
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['embedded_singleline_javascript'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("javascript:")
                .appendField(new Blockly.FieldMultilineInput("'任意のコード'"), "CODE");
            this.setColour(BlockColors.Action);
            this.setOutput(true, null);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['json_stringify'] = {
        init: function () {
            this.appendValueInput("VALUE")
                .appendField("値：");
            this.appendDummyInput()
                .appendField("をJSON文字列に変換");
            this.setColour(BlockColors.Text);
            this.setOutput(true, null);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['formatted_json_stringify'] = {
        init: function () {
            this.appendValueInput("VALUE")
                .appendField("値：");
            this.appendDummyInput()
                .appendField("をJSON文字列に変換（改行あり）");
            this.setColour(BlockColors.Text);
            this.setOutput(true, null);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

}