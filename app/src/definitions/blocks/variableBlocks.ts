import Blockly from "blockly";
import { BlockColors } from "../../configurations/blockColors";
import { OutputType } from "./outputType";

export function defineVariableBlocks() {
    Blockly.Blocks['set_value_to_variable'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["グローバル変数", "GLOBAL"], ["ローカル変数", "LOCAL"]]), "TYPE");
            this.appendValueInput("NAME")
                .appendField("名前：")
                .setCheck(OutputType.String);
            this.appendDummyInput()
                .appendField("に");
            this.appendValueInput("VALUE")
                .appendField("値：");
            this.appendDummyInput()
                .appendField("をセット");
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(BlockColors.Variable);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }

    Blockly.Blocks['get_value_from_variable'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["グローバル変数", "GLOBAL"], ["ローカル変数", "LOCAL"]]), "TYPE");
            this.appendValueInput("NAME")
                .appendField("名前：")
                .setCheck(OutputType.String);
            this.appendDummyInput()
                .appendField("の値");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Any);
            this.setColour(BlockColors.Variable);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }

    Blockly.Blocks['variable_exists'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["グローバル変数", "GLOBAL"], ["ローカル変数", "LOCAL"]]), "TYPE");
            this.appendValueInput("NAME")
                .appendField("名前：")
                .setCheck(OutputType.String);
            this.appendDummyInput()
                .appendField("は存在する？");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Boolean);
            this.setColour(BlockColors.Logic);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }

    Blockly.Blocks['clear_local_variables'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ローカル変数をクリア");
            this.setInputsInline(true);
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
}