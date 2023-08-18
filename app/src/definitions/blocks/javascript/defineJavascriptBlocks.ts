import Blockly, { Block } from "blockly";
import { BlockColors } from "../../../configurations/blockColors.ts";

export function defineJavascriptBlocks() {
    Blockly.Blocks['js'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("  javascriptを埋め込む")
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
                .appendField("js(")
                .appendField(new Blockly.FieldMultilineInput("Math.random() * 12"), "CODE")
                .appendField(")")
            this.setColour(BlockColors.Action);
            this.setOutput(true, null);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

}