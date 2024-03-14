import Blockly, { Block, BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";

export function defineInputBlocks() {

    Blockly.Blocks['key_is_pressed'] = {
        init: function () {
            this.appendValueInput("KEY")
                .setCheck("Keys");
            this.appendDummyInput()
                .appendField("が")
                .appendField(new Blockly.FieldDropdown([["押されてる", "PRESSED"], ["押されてない", "RELEASED"]]), "DROPDOWN")
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("キーの入力状態を取得します。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['key_is_hardware_pressed'] = {
        init: function () {
            this.appendValueInput("KEY")
                .setCheck("Keys");
            this.appendDummyInput()
                .appendField("がハードウェア的に")
                .appendField(new Blockly.FieldDropdown([["押されてる", "PRESSED"], ["押されてない", "RELEASED"]]), "DROPDOWN")
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("物理キーの入力状態を取得します。");
            this.setHelpUrl("");
        }
    };

    // 使ってない
    Blockly.Blocks['key_is_software_pressed'] = {
        init: function () {
            this.appendValueInput("KEY")
                .setCheck("Keys");
            this.appendDummyInput()
                .appendField("がソフトウェア的に")
                .appendField(new Blockly.FieldDropdown([["押されてる", "PRESSED"], ["押されてない", "RELEASED"]]), "DROPDOWN")
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("キーの入力状態を取得します。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['keys_are_pressed'] = {
        init: function () {
            this.appendValueInput("KEY_ARRAY")
                .setCheck("Array")
                .appendField("キーのリスト");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["どれかが押されてる", "SOME_PRESSED"],
                    ["すべて押されてる", "ALL_PRESSED"],
                    ["すべて離されてる", "ALL_RELEASED"],
                ]), "DROPDOWN");
            this.setInputsInline(true);
            this.setOutput(true, "Boolean");
            this.setColour(BlockColors.Logic);
            this.setTooltip("指定したキーの配列に関する入力状態を取得します。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['down_up'] = {
        init: function () {
            this.appendValueInput("KEY")
                .setCheck("Keys");
            this.appendDummyInput()
                .appendField("を");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["押す", "Down"], ["離す", "Up"]]), "BEHAVIOR");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("キーを入力します");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['tap'] = {
        init: function () {
            this.appendValueInput("KEY1")
                .setCheck("Keys");
            this.appendDummyInput()
                .appendField("を押して");
            this.appendValueInput("WAIT1")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField("ミリ秒待つ、離して")
            this.appendValueInput("WAIT2")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField("ミリ秒待つ");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("キーを押して離します。");
            this.setHelpUrl("");
            this.customContextMenu = (options) => {
                options.push({
                    text: "aaaaa",
                    enabled: true,
                    weight: 0,
                    callback: (_) => {
                        console.log(this.id);
                    }
                })
            };
        }

    } as BlockSvg;

    Blockly.Blocks['up_all'] = {
        init: function () {
            this.appendValueInput("EXCLUDED_KEYS")
                .setCheck("Array")
                .appendField("すべてのキーを離す｜除外キーのリスト：");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("指定したキー以外のキーをすべて離します。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['random_point'] = {
        init: function () {
            this.appendValueInput("X_FROM")
                .setCheck("Number")
                .appendField("ランダムな座標：横（");
            this.appendValueInput("X_TO")
                .setCheck("Number")
                .appendField("～");
            this.appendDummyInput()
                .appendField("）");
            this.appendValueInput("Y_FROM")
                .setCheck("Number")
                .appendField("縦（");
            this.appendValueInput("Y_TO")
                .setCheck("Number")
                .appendField("～");
            this.appendDummyInput()
                .appendField("）");
            this.setInputsInline(true);
            this.setOutput(true, "Point");
            this.setColour(BlockColors.Point);
            this.setTooltip("指定した範囲でランダムな座標を取得します。");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['mouse_set_random_offset_range'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスの移動先を（");
            this.appendValueInput("X")
                .setCheck("Number")
                .appendField("横：");
            this.appendValueInput("Y")
                .setCheck("Number")
                .appendField("縦：");
            this.appendDummyInput()
                .appendField("）の範囲でランダムにする");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("マウスの移動先の座標に対して指定した範囲で乱数を加えます。例えば横に10を指定した場合、横の移動先は「横の移動先 + (-10～10)」になります。");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['mouse_get_point'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスカーソルの座標");
            this.setInputsInline(true);
            this.setOutput(true, "Point");
            this.setColour(BlockColors.Point);
            this.setTooltip("画面上にあるマウスカーソルの座標を取得します。");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['mouse_set_origin_point'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウス移動の原点座標を");
            this.appendValueInput("ORIGIN")
                .setCheck("Point");
            this.appendDummyInput()
                .appendField("にセット");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("指定した座標を基準にマウスが移動するようになります。");
            this.setHelpUrl("");
        }
    };

    const speedArray: Blockly.MenuOption[] = [
        ["一瞬", "WARP"],
        ["とても速い速度", "FASTEST"],
        ["速い速度", "FAST"],
        ["普通速度", "NORMAL"],
        ["遅い速度", "SLOW"],
        ["とても遅い速度", "SLOWEST"]
    ];

    Blockly.Blocks['mouse_move'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスを")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(speedArray), "SPEED")
                .appendField("で");
            this.appendValueInput("POINT")
                .setCheck("Point");
            this.appendDummyInput()
                .appendField("に移動");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("マウスを指定した座標に移動させます。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['mouse_move_relative'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("マウスを")
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(speedArray), "SPEED")
                .appendField("で", "TEXT1");
            this.appendDummyInput()
                .appendField("横に");
            this.appendValueInput("DX")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput()
                .appendField("縦に");
            this.appendValueInput("DY")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput()
                .appendField("移動");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("マウスを現在の位置から指定した分だけ移動させます。");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks['scroll'] = {
        init: function () {
            this.appendDummyInput()
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown([["上", "up"], ["下", "down"], ["左", "left"], ["右", "right"]]), "direction")
                .appendField("方向に");
            this.appendValueInput("DELTA")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField("スクロール");
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("指定した量だけスクロールします。");
            this.setHelpUrl("");
        }
    } as Block;

    Blockly.Blocks["input_text"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("テキスト");
            this.appendValueInput("TEXT")
                .setCheck("String");
            this.appendDummyInput()
                .appendField("を");
            this.appendValueInput("INTERVAL")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField("ミリ秒間隔で入力");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("文字を入力します。");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['replay'] = {
        init: function () {
            this.appendValueInput("PATH")
                .setCheck("String")
                .appendField("入力記録の再生｜パス：");
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setPreviousStatement(true, null);
            this.setColour(BlockColors.Action);
            this.setTooltip("記録した入力を再生します。");
            this.setHelpUrl("");
        }
    } as Block;
}