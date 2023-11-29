import Blockly, { BlockSvg, MenuGenerator } from "blockly";
import { BlockColors } from "../../configurations/blockColors";

export function defineControllerBlocks() {

    Blockly.Blocks['controller'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("コントローラー");
            this.setInputsInline(true);
            this.setOutput(true, "Controller");
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['controller_proeprty'] = {
        init: function () {
            const menus: MenuGenerator = [
                ["接続されている？", "IS_CONNECTED"],
                ["コントローラーはDirectInput？", "IS_DIRECTINPUT"],
                ["コントローラーはXInput", "IS_XINPUT"],
            ];
            this.appendValueInput("CONTROLLER")
                .setCheck("Controller");
            this.appendDummyInput()
                .appendField("→");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(menus), "DROPDOWN");
            this.setInputsInline(true);
            this.setColour(BlockColors.Logic);
            this.setOutput(true, "Boolean");
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['is_controller_pressed'] = {
        init: function () {
            this.appendValueInput("CONTROLLER")
                .setCheck("Controller");
            this.appendDummyInput()
                .appendField("→");
            this.appendValueInput("BUTTON")
                .setCheck("ControllerButtons");
            this.appendDummyInput()
                .appendField("は押されて")
                .appendField(new Blockly.FieldDropdown([["いる", "PRESSED"], ["いない", "RELEASED"]]), "DROPDOWN");
            this.setInputsInline(true);
            this.setColour(BlockColors.Logic);
            this.setOutput(true, "Boolean");
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['controller_stick_property'] = {
        init: function () {
            const sticks: MenuGenerator = [
                ["左スティック", "LEFT"],
                ["右スティック", "RIGHT"],
            ];
            const properties: MenuGenerator = [
                ["横方向の値", "HORIZONTAL_VALUE"],
                ["縦方向の値", "VERTICAL_VALUE"],
                ["角度", "ANGLE"],
                ["入力率", "INPUT_RATE"],
                ["入力している方向", "DIRECTION"],
                ["デッドゾーンの値", "DEADZONE"],
                ["デッドゾーンを超えている？", "OVER_DEADZONE"],
            ]
            this.appendValueInput("CONTROLLER")
                .setCheck("Controller");
            this.appendDummyInput()
                .appendField("→")
                .appendField(new Blockly.FieldDropdown(sticks), "STICK");
            this.appendDummyInput()
                .appendField("の")
                .appendField(new Blockly.FieldDropdown(properties), "PROPERTY");
            this.setInputsInline(true);
            this.setColour(BlockColors.Logic);
            this.setOutput(true, "Boolean");
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

}