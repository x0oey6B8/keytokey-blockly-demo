import Blockly, { BlockSvg, Field } from "blockly";
import { BlockColors } from "../../configurations/blockColors";
import { useNotificationStore } from "../../stores/notificationStore";
import { FileType } from "../../hosts/macroManager";
import { useEditingMacro } from "../../stores/editingMacro";

function disconnectEventBlockOnInappropriateFile(e: Blockly.Events.Abstract, targetFile: FileType, block: BlockSvg) {
    const file = useEditingMacro()?.file;
    if (e.type != Blockly.Events.BLOCK_DRAG || file?.setting.type === targetFile) {
        return;
    }

    if (block.workspace.getToolbox()) {
        block.dispose();
        const toaster = useNotificationStore();
        toaster.error(`ブロックは現在のファイルではで使用できません`);
    }
}

export function defineEventBlocks() {
    Blockly.Blocks['event_macro_ended'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント：マクロ終了時");
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
            this.onchange = (e) => disconnectEventBlockOnInappropriateFile(e, "EVENT_MACRO_ENDED", this);
        }
    } as BlockSvg;

    Blockly.Blocks['event_trigger_pressed'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント:トリガーが押されたら")
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
            this.onchange = (e) => disconnectEventBlockOnInappropriateFile(e, "EVENT_TRIGGER_PRESSED", this);
        }
    } as BlockSvg;

    Blockly.Blocks['event_trigger_released'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント：トリガーが離されたら")
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
            this.onchange = (e) => disconnectEventBlockOnInappropriateFile(e, "EVENT_TRIGGER_RELEASED", this);
        }
    } as BlockSvg;

    Blockly.Blocks['event_key_pressed'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント：キー／マウスが押されたら｜変数：")
                .appendField(new Blockly.FieldVariable("押されたキー"), "KEY")
                .appendField(new Blockly.FieldVariable("繰り返された入力?"), "IS_REPEATED")
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(true);
            this.setColour(BlockColors.Enum);
            this.setTooltip("");
            this.setHelpUrl("");
            this.onchange = (e) => disconnectEventBlockOnInappropriateFile(e, "EVENT_KEY_PRESSED", this);
        }
    } as BlockSvg;

    Blockly.Blocks['event_key_released'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント：キー／マウスが離されたら｜変数：")
                .appendField(new Blockly.FieldVariable("離されたキー"), "KEY")
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
            this.onchange = (e) => disconnectEventBlockOnInappropriateFile(e, "EVENT_KEY_RELEASED", this);
        }
    } as BlockSvg;

    Blockly.Blocks['event_key_state_changed'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント：キーが押されたら／離されたら")
            this.appendDummyInput()
                .appendField("受け取る変数：")
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("キー"), "KEY");
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("押された？"), "IS_KEY_PRESSED");
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("トグルキー？"), "IS_TOGGLE_KEY");
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("繰り返された入力？"), "IS_REPEATED");
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("アプリによる入力？"), "IS_INPUT_BY_APP");
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(false);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
            this.onchange = (e) => disconnectEventBlockOnInappropriateFile(e, "EVENT_KEY_STATE_CHANGED", this);
        }
    } as BlockSvg;


    Blockly.Blocks['event_mouse_moved'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント：マウスが移動したら｜");
            this.appendDummyInput()
                .appendField("変数：");
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("新しい座標"), "NEW_POINT");
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("古い座標"), "OLD_POINT");
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("横の移動量"), "DELTA_X");
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("縦の移動量"), "DELTA_Y");
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("アプリによる入力？"), "IS_INPUT_BY_APP");
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(false);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
            this.onchange = (e) => disconnectEventBlockOnInappropriateFile(e, "EVENT_MOUSE_MOVED", this);
        }
    } as BlockSvg;

    Blockly.Blocks['event_cancel_input'] = {
        init: function () {
            const allowingBlockTypes = [
                "event_key_pressed",
                "event_key_released",
                "event_key_state_changed",
                "event_mouse_moved",
            ]
            const menu = new Blockly.FieldDropdown([["キャンセルする", "true"], ["キャンセルしない", "false"]]);
            this.appendDummyInput().appendField("入力を").appendField(menu as Field<string>, "VALUE");
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
            const getRootBlock = () => {
                let ancestor = this;
                while (true) {
                    let parent = ancestor.getParent();
                    if (parent) {
                        ancestor = parent;
                        continue;
                    }
                    break;
                }
                return ancestor.id !== this.id ? ancestor : undefined;
            }
            this.onchange = () => {
                if (this.workspace?.isDragging()) {
                    return;
                }
                const rootBlock = getRootBlock();
                if (rootBlock) {
                    if (!allowingBlockTypes.includes(rootBlock.type)) {
                        this.unplug();
                        const toaster = useNotificationStore();
                        toaster.info(`「入力キャンセル」ブロックは特定のイベントブロックにのみ接続できます`);
                    }
                }
            };
        }
    } as BlockSvg;

    Blockly.Blocks['event_controller_state_changed'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("イベント：コントローラーのボタンやスティックの入力があったら")
            this.appendDummyInput()
                .appendField("受け取る変数：")
                .appendField(new Blockly.FieldVariable("入力"), "INPUT")
                .appendField(new Blockly.FieldVariable("押された？"), "IS_PRESSED");
            this.appendStatementInput("STATEMENT");
            this.setInputsInline(false);
            this.setColour(BlockColors.Action);
            this.setTooltip("");
            this.setHelpUrl("");
            this.onchange = (e) => disconnectEventBlockOnInappropriateFile(e, "EVENT_CONTROLLER_STATE_CHANGED", this);
        }
    } as BlockSvg;

}