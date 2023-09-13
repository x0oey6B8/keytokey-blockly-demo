import Blockly, { Block } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";

export function defineWaitBlocks() {
    Blockly.Blocks['wait'] = {
        init: function () {
            this.appendValueInput("WAIT_TIME")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["ミリ秒", "MILLISECONDS"], ["秒", "SECONDS"], ["分", "MINUTES"], ["時", "HOURS"]]), "UNIT")
                .appendField("待つ");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['highprecision_wait'] = {
        init: function () {
            this.appendValueInput("WAIT_TIME")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField("ミリ秒待つ");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;
}