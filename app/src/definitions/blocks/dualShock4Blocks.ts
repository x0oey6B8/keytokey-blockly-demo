import Blockly from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";
import { OutputType } from "./outputType.ts";
import { FieldSlider } from "@blockly/field-slider";
import { dualShock4Buttons } from "./dualShock4Buttons.ts";

export function defineDualShock4Blocks() {
    Blockly.Blocks['virtual_dualshock4_down_up'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(" 仮想DualShock4コントローラーの")
                .appendField(new Blockly.FieldDropdown(dualShock4Buttons), "BUTTON")
                .appendField("を")
                .appendField(new Blockly.FieldDropdown([["押す", "Down"], ["離す", "Up"]]), "BEHAVIOR");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想DualShock4コントローラーのボタンの入力を行います。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_dualshock4_tap'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(" 仮想DualShock4コントローラーの")
                .appendField(new Blockly.FieldDropdown(dualShock4Buttons), "BUTTON")
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
            this.setTooltip("仮想DualShock4コントローラーのボタンの入力を行います。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_dualshock4_neutralize_dpad'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(" 仮想DualShock4コントローラーの十字キーを離す");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想DualShock4コントローラーの十字キーを離します。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_dualshock4_stick_value'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(" 仮想DualShock4コントローラーの")
                .appendField(new Blockly.FieldDropdown([["左スティック", "leftStick"], ["右スティック", "rightStick"]]), "STICK")
                .appendField("の");
            this.appendValueInput("POINT")
                .setCheck(OutputType.Point)
                .appendField("入力座標：");
            this.appendDummyInput()
                .appendField("をセット");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想DualShock4コントローラーのスティックに入力座標を設定します。横:([左]-1.0～[無]0.0～[右]1.0), 縦:([上]-1.0～[無]0.0～[下]1.0)");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_dualshock4_stick_angle1'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(" 仮想DualShock4コントローラーの")
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
            this.setTooltip("仮想DualShock4コントローラーのスティックに角度と入力率をセットします。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_dualshock4_stick_angle2'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(" 仮想DualShock4コントローラーの")
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
            this.setTooltip("仮想DualShock4コントローラーのスティックに角度と入力率をセットします。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_dualshock4_trigger1'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(" 仮想DualShock4コントローラーの")
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
            this.setTooltip("仮想DualShock4コントローラーのトリガーに入力率をセットします。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_dualshock4_trigger2'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(" 仮想DualShock4コントローラーの")
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
            this.setTooltip("仮想DualShock4コントローラーのトリガーに入力率をセットします。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['virtual_dualshock4_reset'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("仮想DualShock4コントローラーをリセット")
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("仮想XInputコントローラーの状態をリセットします。");
            this.setHelpUrl("");
        }
    };
}