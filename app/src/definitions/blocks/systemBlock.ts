import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors";

export function defineSystemBlocks() {

    Blockly.Blocks['interrupt'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ブロックマクロを強制終了します");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

}