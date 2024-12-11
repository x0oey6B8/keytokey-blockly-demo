import Blockly, { BlockSvg } from "blockly";
import { BlockColors } from "../../configurations/blockColors.ts";
import { useBlocklyStore } from "../../stores/blocklyStore.ts";

export function defineLoopBlocks() {
    Blockly.Blocks['for_of'] = {
        init: function () {
            this.appendValueInput("LIST")
                .setCheck("Array")
                .appendField("リスト：");
            this.appendDummyInput()
                .appendField("の各要素");
            this.appendDummyInput("VARIABLE")
                .appendField(new Blockly.FieldVariable("リストの各項目"), "VARIABLE");
            this.appendDummyInput()
                .appendField("を取り出す");
            this.appendStatementInput("STATEMENT")
                .setCheck(null);
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(BlockColors.Loop);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } as BlockSvg;

    Blockly.Blocks['controls_flow_statements'] = {
        init: function () {

            const blocklyStore = useBlocklyStore();
            const workspace = blocklyStore.getCurrentWorkspaceSession()?.workspace;
            const menus: Blockly.MenuGenerator = [
                ["ループから抜ける", "BREAK"], ["次のループへ", "CONTINUE"]
            ]
            this.appendDummyInput()
                // @ts-ignore
                .appendField(new Blockly.FieldDropdown(menus), "FLOW");
            this.setPreviousStatement(true);
            this.setNextStatement(false);
            this.setColour(120);
            this.setTooltip("");
            this.setHelpUrl("");

            const that = this;

            // onchangeイベントで不正配置をチェック
            this.onchange = function (event) {
                if (!workspace) {
                    return; // ワークスペース外では処理をしない
                }

                const loopBlockTypes = ['for_of', 'controls_repeat_ext', 'controls_for', 'controls_whileUntil'];
                let isInsideLoop = false;
                let parentBlock = that.getSurroundParent();

                // 親ブロックをたどってループブロックを探す
                while (parentBlock) {
                    if (loopBlockTypes.includes(parentBlock.type)) {
                        isInsideLoop = true;
                        console.log(parentBlock.type)
                        console.log("is inside")
                        break;
                    }
                    parentBlock = parentBlock.getSurroundParent();
                }

                // ループブロック外なら接続を解除
                if (!isInsideLoop) {
                    that.unplug();
                }
            }
        }
    } as BlockSvg;
}
