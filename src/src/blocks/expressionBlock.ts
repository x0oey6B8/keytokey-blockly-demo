import * as Blockly from "blockly/core";

export function defineExpressionBlock(): void {
    Blockly.Blocks["logic_expression"] = {
        init: function () {
            const validator = (option: string) => {
                this.updateOperatorFields(option);
            };
            const dropDown = new Blockly.FieldDropdown(this.menuGenerator, validator as Blockly.FieldDropdownValidator);

            this.appendValueInput("LEFT_VALUE").setCheck(null);
            this.appendDummyInput().appendField("が", "CONNECTOR1");
            this.appendValueInput("RIGHT_VALUE").setCheck(null);
            this.appendDummyInput("CONNECTOR_INPUT").appendField("", "CONNECTOR2");
            this.appendDummyInput("OPERATOR_INPUT").appendField(dropDown, "operator");
            this.appendDummyInput().appendField("場合", "CASE");
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour("#01579b");
            this.setTooltip("");
            this.setHelpUrl("");
            //this.updateOperatorFields("EQUAL"); // 初期化時にフィールドを更新
        },

        // operatorフィールドの値が変更されたときにフィールドを更新
        updateOperatorFields: function (operatorValue: string) {
            if (operatorValue === "EQUAL" || operatorValue === "NOT_EQUAL") {
                this.setFieldValue("が", "CONNECTOR2");
                this.setFieldValue("と", "CONNECTOR1");
                this.setFieldValue("場合", "CASE");
            } else {
                this.setFieldValue("", "CONNECTOR2");
                this.setFieldValue("が", "CONNECTOR1");
                this.setFieldValue("の場合", "CASE");
            }
        },
        menuGenerator: function (): Blockly.MenuOption[] {
            return [
                ["以上", "GRATER_THAN_OR_EQUAL_TO"],
                ["以下", "LESS_THAN_OR_EQUAL_TO"],
                ["より大きい", "GRATER_THAN"],
                ["より小さい", "LESS_THAN"],
                ["等しい", "EQUAL"],
                ["等しくない", "NOT_EQUAL"],
            ];
        },
    };
}
