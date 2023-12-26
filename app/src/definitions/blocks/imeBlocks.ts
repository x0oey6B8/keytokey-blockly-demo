import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors";
import { OutputType } from "./outputType";

export function defineIMEBlocks() {

    Blockly.Blocks['get_ime_conversion_mode'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("現在のIMEの変換モード");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.IMEConversionMode);
            this.setColour(BlockColors.Enum);
            this.setTooltip("IMEの変換モードを取得します。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['set_ime_conversion_mode'] = {
        init: function () {
            this.appendValueInput("MODE")
                .appendField("IMEの変換モードを")
                .setCheck(OutputType.IMEConversionMode);
            this.appendDummyInput()
                .appendField("にする");
            this.setInputsInline(true);
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("IMEの変換モードを設定します。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

}