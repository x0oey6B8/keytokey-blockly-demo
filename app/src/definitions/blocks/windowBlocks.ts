import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";

export function defineWindowBlocks() {
    Blockly.Blocks['window_dump'] = {
        init: function () {
            this.appendValueInput("WINDOW")
                .setCheck("Window")
                .appendField("ウィンドウ：", "LABEL");
            this.appendDummyInput()
                .appendField("の内容をコンソールに出力");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        },
    } as BlockSvg;

    Blockly.Blocks['create_window_by_window_handle'] = {
        init: function () {
            this.appendValueInput("WINDOW_HANDLE")
                .setCheck("Number")
                .appendField("ウィンドウを作成する｜ウィンドウハンドル（ID）：");
            this.setOutput(true, "Window");
            this.setColour(BlockColors.Window);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['find_window_by'] = {
        init: function () {
            const menus = [
                ["タイトルに全一致する", "TITLE_EQUALS"],
                ["タイトルに部分一致する", "TITLE_PARTIAL_MATCH"],
                ["タイトルに先頭一致する", "TITLE_STARTS_WITH"],
                ["タイトルに末尾一致する", "TITLE_ENDS_WITH"],
            ] as Blockly.MenuGenerator;
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(menus), "DROPDOWN");
            this.appendDummyInput()
                .appendField("するウィンドウを探す｜");
            this.appendValueInput("TITLE")
                .appendField("タイトル：")
                .setCheck("String");
            this.setInputsInline(true);
            this.setOutput(true, "Window");
            this.setColour(BlockColors.Window);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['get_window'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["最前面のウィンドウ", "ACTIVE"], ["マウス下のウィンドウ", "UNDER_MOUSE"]]), "DROPDOWN");
            this.setOutput(true, "Window");
            this.setColour(BlockColors.Window);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['window_get_property'] = {
        init: function () {

            const menus = [
                ["座標", "POINT"],
                ["サイズ", "SIZE"],
                ["タイトル", "TITLE"],
                ["クラス名", "CLASS"],
                ["テキスト", "TEXT"],
                ["プロセス名", "PROCESS_NAME"],
                ["プロセスID", "PROCESS_ID"],
                ["ウィンドウハンドル(ID)", "WINDOW_HANDLE"],
                ["存在する？", "EXISTS"],
                ["表示されてる？", "VISIBILITY"],
                ["最前面に表示されてる？", "ALWAYS_ON_TOP"],
                ["親ウィンドウ", "PARENT"],
                ["子ウィンドウのリスト", "CHILD_WINDOWS"],
            ] as Blockly.MenuGenerator;

            this.appendValueInput("WINDOW")
                .setCheck("Window")
                .appendField("ウィンドウ：", "LABEL");
            this.appendDummyInput()
                .appendField("の", "FIELD1")
                .appendField(new Blockly.FieldDropdown(menus), "DROPDOWN");
            this.setOutput(true, null);
            this.setColour(BlockColors.Point);
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
            const field = this.getField("FIELD1");

            // ドロップダウンの値によってブロックの色と出力タイプを設定
            switch (dropdown) {
                case "EXISTS":
                case "VISIBILITY":
                case "ALWAYS_ON_TOP":
                    this.setOutput(true, "Boolean");
                    this.setColour(BlockColors.Logic);
                    field?.setValue("が");
                    break;
                case "TITLE":
                case "CLASS":
                case "TEXT":
                case "PROCESS_NAME":
                    this.setOutput(true, "String");
                    this.setColour(BlockColors.Text);
                    break;
                case "POINT":
                    this.setOutput(true, "Point");
                    this.setColour(BlockColors.Point);
                    break;
                case "SIZE":
                    this.setOutput(true, "Size");
                    this.setColour(BlockColors.Size);
                    break;
                case "CHILD_WINDOWS":
                    this.setOutput(true, "Array");
                    this.setColour(BlockColors.List);
                    break;
                case "PARENT":
                    this.setOutput(true, "Window");
                    this.setColour(BlockColors.Window);
                    break;
                default:
                    this.setOutput(true, "Number");
                    this.setColour(BlockColors.Math);
                    break;
            }
        }
    } as BlockSvg;

    Blockly.Blocks['window_set_property'] = {
        init: function () {

            const menus = [
                ["座標", "POINT"],
                ["サイズ", "SIZE"],
                ["タイトル", "TITLE"],
                ["テキスト", "TEXT"],
            ] as Blockly.MenuGenerator;

            this.appendValueInput("WINDOW")
                .setCheck("Window")
                .appendField("ウィンドウ：", "LABEL");
            this.appendDummyInput()
                .appendField("の")
                .appendField(new Blockly.FieldDropdown(menus), "DROPDOWN");
            this.appendValueInput("VALUE")
                .appendField("に");
            this.appendDummyInput()
                .appendField("を設定");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        },
        // @ts-ignore
        onchange: function (e) {
            const dropdown = this.getFieldValue("DROPDOWN");
            const valueField = this.getInput("VALUE");
            switch (dropdown) {
                case "ALWAYS_ON_TOP":
                    valueField?.setCheck("Boolean");
                    break;
                case "TITLE":
                case "TEXT":
                    valueField?.setCheck("String");
                    break;
                case "POINT":
                    valueField?.setCheck("Point");
                    break;
                case "SIZE":
                    valueField?.setCheck("Size");
                    break;
                default:
                    break;
            }
        }
    } as BlockSvg;

    Blockly.Blocks['window_set_bounds'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ウィンドウに座標とサイズを設定");
            this.appendValueInput("WINDOW")
                .setCheck("Window")
                .appendField("対象のウィンドウ：", "LABEL");
            this.appendValueInput("POINT")
                .setCheck("Point")
                .appendField("座標：");
            this.appendValueInput("SIZE")
                .setCheck("Size")
                .appendField("サイズ：");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
        },
    } as BlockSvg;
}