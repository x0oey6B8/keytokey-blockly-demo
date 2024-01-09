import Blockly, { BlockSvg } from "blockly";
import { keys } from "./keys.ts";
import { BlockColors } from "../../configurations/blockColors.ts";
import { controllerButtons } from "./controllerButtons.ts";
import { OutputType } from "./outputType.ts";
import { mappingTargets } from "./mappingSources.ts";

export function defineValueBlocks() {

    Blockly.Blocks['keys'] = {
        init: function () {
            const dropdown = new Blockly.FieldDropdown(keys);
            this.appendDummyInput()
                // @ts-ignore
                .appendField(dropdown, "VALUE");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Keys);
            this.setColour(BlockColors.Enum);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['controller_buttons'] = {
        init: function () {
            const dropdown = new Blockly.FieldDropdown(controllerButtons);
            this.appendDummyInput()
                // @ts-ignore
                .appendField(dropdown, "VALUE");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.ControllerButtons);
            this.setColour(BlockColors.Enum);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['direction'] = {
        init: function () {
            const menus = [
                ["無", "NEUTRAL"],
                ["上", "UP"],
                ["右上", "UP_RIGHT"],
                ["右下", "DOWN_RIGHT"],
                ["下", "DOWN"],
                ["左下", "DOWN_LEFT"],
                ["左", "LEFT"],
                ["左上", "UP_LEFT"],
            ] as Blockly.MenuGenerator;
            this.appendDummyInput()
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(menus), "VALUE")
                .appendField("方向");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Direction);
            this.setColour(BlockColors.Enum);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['point'] = {
        init: function () {
            this.appendValueInput("X")
                .setCheck("Number")
                .appendField("横：");
            this.appendValueInput("Y")
                .setCheck("Number")
                .appendField("縦：");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Point);
            this.setColour(BlockColors.Point);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['get_point_property'] = {
        init: function () {
            this.appendValueInput("POINT")
                .appendField("座標：")
                .setCheck("Point");
            this.appendDummyInput()
                .appendField("→")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown([["横", "x"], ["縦", "y"]]), "DROPDOWN");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Number);
            this.setColour(BlockColors.Math);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['size'] = {
        init: function () {
            this.appendValueInput("X")
                .setCheck("Number")
                .appendField("横の長さ：");
            this.appendValueInput("Y")
                .setCheck("Number")
                .appendField("縦の長さ：");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Size);
            this.setColour(BlockColors.Size);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;


    Blockly.Blocks['get_size_property'] = {
        init: function () {
            this.appendValueInput("SIZE")
                .appendField("サイズ：")
                .setCheck(OutputType.Size);
            this.appendDummyInput()
                .appendField("→")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown([["横の長さ", "width"], ["縦の長さ", "height"]]), "DROPDOWN");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.Number);
            this.setColour(BlockColors.Math);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;


    Blockly.Blocks['window_state'] = {
        init: function () {
            this.appendDummyInput("VALUE")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown([["最大化", "MAXIMIZED"], ["最小化", "MINIMIZED"], ["通常", "NORMAL"]]), "DROPDOWN");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.WindowState);
            this.setColour(BlockColors.Enum);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['window_set_visibility'] = {
        init: function () {
            this.appendValueInput("WINDOW")
                .appendField("ウィンドウ：")
                .setCheck(OutputType.Window);
            this.appendDummyInput()
                .appendField("を")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown([["非表示状態", "HIDE"], ["表示状態", "SHOW"]]), "DROPDOWN")
                .appendField("にする");
            this.setInputsInline(true);
            this.setNextStatement(true);
            this.setPreviousStatement(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("ウィンドウの表示状態を設定します。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['ime_conversion_mode'] = {
        init: function () {
            const menus = [
                ["半角英数", "HankakuEisuu"],
                ["全角英数", "ZenkakuEisuu"],
                ["ひらがな", "Hiragana"],
                ["カタカナ", "Katakana"],
                ["半角カタカナ", "HankakuKatakana"],

            ] as Blockly.MenuGenerator;
            this.appendDummyInput()
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(menus), "VALUE");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.IMEConversionMode);
            this.setColour(BlockColors.Enum);
            this.setTooltip("IMEの変換モード");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['mapping_target'] = {
        init: function () {
            const dropdown = new Blockly.FieldDropdown(mappingTargets);
            this.appendDummyInput()
                // @ts-ignore
                .appendField(dropdown, "VALUE");
            this.setInputsInline(true);
            this.setOutput(true, OutputType.MappingTarget);
            this.setColour(BlockColors.Enum);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;
}