import Blockly, { BlockSvg } from "blockly";
import { keys } from "./keys.ts";
import { BlockColors } from "../../configurations/blockColors.ts";
import { controllerButtons } from "./controllerButtons.ts";

export function defineValueBlocks() {

    Blockly.Blocks['keys'] = {
        init: function () {
            const dropdown = new Blockly.FieldDropdown(keys);
            this.appendDummyInput()
                .appendField(dropdown, "VALUE");
            this.setInputsInline(true);
            this.setOutput(true, "Keys");
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['controller_buttons'] = {
        init: function () {
            const dropdown = new Blockly.FieldDropdown(controllerButtons);
            this.appendDummyInput()
                .appendField(dropdown, "VALUE");
            this.setInputsInline(true);
            this.setOutput(true, "ControllerButtons");
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['point'] = {
        init: function () {
            this.appendValueInput("X")
                .setCheck("Number")
                .appendField("横：");
            this.appendValueInput("Y")
                .setCheck("Number")
                .appendField("縦：");
            this.setInputsInline(true);
            this.setOutput(true, "Point");
            this.setColour(BlockColors.Point);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['size'] = {
        init: function () {
            this.appendValueInput("X")
                .setCheck("Number")
                .appendField("横の長さ：");
            this.appendValueInput("Y")
                .setCheck("Number")
                .appendField("縦の長さ：");
            this.setInputsInline(true);
            this.setOutput(true, "Size");
            this.setColour(BlockColors.Size);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['get_point_property'] = {
        init: function () {
            this.appendValueInput("POINT")
                .appendField("座標：")
                .setCheck("Point");
            this.appendDummyInput()
                .appendField(".")
                .appendField(new Blockly.FieldDropdown([["横", "x"], ["縦", "y"]]), "DROPDOWN");
            this.setInputsInline(true);
            this.setOutput(true, "Number");
            this.setColour(BlockColors.Math);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;
}