import Blockly, { Block, BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";

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
        },
    } as Block;

    Blockly.Blocks['key_is_pressed'] = {
        init: function () {
            this.appendValueInput("KEY")
                .setCheck("Keys");
            this.appendDummyInput()
                .appendField("が押されて")
                .appendField(new Blockly.FieldDropdown([["いる", "PRESSED"], ["いない", "RELEASED"]]), "DROPDOWN")
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['phisical_key_is_pressed'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("物理デバイスの");
            this.appendValueInput("KEY")
                .setCheck("Keys");
            this.appendDummyInput()
                .appendField("が押されて")
                .appendField(new Blockly.FieldDropdown([["いる", "PRESSED"], ["いない", "RELEASED"]]), "DROPDOWN")
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['keys_are_pressed'] = {
        init: function () {
            this.appendValueInput("KEY_ARRAY")
                .setCheck("Array")
                .appendField("キーのリスト");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["のうちどれかが押されている", "SOME_PRESSED"],
                    ["がすべて押されている", "ALL_PRESSED"],
                    ["がすべて離されている", "ALL_RELEASED"],
                ]), "DROPDOWN");
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };



    Blockly.Blocks["trigger_is_pressed"] = {
        init: function () {
            this.appendDummyInput().appendField("トリガーが押されて")
                .appendField(new Blockly.FieldDropdown([["いる", "PRESSED"], ["いない", "RELEASED"]]), "DROPDOWN")
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
                .appendField("ミリ秒待つ、離して")
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
            this.customContextMenu = (options) => {
                options.push({
                    text: "aaaaa",
                    enabled: true,
                    weight: 0,
                    callback: (_) => {
                        console.log(this.id);
                    }
                })
            };
        }

    } as BlockSvg;

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

    Blockly.Blocks['random_point'] = {
        init: function () {
            this.appendValueInput("X_FROM")
                .setCheck("Number")
                .appendField("ランダムな座標：X（");
            this.appendValueInput("X_TO")
                .setCheck("Number")
                .appendField("～");
            this.appendDummyInput()
                .appendField("）");
            this.appendValueInput("Y_FROM")
                .setCheck("Number")
                .appendField("Y（");
            this.appendValueInput("Y_TO")
                .setCheck("Number")
                .appendField("～");
            this.appendDummyInput()
                .appendField("）");
            this.setInputsInline(true);
            this.setOutput(true, "Point");
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['mouse_set_random_offset_range'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウス：（");
            this.appendValueInput("X")
                .setCheck("Number")
                .appendField("X：");
            this.appendValueInput("Y")
                .setCheck("Number")
                .appendField("Y：");
            this.appendDummyInput()
                .appendField("）の範囲で移動先にランダム性を加える");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['mouse_get_point'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスカーソルの座標");
            this.setInputsInline(true);
            this.setOutput(true, "Point");
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['mouse_set_origin_point'] = {
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

    const speedArray: Blockly.MenuOption[] = [
        ["一瞬", "WARP"],
        ["とても速い速度", "FASTEST"],
        ["速い速度", "FAST"],
        ["普通速度", "NORMAL"],
        ["遅い速度", "SLOW"],
        ["とても遅い速度", "SLOWEST"]
    ];

    Blockly.Blocks['mouse_move'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスを")
                .appendField(new Blockly.FieldDropdown(speedArray), "SPEED")
                .appendField("で");
            this.appendValueInput("POINT")
                .setCheck("Point");
            this.appendDummyInput()
                .appendField("に移動");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['mouse_move_relative'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスを")
                .appendField(new Blockly.FieldDropdown(speedArray), "SPEED")
                .appendField("で", "TEXT1");
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
    } as Block;
}