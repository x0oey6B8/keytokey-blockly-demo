import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";
import { OutputType } from "./outputType.ts";

export function defineMappingBlocks() {

    Blockly.Blocks['mapping_suspend_resume'] = {
        init: function () {

            const behaviors = [
                ["一時停止する", "SUSPEND"],
                ["再開する", "RESUME"]
            ] as Blockly.MenuGenerator;

            const devices = [
                ["XInput0", "XINPUT0"],
                ["XInput1", "XINPUT1"],
                ["XInput2", "XINPUT2"],
                ["XInput3", "XINPUT3"],
                ["DualShock4", "DUALSHOCK4"],
                ["vJoy", "VJOY"]
            ] as Blockly.MenuGenerator;

            this.appendDummyInput()
                .appendField("仮想コントローラー", "LABEL1")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(devices), "TARGET_DEVICE")
                .appendField("に対するマッピングを", "LABEL1")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(behaviors), "BEHAVIOR")
            this.appendValueInput("INPUT_LIST")
                .appendField("一時停止する入力のリスト：", "LABEL3")
                .setCheck(OutputType.Array);
            this.setInputsInline(false);
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("指定したコントローラーの入力に対するマッピングを停止します。");
            this.setHelpUrl("");

        },
        // @ts-ignore
        onchange: function (e: Blockly.Events.Abstract) {
            const dropdown = this.getFieldValue("BEHAVIOR");
            const field = this.getField("LABEL3");
            if (dropdown === "SUSPEND") {
                field?.setValue("一時停止する入力のリスト：");
            } else if (dropdown === "RESUME") {
                field?.setValue("再開する入力のリスト：");
            }
        }
    } as BlockSvg;

    Blockly.Blocks['mapping_input_list'] = {
        init: function () {
            const menuItems = [
                ["左スティック", "LEFT_STICK"],
                ["右スティック", "RIGHT_STICK"],
                ["十字キー", "DPAD"],
                ["すべて", "ALL"]
            ] as Blockly.MenuGenerator
            this.appendDummyInput()
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(menuItems), "DROPDOWN");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Array);
            this.setColour(BlockColors.List);
            this.setTooltip("入力のリスト");
            this.setHelpUrl("");
        }
    } as BlockSvg;

}