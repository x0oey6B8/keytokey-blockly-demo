import Blockly from "blockly"

export function overwriteMessages() {

    // リストブロック
    Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH"] = "リスト作成：";

    // ループブロック
    Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"] = "";

    // ifブロック
    Blockly.Msg["CONTROLS_IF_MSG_THEN"] = "";
    Blockly.Msg["CONTROLS_IF_MSG_ELSE"] = "それ以外の場合";

    // 関数ブロック
    Blockly.Msg["PROCEDURES_BEFORE_PARAMS"] = ":";
    Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS"] = ":";
    Blockly.Msg["PROCEDURES_HIGHLIGHT_DEF"] = "関数の定義へ移動";
}