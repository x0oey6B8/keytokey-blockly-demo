import Blockly, { Block } from "blockly";
import { defineExpressionBlock } from "./expressionBlock";
import { keys } from "./keys.ts";

export function defineBlocks(): void {

    defineExpressionBlock();

    Blockly.Blocks['main'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("＠ここから実行");
            this.setNextStatement(true, null);
            this.setColour(270);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks["event_block"] = {
        init: function () {
            const keyVar = new Blockly.FieldVariable("キー");
            const isPressedVar = new Blockly.FieldVariable("押された");
            this.appendDummyInput().appendField("キー／マウスの入力が発生したら：").appendField(keyVar, "KEY_VARIABLE").appendField(isPressedVar, "IS_PRESSED_VARIABLE");
            this.appendStatementInput("DO").setCheck(null);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#b3b300");
            this.setTooltip("Tooltip");
            this.setHelpUrl("https://keytokey-dev.net");
        },
    } as Block;

    Blockly.Blocks["custom_method"] = {
        init: function () {
            this.appendDummyInput().appendField("メソッド名:").appendField(new Blockly.FieldTextInput("method_name"), "METHOD_NAME");
            this.appendValueInput("PARAMS").setCheck("Array").appendField("引数:");
            this.setInputsInline(true);
            this.setOutput(true, "String");
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        },
    };

    Blockly.Blocks["trigger_is_pressed"] = {
        init: function () {
            this.appendDummyInput().appendField("トリガーが押されていたら");
            this.setOutput(true, "Boolean");
            this.setColour(210);
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
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['up_all'] = {
        init: function () {
            this.appendValueInput("EXCLUDED_KEYS")
                .setCheck("Array")
                .appendField("すべてのキーを離す｜除外キーのリスト：");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
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
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

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
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }

    Blockly.Blocks['get_point'] = {
        init: function () {
            this.appendValueInput("POINT")
                .setCheck("Point");
            this.appendDummyInput()
                .appendField(".")
                .appendField(new Blockly.FieldDropdown([["横", "LEFT"], ["縦", "TOP"]]), "DROPDOWN");
            this.setInputsInline(true);
            this.setOutput(true, "Number");
            this.setColour(230);
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
            this.setColour(230);
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
            this.setColour(230);
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
            this.setColour(230);
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
            this.setColour(230);
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
            this.setColour(230);
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
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['get_global_variable'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("グローバル変数：");
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput("変数名"), "GLOBAL_VARIABLE_NAME");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['custom_variable'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("変数")
                .appendField(new Blockly.FieldVariable("名前"), "NAME");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

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
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['highprecision_wait'] = {
        init: function () {
            this.appendValueInput("WAIT_TIME")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField("ミリ秒待つ");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
}
