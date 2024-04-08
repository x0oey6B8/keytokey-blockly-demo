import Blockly from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";
import { OutputType } from "./outputType.ts";
import { xinputButtons } from "./xinputButtons.ts";
import { FieldSlider } from "@blockly/field-slider";

const xinputs = [
    ["XInput0", "0"],
    ["XInput1", "1"],
    ["XInput2", "2"],
    ["XInput3", "3"],
] as Blockly.MenuGenerator

export function defineVirtualXInputBlock() {
    Blockly.Blocks['virtual_xinput_down_up'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(xinputs), "DEVICE_NUMBER")
                .appendField("の")
                .appendField(new Blockly.FieldDropdown(xinputButtons), "BUTTON")
                .appendField("を")
                .appendField(new Blockly.FieldDropdown([["押す", "Down"], ["離す", "Up"]]), "BEHAVIOR");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想XInputコントローラーのボタンの入力を行います。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_xinput_tap'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(xinputs), "DEVICE_NUMBER")
                .appendField("の")
                .appendField(new Blockly.FieldDropdown(xinputButtons), "BUTTON")
                .appendField("を押して")
            this.appendValueInput("WAIT1")
                .setCheck(OutputType.Number);
            this.appendDummyInput()
                .appendField("ミリ秒待つ");
            this.appendValueInput("WAIT2")
                .appendField("離して")
                .setCheck(OutputType.Number);
            this.appendDummyInput()
                .appendField("ミリ秒待つ");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想XInputコントローラーのボタンの入力を行います。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_xinput_neutralize_dpad'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(xinputs), "DEVICE_NUMBER")
                .appendField("の十字キーを離す")
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想XInputコントローラーの十字キーを離します。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_xinput_stick_value'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(xinputs), "DEVICE_NUMBER")
                .appendField("の")
                .appendField(new Blockly.FieldDropdown([["左スティック", "leftStick"], ["右スティック", "rightStick"]]), "STICK")
                .appendField("に");
            this.appendValueInput("POINT")
                .setCheck(OutputType.Point)
                .appendField("入力座標：");
            this.appendDummyInput()
                .appendField("をセット");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想XInputコントローラーのスティックに入力座標を設定します。横:([左]-1.0～[無]0.0～[右]1.0), 縦:([上]-1.0～[無]0.0～[下]1.0)");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_xinput_stick_angle1'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(xinputs), "DEVICE_NUMBER")
                .appendField("の")
                .appendField(new Blockly.FieldDropdown([["左スティック", "leftStick"], ["右スティック", "rightStick"]]), "STICK")
                .appendField("に")
            this.appendDummyInput()
                .appendField("角度:")
                .appendField(new Blockly.FieldAngle(0, undefined, {
                    clockwise: true,
                    offset: 90
                }), "ANGLE");
            this.appendDummyInput()
                .appendField("入力率:")
                .appendField(new FieldSlider(0, 0.0, 1.0, 0.05), "INPUT_RATE")
            this.appendDummyInput()
                .appendField("をセット");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想XInputコントローラーのスティックに角度と入力率をセットします。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_xinput_stick_angle2'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(xinputs), "DEVICE_NUMBER")
                .appendField("の")
                .appendField(new Blockly.FieldDropdown([["左スティック", "leftStick"], ["右スティック", "rightStick"]]), "STICK")
                .appendField("に")
            this.appendValueInput("ANGLE")
                .appendField("角度:")
                .setCheck(OutputType.Number);
            this.appendValueInput("INPUT_RATE")
                .appendField("入力率:")
                .setCheck(OutputType.Number);
            this.appendDummyInput()
                .appendField("をセット");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想XInputコントローラーのスティックに角度と入力率をセットします。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_xinput_trigger1'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(xinputs), "DEVICE_NUMBER")
                .appendField("の")
                .appendField(new Blockly.FieldDropdown([["左トリガー", "leftTrigger"], ["右トリガー", "rightTrigger"]]), "TRIGGER")
                .appendField("に")
            this.appendDummyInput()
                .appendField("入力率:")
                .appendField(new FieldSlider(0, 0.0, 1.0, 0.05), "INPUT_RATE")
            this.appendDummyInput()
                .appendField("をセット");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想XInputコントローラーのトリガーに入力率をセットします。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_xinput_trigger2'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(xinputs), "DEVICE_NUMBER")
                .appendField("の")
                .appendField(new Blockly.FieldDropdown([["左トリガー", "leftTrigger"], ["右トリガー", "rightTrigger"]]), "TRIGGER")
                .appendField("に")
            this.appendValueInput("INPUT_RATE")
                .appendField("入力率:")
                .setCheck(OutputType.Number);
            this.appendDummyInput()
                .appendField("をセット");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想XInputコントローラーのトリガーに入力率をセットします。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_xinput_reset'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(xinputs), "DEVICE_NUMBER")
                .appendField("を");
            this.appendDummyInput()
                .appendField("をリセット");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想XInputコントローラーの状態をリセットします。");
            this.setHelpUrl("");
        }
    };
}