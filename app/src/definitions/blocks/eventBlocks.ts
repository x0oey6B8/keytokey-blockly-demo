import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors";

export function defineEventBlocks() {
    Blockly.Blocks['event_macro_ended'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント:マクロ終了時");
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;
}