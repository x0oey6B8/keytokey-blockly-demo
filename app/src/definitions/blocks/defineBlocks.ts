import Blockly, { Block } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";
import { defineInputBlocks } from "./inputBlocks.ts";
import { defineWaitBlocks } from "./waitBlocks.ts";
import { defineLogicBlocks } from "./logicBlocks.ts";
import { defineJavascriptBlocks } from "./javascriptBlocks.ts";
import { defineValueBlocks } from "./valueBlocks.ts";
import { defineUtilityBlocks } from "./utilityBlocks.ts";
import { defineConsoleBlocks } from "./consoleBlocks.ts";
import { defineWindowBlocks } from "./windowBlocks.ts";
import { defineLoopBlocks } from "./loopBlocks.ts";
import { defineTemplateMatchingBlocks } from "./templateMatchingBlock.ts";
import { defineControllerBlocks } from "./controllerBlocks.ts";

export function defineBlocks(): void {

    defineLoopBlocks();
    defineInputBlocks();
    defineWaitBlocks();
    defineLogicBlocks();
    defineJavascriptBlocks();
    defineValueBlocks();
    defineUtilityBlocks();
    defineConsoleBlocks();
    defineWindowBlocks();
    defineTemplateMatchingBlocks();
    defineControllerBlocks();

    Blockly.Blocks['comment'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("メモ：")
                .appendField(new Blockly.FieldMultilineInput(""), "COMMENT");
            this.setColour("#4FA65A");
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as Block;


    Blockly.Blocks['global_get_variable'] = {
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
