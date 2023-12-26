import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";
import { OutputType } from "./outputType.ts";
import { DropDownMenuFactory } from "./dropdownMenuFactory.ts";

export function defineWindowBlocks() {
    Blockly.Blocks['window_dump'] = {
        init: function () {
            this.appendValueInput("WINDOW")
                .setCheck(OutputType.Window)
                .appendField("ウィンドウ：", "LABEL");
            this.appendDummyInput()
                .appendField("の内容をコンソールに出力");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("ウィンドウが持つ情報をコンソールに出力します。");
            this.setHelpUrl("");
        },
    } as BlockSvg;

    Blockly.Blocks['create_window_by_window_handle'] = {
        init: function () {
            this.appendValueInput("WINDOW_HANDLE")
                .setCheck(OutputType.Number)
                .appendField("ウィンドウを作成する｜ウィンドウハンドル（ID）：");
            this.setOutput(true, OutputType.Window);
            this.setColour(BlockColors.Window);
            this.setTooltip("ウィンドウのIDを使ってウィンドウを操作するためのブロックを作成します。");
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
                .appendField("ウィンドウを探す｜");
            this.appendValueInput("TITLE")
                .appendField("タイトル：")
                .setCheck("String");
            this.appendDummyInput()
                .appendField("条件：")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(menus), "DROPDOWN");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Window);
            this.setColour(BlockColors.Window);
            this.setTooltip("指定したタイトルと条件をもとにウィンドウを探します。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['get_window'] = {
        init: function () {
            this.appendDummyInput()
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown([["最前面のウィンドウ", "ACTIVE"], ["マウス下のウィンドウ", "UNDER_MOUSE"]]), "DROPDOWN");
            this.setOutput(true, OutputType.Window);
            this.setColour(BlockColors.Window);
            this.setTooltip("指定した条件下のウィンドウを取得します。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['window_get_property'] = {
        init: function () {
            const menu = DropDownMenuFactory.Default.create(this, "DROPDOWN", [
                { displayText: "座標", key: "POINT", outputType: OutputType.Point, tooltip: "" },
                { displayText: "サイズ", key: "SIZE", outputType: OutputType.Size, tooltip: "" },
                { displayText: "タイトル", key: "TITLE", outputType: OutputType.String, tooltip: "" },
                { displayText: "クラス名", key: "CLASS", outputType: OutputType.String, tooltip: "" },
                { displayText: "テキスト", key: "TEXT", outputType: OutputType.String, tooltip: "" },
                { displayText: "プロセス名", key: "PROCESS_NAME", outputType: OutputType.String, tooltip: "" },
                { displayText: "プロセスID", key: "PROCESS_ID", outputType: OutputType.Number, tooltip: "" },
                { displayText: "ウィンドウハンドル(ID)", key: "WINDOW_HANDLE", outputType: OutputType.Number, tooltip: "" },
                { displayText: "親ウィンドウ", key: "PARENT", outputType: OutputType.Window, tooltip: "" },
                { displayText: "子ウィンドウのリスト", key: "CHILD_WINDOWS", outputType: OutputType.Array, tooltip: "" },
                { displayText: "存在する", key: "EXISTS", outputType: OutputType.Boolean, tooltip: "" },
                { displayText: "表示されてる", key: "VISIBILITY", outputType: OutputType.Boolean, tooltip: "" },
                { displayText: "最大化されてる", key: "SHOW_MAXIMIZED", outputType: OutputType.Boolean, tooltip: "" },
                { displayText: "最小化されてる", key: "SHOW_MINIMIZED", outputType: OutputType.Boolean, tooltip: "" },
                { displayText: "最大化／最小化されてない", key: "SHOW_NORMAL", outputType: OutputType.Boolean, tooltip: "" },
                { displayText: "最前面表示に設定されてる", key: "ALWAYS_ON_TOP", outputType: OutputType.Boolean, tooltip: "" },
            ])
            this.appendValueInput("WINDOW")
                .setCheck(OutputType.Window)
                .appendField("ウィンドウ：", "LABEL");
            this.appendDummyInput()
                .appendField("の", "FIELD1")
                // @ts-ignore
                .appendField(menu.fieldDropdown, menu.fieldKey);
            this.setOutput(true, null);
            this.setColour(BlockColors.Point);
            this.setTooltip("ウィンドウが持つ情報を取得します。");
            this.setHelpUrl("");

            this.onchange = (e) => {
                menu.changeDisplay(e);

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
                    case "SHOW_MAXIMIZED":
                    case "SHOW_MINIMIZED":
                    case "SHOW_NORMAL":
                        this.setOutput(true, OutputType.Boolean);
                        this.setColour(BlockColors.Logic);
                        field?.setValue("が");
                        break;
                }
            }
        },
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
                .setCheck(OutputType.Window)
                .appendField("ウィンドウ：", "LABEL");
            this.appendDummyInput()
                .appendField("の")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(menus), "DROPDOWN");
            this.appendValueInput("VALUE")
                .appendField("に");
            this.appendDummyInput()
                .appendField("を設定");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("ウィンドウに値を設定します。");
            this.setHelpUrl("");
        },
        // @ts-ignore
        onchange: function (e) {
            const dropdown = this.getFieldValue("DROPDOWN");
            const valueField = this.getInput("VALUE");
            switch (dropdown) {
                case "ALWAYS_ON_TOP":
                    valueField?.setCheck(OutputType.Boolean);
                    break;
                case "TITLE":
                case "TEXT":
                    valueField?.setCheck(OutputType.String);
                    break;
                case "POINT":
                    valueField?.setCheck(OutputType.Point);
                    break;
                case "SIZE":
                    valueField?.setCheck(OutputType.Size);
                    break;
                default:
                    break;
            }
        }
    } as BlockSvg;

    Blockly.Blocks['window_set_point'] = {
        init: function () {
            this.appendValueInput("WINDOW")
                .setCheck(OutputType.Window)
                .appendField("ウィンドウ：");
            this.appendDummyInput()
                .appendField("の座標に");
            this.appendValueInput("VALUE")
                .setCheck(OutputType.Point);
            this.appendDummyInput()
                .appendField("をセット");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("ウィンドウに値をセットします。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['window_set_size'] = {
        init: function () {
            this.appendValueInput("WINDOW")
                .setCheck(OutputType.Window)
                .appendField("ウィンドウ：");
            this.appendDummyInput()
                .appendField("のサイズに");
            this.appendValueInput("VALUE")
                .setCheck(OutputType.Size);
            this.appendDummyInput()
                .appendField("をセット");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("ウィンドウに値をセットします。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['window_set_title'] = {
        init: function () {
            this.appendValueInput("WINDOW")
                .setCheck(OutputType.Window)
                .appendField("ウィンドウ：");
            this.appendDummyInput()
                .appendField("のタイトルに");
            this.appendValueInput("VALUE")
                .setCheck(OutputType.String);
            this.appendDummyInput()
                .appendField("をセット");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("ウィンドウに値をセットします。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['window_set_text'] = {
        init: function () {
            this.appendValueInput("WINDOW")
                .setCheck(OutputType.Window)
                .appendField("ウィンドウ：");
            this.appendDummyInput()
                .appendField("のテキストに");
            this.appendValueInput("VALUE")
                .setCheck(OutputType.String);
            this.appendDummyInput()
                .appendField("をセット");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("ウィンドウに値をセットします。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['window_set_bounds'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ウィンドウに座標とサイズをセット");
            this.appendValueInput("WINDOW")
                .setCheck(OutputType.Window)
                .appendField("対象のウィンドウ：", "LABEL");
            this.appendValueInput("POINT")
                .setCheck(OutputType.Point)
                .appendField("座標：");
            this.appendValueInput("SIZE")
                .setCheck(OutputType.Size)
                .appendField("サイズ：");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("指定したウィンドウに新しい座標とサイズをセットします。");
            this.setHelpUrl("");
        },
    } as BlockSvg;

    Blockly.Blocks['window_close'] = {
        init: function () {
            this.appendValueInput("WINDOW")
                .setCheck(OutputType.Window)
                .appendField("ウィンドウ：", "LABEL");
            this.appendDummyInput()
                .appendField("を閉じる");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("指定したウィンドウを閉じます。");
            this.setHelpUrl("");
        },
    } as BlockSvg;

    Blockly.Blocks['window_set_state'] = {
        init: function () {
            this.appendValueInput("WINDOW")
                .setCheck(OutputType.Window)
                .appendField("ウィンドウ：", "LABEL");
            this.appendDummyInput()
                .appendField("を")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown([["最大化", "MAXIMIZED"], ["最小化", "MINIMIZED"]]), "STATE");
            this.appendDummyInput()
                .appendField("する");
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("指定したウィンドウの表示状態を設定します。");
            this.setHelpUrl("");
        },
    } as BlockSvg;

    Blockly.Blocks['window_restore'] = {
        init: function () {
            this.appendValueInput("WINDOW")
                .setCheck(OutputType.Window)
                .appendField("ウィンドウ：", "LABEL");
            this.appendDummyInput()
                .appendField("の表示を元に戻す")
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("最小化もしくは最大化されたウィンドウの表示を元に戻します。");
            this.setHelpUrl("");
        },
    } as BlockSvg;
}