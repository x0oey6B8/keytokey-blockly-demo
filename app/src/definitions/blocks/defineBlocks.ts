import Blockly, { Block } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";
import { defineInputBlocks } from "./input/defineInputBlocks.ts";
import { defineWaitBlocks } from "./wait/defineWaitBlocks.ts";
import { defineLogicBlocks } from "./logic/defineLogicBlocks.ts";
import { defineJavascriptBlocks } from "./javascript/defineJavascriptBlocks.ts";
import { defineValueBlocks } from "./value/defineValueBlocks.ts";

export function defineBlocks(): void {

    defineInputBlocks();
    defineWaitBlocks();
    defineLogicBlocks();
    defineJavascriptBlocks();
    defineValueBlocks();

    Blockly.Blocks['comment'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("メモ：")
                .appendField(new Blockly.FieldMultilineInput("めもめも"), "COMMENT");
            this.setColour("#4FA65A");
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['get_global_variable'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("グローバル変数：");
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput("変数名"), "GLOBAL_VARIABLE_NAME");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
}
