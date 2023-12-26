import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors";
import { OutputType } from "./outputType";
import { DropDownMenuFactory } from "./dropdownMenuFactory";

export function defineTimeBlock() {
    Blockly.Blocks['performance_now'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("現在の経過時間");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Number);
            this.setColour(BlockColors.Math);
            this.setTooltip("経過時間とはマクロが実行されてからの経過時間（ミリ秒）のことです。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['date_time_now'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("現在時刻");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Date);
            this.setColour(BlockColors.Date);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['date_time_to_string'] = {
        init: function () {
            this.appendValueInput("DATE")
                .appendField("時刻：")
                .setCheck(OutputType.Date);
            this.appendDummyInput()
                .appendField("をテキストに変換");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.String);
            this.setColour(BlockColors.Text);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['date_time_property'] = {
        init: function () {
            const menu = DropDownMenuFactory.Default.create(this, "DROPDOWN", [
                {
                    displayText: "年",
                    key: "YEAR",
                    outputType: OutputType.Number,
                    tooltip: "現在の年を数値で取得します。",
                },
                {
                    displayText: "月",
                    key: "MONTH",
                    outputType: OutputType.Number,
                    tooltip: "現在の月を数値で取得します。"
                },
                {
                    displayText: "日",
                    key: "DAY",
                    outputType: OutputType.Number,
                    tooltip: "現在の日付を数値で取得します。"
                },
                {
                    displayText: "時",
                    key: "HOUR",
                    outputType: OutputType.Number,
                    tooltip: "現在時刻の時（0～23）を取得します。"
                },
                {
                    displayText: "分",
                    key: "MINUTE",
                    outputType: OutputType.Number,
                    tooltip: "現在時刻の分（0～59）を取得します。"
                },
                {
                    displayText: "秒",
                    key: "SECOND",
                    outputType: OutputType.Number,
                    tooltip: "現在時刻の秒（0～59）を取得します。"
                },
                {
                    displayText: "曜日",
                    key: "DAY_OF_WEEK",
                    outputType: OutputType.String,
                    tooltip: "曜日を英語で取得します。"
                },
            ]);
            this.onchange = menu.changeDisplay;
            this.appendValueInput("DATE")
                .setCheck(OutputType.Date);
            this.appendDummyInput()
                .appendField("→")
                // @ts-ignore
                .appendField(menu.fieldDropdown, menu.fieldKey);
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Number);
            this.setColour(BlockColors.Math);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;
}