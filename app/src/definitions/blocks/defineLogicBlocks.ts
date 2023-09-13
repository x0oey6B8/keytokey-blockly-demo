import Blockly, { Block } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";

export function defineLogicBlocks() {
    Blockly.Blocks["logic_expression"] = {
        init: function () {

            // operatorフィールドの値が変更されたときにフィールドを更新
            const updateOperatorFields = function (block: Block, operatorValue: string) {
                if (operatorValue === "EQUAL" || operatorValue === "NOT_EQUAL") {
                    block.setFieldValue("が", "CONNECTOR2");
                    block.setFieldValue("と", "CONNECTOR1");
                    block.setFieldValue("場合", "CASE");
                } else {
                    block.setFieldValue("", "CONNECTOR2");
                    block.setFieldValue("が", "CONNECTOR1");
                    block.setFieldValue("の場合", "CASE");
                }

                if (operatorValue === "GRATER_THAN" || operatorValue === "LESS_THAN") {
                    block.setFieldValue("場合", "CASE");
                }
            };
            const menuGenerator = function (): Blockly.MenuOption[] {
                return [
                    ["以上", "GRATER_THAN_OR_EQUAL_TO"],
                    ["以下", "LESS_THAN_OR_EQUAL_TO"],
                    ["より大きい", "GRATER_THAN"],
                    ["より小さい", "LESS_THAN"],
                    ["等しい", "EQUAL"],
                    ["等しくない", "NOT_EQUAL"],
                ];
            };

            const validator = (option: string) => {
                updateOperatorFields(this, option);
            };
            const dropDown = new Blockly.FieldDropdown(menuGenerator, validator as Blockly.FieldDropdownValidator);

            this.appendValueInput("LEFT_VALUE").setCheck(null);
            this.appendDummyInput().appendField("が", "CONNECTOR1");
            this.appendValueInput("RIGHT_VALUE").setCheck(null);
            this.appendDummyInput("CONNECTOR_INPUT").appendField("", "CONNECTOR2");
            this.appendDummyInput("OPERATOR_INPUT").appendField(dropDown, "operator");
            this.appendDummyInput().appendField("場合", "CASE");
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("");
            this.setHelpUrl("");
            //this.updateOperatorFields("EQUAL"); // 初期化時にフィールドを更新
        },
        // onchange: e => {

        // }
    } as Block;
}