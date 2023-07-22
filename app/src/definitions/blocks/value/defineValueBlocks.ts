import Blockly, { Block } from "blockly";
import { BlockColors } from "../../../configurations/blockColors.ts";

export function defineValueBlocks() {
    Blockly.Blocks['point'] = {
        init: function () {
            this.appendValueInput("X")
                .setCheck("Number")
                .appendField("X：");
            this.appendValueInput("Y")
                .setCheck("Number")
                .appendField("Y：");
            this.setInputsInline(true);
            this.setOutput(true, "Point");
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['get_point'] = {
        init: function () {
            this.appendValueInput("POINT")
                .setCheck("Point");
            this.appendDummyInput()
                .appendField(".")
                .appendField(new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"]]), "DROPDOWN");
            this.setInputsInline(true);
            this.setOutput(true, "Number");
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;
}