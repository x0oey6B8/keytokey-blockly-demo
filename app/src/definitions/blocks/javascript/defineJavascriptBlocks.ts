import Blockly, { Block } from "blockly";
import { BlockColors } from "../../../configurations/blockColors.ts";

export function defineJavascriptBlocks() {
    Blockly.Blocks['run_js'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("  javascriptコードを実行")
            this.appendDummyInput()
                .appendField(new Blockly.FieldMultilineInput("console.log('execute!')"), "CODE");
            this.setColour(BlockColors.Action);
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['evaluate_js'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("return: ")
                .appendField(new Blockly.FieldMultilineInput("Math.random() * 12"), "CODE");
            this.setColour(BlockColors.Action);
            this.setOutput(true, null);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

}