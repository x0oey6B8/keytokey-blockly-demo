import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors";
import { OutputType } from "./outputType";
import { DropDownMenuFactory } from "./dropdownMenuFactory";

export function defineMonitorBlocks() {

    Blockly.Blocks['monitor'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("メインモニター");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Monitor);
            this.setColour(BlockColors.Monitor);
            this.setTooltip("現在設定されてるコントローラー");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['monitor_list'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("すべてのモニター");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Array);
            this.setColour(BlockColors.List);
            this.setTooltip("現在設定されてるコントローラー");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['monitor_property'] = {
        init: function () {
            const menu = DropDownMenuFactory.Default.create(this, "DROPDOWN", [
                {
                    displayText: "デバイス名",
                    key: "NAME",
                    outputType: OutputType.String,
                    tooltip: "モニターのデバイス名を取得します。"
                },
                {
                    displayText: "座標",
                    key: "POINT",
                    outputType: OutputType.Point,
                    tooltip: "モニターの座標を取得します。"
                },
                {
                    displayText: "サイズ",
                    key: "SIZE",
                    outputType: OutputType.Size,
                    tooltip: "モニターのサイズ"
                },
                {
                    displayText: "メインモニター？",
                    key: "IS_MAIN_MONITOR",
                    outputType: OutputType.Boolean,
                    tooltip: "メインモニターかどうかを取得します。メインモニターの場合trueを返し、そうじゃない場合はfalseを返します。"
                }
            ]);
            this.onchange = menu.changeDisplay;
            this.appendValueInput("MONITOR")
                .setCheck(OutputType.Monitor);
            this.appendDummyInput()
                .appendField("→");
            this.appendDummyInput()
                // @ts-ignore
                .appendField(menu.fieldDropdown, menu.fieldKey);
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Array);
            this.setColour(BlockColors.Text);
            this.setTooltip("モニターの情報");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['monitor_dump'] = {
        init: function () {
            this.appendValueInput("MONITOR")
                .appendField("モニター：")
                .setCheck(OutputType.Monitor);
            this.appendDummyInput()
                .appendField("の情報をコンソールに出力");
            this.setInputsInline(true);
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("モニターの情報をコンソールに出力します。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

}