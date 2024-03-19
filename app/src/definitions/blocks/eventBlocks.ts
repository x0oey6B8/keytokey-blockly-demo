import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors";

export function defineEventBlocks() {
    Blockly.Blocks['event_macro_ended'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント：マクロ終了時");
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['event_trigger_pressed'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント:トリガーが押されたら")
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['event_trigger_released'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント：トリガーが離されたら")
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['event_key_pressed'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント：物理キーが押されたら｜変数：")
                .appendField(new Blockly.FieldVariable("押されたキー"), "KEY")
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['event_key_released'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント：物理キーが離されたら｜変数：")
                .appendField(new Blockly.FieldVariable("離されたキー"), "KEY")
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;
}