import Blockly from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";
import { OutputType } from "./outputType.ts";

export function defineTriggerBlocks(): void {
    Blockly.Blocks["trigger_is_pressed"] = {
        init: function () {
            this.appendDummyInput().appendField("トリガーが")
                .appendField(new Blockly.FieldDropdown([["押されてる", "PRESSED"], ["離されてる", "RELEASED"]]), "DROPDOWN");
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("トリガーの入力状態を取得します。");
            this.setHelpUrl("");
        },
    };

    Blockly.Blocks["trigger_is_keyboard"] = {
        init: function () {
            this.appendDummyInput().appendField("トリガーがキー")
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("トリガーがキーボードのキーかどうかを取得します。");
            this.setHelpUrl("");
        },
    };

    Blockly.Blocks["trigger_is_mouse"] = {
        init: function () {
            this.appendDummyInput().appendField("トリガーがマウス")
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("トリガーがマウスかどうかを取得します。");
            this.setHelpUrl("");
        },
    };

    Blockly.Blocks["trigger_is_keyboard_or_mouse"] = {
        init: function () {
            this.appendDummyInput().appendField("トリガーがキーもしくはマウス")
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("トリガーがキーボードかマウスかどうかを取得します。");
            this.setHelpUrl("");
        },
    };

    Blockly.Blocks["trigger_is_controller"] = {
        init: function () {
            this.appendDummyInput().appendField("トリガーがコントローラー")
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("トリガーがキーボードのキーかどうかを取得します。");
            this.setHelpUrl("");
        },
    };

    Blockly.Blocks["trigger_as_key"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("トリガーをキー／マウスの値として取得");
            this.setOutput(true, OutputType.Keys);
            this.setColour(BlockColors.Enum);
            this.setTooltip("トリガーをキー／マウスの値として取得します。");
            this.setHelpUrl("");
        },
    };

    Blockly.Blocks["trigger_as_controller"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("トリガーをコントローラーの値として取得");
            this.setOutput(true, OutputType.Keys);
            this.setColour(BlockColors.Enum);
            this.setTooltip("トリガーをキー／マウスの値として取得します。");
            this.setHelpUrl("");
        },
    };
}