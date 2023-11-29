import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors";

export function defineConsoleBlocks() {

    Blockly.Blocks['console_log'] = {
        init: function () {
            this.appendValueInput("VALUE")
                .setCheck(null)
                .appendField("コンソールに");
            this.appendDummyInput()
                .appendField("を出力");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['console_clear'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("コンソールの内容をクリア");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

}