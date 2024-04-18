import Blockly, { BlockSvg, Field } from "blockly";
import { BlockColors } from "../../configurations/blockColors";
import { OutputType } from "./outputType";

export function defineProfileBlocks() {
    Blockly.Blocks['profile_is_enabled'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("プロファイルが")
                .appendField(new Blockly.FieldDropdown([["有効", "ENABLED"], ["無効", "DISABLED"]]) as Field<string>, "VALUE");
            this.setInputsInline(true);
            this.setColour(BlockColors.Logic);
            this.setOutput(true, OutputType.Boolean);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['profile_can_work_on_active_window'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("プロファイルがアクティブウィンドウで")
                .appendField(new Blockly.FieldDropdown([["有効", "CAN"], ["無効", "CANNOT"]]) as Field<string>, "VALUE");
            this.setInputsInline(true);
            this.setColour(BlockColors.Logic);
            this.setOutput(true, OutputType.Boolean);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['profile_can_work'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("プロファイルが実行")
                .appendField(new Blockly.FieldDropdown([["可能", "CAN"], ["不可能", "CANNOT"]]) as Field<string>, "VALUE")
                .appendField("な状態")
            this.setInputsInline(true);
            this.setColour(BlockColors.Logic);
            this.setOutput(true, OutputType.Boolean);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['profile_get_name'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("プロファイル名");
            this.setInputsInline(true);
            this.setColour(BlockColors.Text);
            this.setOutput(true, OutputType.String);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['change_profile'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("プロファイルを");
            this.appendValueInput("NAME")
                .setCheck(OutputType.String);
            this.appendDummyInput()
                .appendField("に変更");
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;
}