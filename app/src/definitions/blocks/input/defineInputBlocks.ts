import Blockly, { Block } from "blockly";
import { keys } from "./keys.ts";
import { BlockColors } from "../../../configurations/blockColors.ts";

export function defineInputBlocks() {
    Blockly.Blocks['key_event'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("キー／マウスが")
                .appendField(new Blockly.FieldDropdown([["押されたら", "PRESSED"], ["離されたら", "RELEASED"]]), "BEHAVIOR")
                .appendField("代入：")
                .appendField(new Blockly.FieldVariable("キー"), "KEY");
            this.appendStatementInput("STAMEMENT")
                .setCheck(null);
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Event);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks["trigger_is_pressed"] = {
        init: function () {
            this.appendDummyInput().appendField("トリガーが押されていたら");
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("");
            this.setHelpUrl("");
        },
    };

    Blockly.Blocks['down_up'] = {
        init: function () {
            this.appendValueInput("KEY")
                .setCheck("Keys");
            this.appendDummyInput()
                .appendField("を");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["押して", "Down"], ["離して", "Up"]]), "BEHAVIOR");
            this.appendValueInput("WAIT")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField("ミリ秒待機");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['tap'] = {
        init: function () {
            this.appendValueInput("KEY1")
                .setCheck("Keys");
            this.appendDummyInput()
                .appendField("を押して");
            this.appendValueInput("WAIT1")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField("ミリ秒待つ")
                .appendField("【キーの名前】を離して", "KEY2");
            this.appendValueInput("WAIT2")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField("ミリ秒待つ");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        onchange: function (_) {
            const key = this.getInputTargetBlock("KEY1")?.toString();
            if (key !== undefined) {
                this.getField("KEY2")?.setValue(`【${key}】を離して`);
            } else {
                this.getField("KEY2")?.setValue(`【キーの名前】を離して`);
            }
        }
    } as Block;

    Blockly.Blocks['up_all'] = {
        init: function () {
            this.appendValueInput("EXCLUDED_KEYS")
                .setCheck("Array")
                .appendField("すべてのキーを離す｜除外キーのリスト：");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['keys_value'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(keys), "VALUE");
            this.setInputsInline(true);
            this.setOutput(true, "Keys");
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };



    Blockly.Blocks['get_cursor_point'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスカーソルの座標を取得");
            this.setInputsInline(true);
            this.setOutput(true, "Point");
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['origin_point'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウス：原点座標を");
            this.appendValueInput("ORIGIN")
                .setCheck("Point");
            this.appendDummyInput()
                .appendField("に設定");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['move_absolute'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスを");
            this.appendValueInput("POINT")
                .setCheck("Point")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput()
                .appendField("に移動");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['move_absolute_smoothly'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスを")
                .appendField(new Blockly.FieldDropdown([["とても速い", "REALLY_FAST"], ["速い", "FAST"], ["普通", "NORMAL"], ["遅い", "SLOW"], ["とても遅い", "REALLY_SLOW"]]), "SPEED")
                .appendField("速度で");
            this.appendValueInput("POINT")
                .setCheck("Point")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput()
                .appendField("に移動");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['move_relative'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスを");
            this.appendDummyInput()
                .appendField("横に");
            this.appendValueInput("DX")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput()
                .appendField("縦に");
            this.appendValueInput("DY")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput()
                .appendField("移動");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['move_relative_smoothly'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスを")
                .appendField(new Blockly.FieldDropdown([["とても速い", "REALLY_FAST"], ["速い", "FAST"], ["普通", "NORMAL"], ["遅い", "SLOW"], ["とても遅い", "REALLY_SLOW"]]), "SPEED")
                .appendField("の速度で");
            this.appendDummyInput()
                .appendField("横に");
            this.appendValueInput("DX")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput()
                .appendField("縦に");
            this.appendValueInput("DY")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput()
                .appendField("移動");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
}