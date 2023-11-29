import Blockly, { BlockSvg } from "blockly";
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
    } as BlockSvg;

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
    } as BlockSvg;

    Blockly.Blocks['wait_for_input'] = {
        init: function () {
            this.appendValueInput("KEY")
                .setCheck("Keys");
            this.appendDummyInput()
                .appendField("の入力を待つ");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;
    Blockly.Blocks['wait_for_controller'] = {
        init: function () {
            this.appendValueInput("BUTTON")
                .appendField("コントローラー：")
                .setCheck("ControllerButtons");
            this.appendDummyInput()
                .appendField("の入力を待つ");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;
}