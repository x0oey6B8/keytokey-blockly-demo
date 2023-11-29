import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";

export function defineLoopBlocks() {
    Blockly.Blocks['for_of'] = {
        init: function () {
            this.appendValueInput("LIST")
                .setCheck("Array")
                .appendField("リスト：");
            this.appendDummyInput()
                .appendField("の各要素");
            this.appendDummyInput("VARIABLE")
                .appendField(new Blockly.FieldVariable("リストの各項目"), "VARIABLE");
            this.appendDummyInput()
                .appendField("を取り出す");
            this.appendStatementInput("STATEMENT")
                .setCheck(null);
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Loop);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;
}