import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";

export function defineTemplateMatchingBlocks() {
    Blockly.Blocks['template_matching_match_by_id'] = {
        init: function () {
            this.appendValueInput("IDENTIFIER")
                .setCheck("String")
                .appendField("画像認識の設定");
            this.appendDummyInput()
                .appendField("を実行し");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["画像を一つ探す", "SINGLE"], ["画像を複数探す", "MULTIPLE"]]), "DROPDOWN")
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setOutput(true, "TemplateMatchingResult")
            this.setTooltip("");
            this.setHelpUrl("");
        },
    } as BlockSvg;

    Blockly.Blocks['template_matching_result_properties'] = {
        init: function () {
            const menus = [
                ["画像は見つかった？", "IS_SUCCESS"],
                ["画像は見つからなかった", "IS_NOT_SUCCESS"],
                ["最初に見つかった画像情報", "FOUND_FIRST_IMAGE"],
                ["見つかったすべての画像情報のリスト", "FOUND_ALL_IMAGES"],
                ["識別キー", "IDENTIFIER"],
            ] as Blockly.MenuGenerator;

            this.appendValueInput("RESULT")
                .setCheck("TemplateMatchingResult");
            this.appendDummyInput()
                .appendField("→", "LABEL1")
                .appendField(new Blockly.FieldDropdown(menus), "DROPDOWN");
            this.setOutput(true, null);
            this.setColour(BlockColors.Logic);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        // @ts-ignore
        onchange: function (e) {
            switch (e.type) {
                case "drag":
                case "move":
                case "selected":
                case "create":
                case "toolbox_item_select":
                    return;
            }
            const dropdown = this.getFieldValue("DROPDOWN");
            switch (dropdown) {
                case "IS_SUCCESSS":
                case "IS_NOT_SUCCESS":
                    this.setOutput(true, "Boolean");
                    this.setColour(BlockColors.Logic);
                    break;
                case "FOUND_FIRST_IMAGE":
                    this.setOutput(true, "FoundImage");
                    this.setColour(BlockColors.FoundImage);
                    break;
                case "FOUND_ALL_IMAGES":
                    this.setOutput(true, "Array");
                    this.setColour(BlockColors.List);
                    break;
                case "IDENTIFIER":
                    this.setOutput(true, "String");
                    this.setColour(BlockColors.Text);
                    break;
                case "FOUND_POINT_CENTER":
                case "FOUND_POINT_TOP_LEFT":
                case "FOUND_POINT_BOTTOM_RIGHT":
                    this.setOutput(true, "Point");
                    this.setColour(BlockColors.Point);
                    break;
            }
        }
    } as BlockSvg;


    Blockly.Blocks['template_matching_found_image_properties'] = {
        init: function () {
            const menus = [
                ["座標（中央）", "FOUND_POINT_CENTER"],
                ["座標（左上）", "FOUND_POINT_TOP_LEFT"],
                ["座標（右下）", "FOUND_POINT_BOTTOM_RIGHT"],
                ["スコア", "SCORE"],
            ] as Blockly.MenuGenerator;

            this.appendValueInput("RESULT")
                .setCheck("FoundImage");
            this.appendDummyInput()
                .appendField("→", "LABEL1")
                .appendField(new Blockly.FieldDropdown(menus), "DROPDOWN");
            this.setOutput(true, null);
            this.setColour(BlockColors.Logic);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        // @ts-ignore
        onchange: function (e) {
            switch (e.type) {
                case "drag":
                case "move":
                case "selected":
                case "create":
                case "toolbox_item_select":
                    return;
            }
            const dropdown = this.getFieldValue("DROPDOWN");
            switch (dropdown) {
                case "SCORE":
                    this.setOutput(true, "Number");
                    this.setColour(BlockColors.Math);
                    break;
                case "FOUND_POINT_CENTER":
                case "FOUND_POINT_TOP_LEFT":
                case "FOUND_POINT_BOTTOM_RIGHT":
                    this.setOutput(true, "Point");
                    this.setColour(BlockColors.Point);
                    break;
            }
        }
    } as BlockSvg;
}