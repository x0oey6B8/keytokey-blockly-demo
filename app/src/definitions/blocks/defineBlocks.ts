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
import { defineTimeBlock } from "./timeBlock.ts";
import { defineMonitorBlocks } from "./monitorBlocks.ts";
import { defineIMEBlocks } from "./imeBlocks.ts";
import { defineMappingBlocks } from "./mappingBlock.ts";
import { defineVirtualXInputBlock } from "./virtualXInputBlocks.ts";
import { defineDualShock4Blocks } from "./dualShock4Blocks.ts";
import { defineEventBlocks } from "./eventBlocks.ts";
import { defineTriggerBlocks } from "./triggerBlocks.ts";
import { defineVariableBlocks } from "./variableBlocks.ts";
import { defineProfileBlocks } from "./profileBlocks.ts";

export function defineBlocks(): void {

    defineVariableBlocks();
    defineEventBlocks();
    defineLoopBlocks();
    defineProfileBlocks();
    defineInputBlocks();
    defineTriggerBlocks();
    defineWaitBlocks();
    defineLogicBlocks();
    defineJavascriptBlocks();
    defineValueBlocks();
    defineUtilityBlocks();
    defineConsoleBlocks();
    defineWindowBlocks();
    defineTemplateMatchingBlocks();
    defineControllerBlocks();
    defineMappingBlocks();
    defineVirtualXInputBlock();
    defineDualShock4Blocks();
    defineTimeBlock();
    defineMonitorBlocks();
    defineIMEBlocks();

    Blockly.Blocks['comment'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("  ")
                .appendField(new Blockly.FieldMultilineInput("メモ"), "COMMENT");
            this.setColour(BlockColors.Comment);
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.setTooltip("メモ");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['comment_statement'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("  ")
                .appendField(new Blockly.FieldTextInput("メモ"), "COMMENT");
            this.appendStatementInput("DO")
                .setCheck(null);
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Comment);
        }
    } as Block;
}
