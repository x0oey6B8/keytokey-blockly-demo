import Blockly, { BlockSvg, MenuGenerator } from "blockly";
import { BlockColors } from "../../configurations/blockColors";
import { OutputType } from "./outputType";
import { DropDownMenuFactory } from "./dropdownMenuFactory";

export function defineControllerBlocks() {

    Blockly.Blocks['controller'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("コントローラー");
            this.setInputsInline(true);
            this.setOutput(true, "Controller");
            this.setColour(BlockColors.Controller);
            this.setTooltip("現在設定されてるコントローラー");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['xinput_controller'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("XInputコントローラー")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "INDEX");
            this.setInputsInline(true);
            this.setOutput(true, "Controller");
            this.setColour(BlockColors.Controller);
            this.setTooltip("XInputコントローラー");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['controller_proeprty'] = {
        init: function () {
            const menu = DropDownMenuFactory.Default.create(this, "DROPDOWN", [
                {
                    displayText: "接続されてる？",
                    key: "IS_CONNECTED",
                    outputType: OutputType.Boolean,
                    tooltip: "コントローラーが接続されてる場合はtrue、されてない場合はfalseを返します。"
                },
                {
                    displayText: "DirectInput？",
                    key: "IS_DIRECTINPUT",
                    outputType: OutputType.Boolean,
                    tooltip: "コントローラーがDierctInputの場合はtrue、そうじゃない場合はfalseを返します。"
                },
                {
                    displayText: "XInput",
                    key: "IS_XINPUT",
                    outputType: OutputType.Boolean,
                    tooltip: "コントローラーがXInputの場合はtrue、そうじゃない場合はfalseを返します。"
                },
                {
                    displayText: "十字キーの入力方向",
                    key: "DPAD_DIRECTION",
                    outputType: OutputType.Direction,
                    tooltip: "十字キーの入力方向を返します。"
                },
                // {
                //     displayText: "コントローラーの名前",
                //     key: "NAME",
                //     outputType: OutputType.String,
                //     tooltip: "コントローラーの名前を返します。"
                // }
            ])

            this.onchange = menu.changeDisplay;
            this.appendValueInput("CONTROLLER")
                .setCheck("Controller");
            this.appendDummyInput()
                .appendField("→");
            this.appendDummyInput()
                // @ts-ignore
                .appendField(menu.fieldDropdown, menu.fieldKey);
            this.setInputsInline(true);
            this.setColour(BlockColors.Logic);
            this.setOutput(true, "Boolean");
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['is_controller_pressed'] = {
        init: function () {
            this.appendValueInput("CONTROLLER")
                .setCheck("Controller");
            this.appendDummyInput()
                .appendField("→");
            this.appendValueInput("BUTTON")
                .setCheck("ControllerButtons");
            this.appendDummyInput()
                .appendField("が")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown([["押されてる", "PRESSED"], ["押されてない", "RELEASED"]]), "DROPDOWN");
            this.setInputsInline(true);
            this.setColour(BlockColors.Logic);
            this.setOutput(true, "Boolean");
            this.setTooltip("指定したコントローラーの入力状態を取得します。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['controller_stick_property'] = {
        init: function () {
            const sticks: MenuGenerator = [
                ["左スティック", "LEFT"],
                ["右スティック", "RIGHT"],
            ];
            const propertyMenu = DropDownMenuFactory.Default.create(this, "PROPERTY", [
                {
                    displayText: "横方向の値",
                    key: "HORIZONTAL_VALUE",
                    outputType: OutputType.Number,
                    tooltip: "横の入力（[左]-1.0 ～ [無]0.0 ～ [右]1.0）"
                },
                {
                    displayText: "縦方向の値",
                    key: "VERTICAL_VALUE",
                    outputType: OutputType.Number,
                    tooltip: "縦の入力（[左]-1.0 ～ [無]0.0 ～ [右]1.0）"
                },
                {
                    displayText: "角度",
                    key: "ANGLE",
                    outputType: OutputType.Number,
                    tooltip: "上を0.0として、時計回りに0.0～359.9"
                },
                {
                    displayText: "入力率",
                    key: "INPUT_RATE",
                    outputType: OutputType.Number,
                    tooltip: "入力率 0.0～1.0"
                },
                {
                    displayText: "入力方向",
                    key: "DIRECTION",
                    outputType: OutputType.Direction,
                    tooltip: "現在入力している方向（上下左右+斜め）を取得します。"
                },
                {
                    displayText: "デッドゾーン",
                    key: "DEADZONE",
                    outputType: OutputType.Number,
                    tooltip: "デッドゾーンの値 0.0～1.0"
                },
                {
                    displayText: "デッドゾーンを超えている？",
                    key: "OVER_DEADZONE",
                    outputType: OutputType.Boolean,
                    tooltip: "デッドゾーンを超えている場合はtrue、超えてない場合はfalse"
                }
            ]);

            this.onchange = propertyMenu.changeDisplay;
            this.appendValueInput("CONTROLLER")
                .setCheck("Controller");
            this.appendDummyInput()
                .appendField("→")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(sticks), "STICK");
            this.appendDummyInput()
                .appendField("の")
                // @ts-ignore
                .appendField(propertyMenu.fieldDropdown, propertyMenu.fieldKey);
            this.setInputsInline(true);
            this.setColour(BlockColors.Logic);
            this.setOutput(true, "Boolean");
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['controller_trigger_property'] = {
        init: function () {
            const sticks: MenuGenerator = [
                ["左トリガー", "LEFT"],
                ["右トリガー", "RIGHT"],
            ];

            const propertyMenu = DropDownMenuFactory.Default.create(this, "PROPERTY", [
                {
                    displayText: "入力率",
                    key: "INPUT_RATE",
                    outputType: OutputType.Number,
                    tooltip: "入力率 0.0～1.0"
                },
                {
                    displayText: "デッドゾーン",
                    key: "DEADZONE",
                    outputType: OutputType.Number,
                    tooltip: "デッドゾーンの値 0.0～1.0"
                },
                {
                    displayText: "デッドゾーンを超えている？",
                    key: "OVER_DEADZONE",
                    outputType: OutputType.Boolean,
                    tooltip: "デッドゾーンを超えている場合はtrue、超えてない場合はfalse"
                }
            ]);

            this.onchange = propertyMenu.changeDisplay;
            this.appendValueInput("CONTROLLER")
                .setCheck("Controller");
            this.appendDummyInput()
                .appendField("→")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(sticks), "TRIGGER");
            this.appendDummyInput()
                .appendField("の")
                // @ts-ignore
                .appendField(propertyMenu.fieldDropdown, propertyMenu.fieldKey);
            this.setInputsInline(true);
            this.setColour(BlockColors.Logic);
            this.setOutput(true, "Boolean");
            this.setTooltip("指定したコントローラーのトリガーの入力情報を取得します。");
            this.setHelpUrl("");
        }
    } as BlockSvg;
}