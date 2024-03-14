import Blockly from "blockly"

export function overwriteMessages() {

    // ブロック共通
    Blockly.Msg["EXTERNAL_INPUTS"] = "入力を縦並びにする";
    Blockly.Msg["INLINE_INPUTS"] = "入力を横並びにする";

    // リストブロック
    Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH"] = "";

    // ループブロック
    Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"] = "";

    // ifブロック
    Blockly.Msg["CONTROLS_IF_MSG_THEN"] = "";
    Blockly.Msg["CONTROLS_IF_MSG_ELSE"] = "それ以外の場合";

    // 関数ブロック
    Blockly.Msg["PROCEDURES_BEFORE_PARAMS"] = ":";
    Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS"] = ":";
    Blockly.Msg["PROCEDURES_HIGHLIGHT_DEF"] = "関数の定義へ移動";
    Blockly.Msg["PROCEDURES_MUTATORARG_TITLE"] = "引数名";
    Blockly.Msg["PROCEDURES_MUTATORARG_TOOLTIP"] = "関数への引数の追加。";
    Blockly.Msg["PROCEDURES_MUTATORCONTAINER_TITLE"] = "引数";
    Blockly.Msg["PROCEDURES_MUTATORCONTAINER_TOOLTIP"] = "この関数への引数の追加、削除、順番変更。";

    // テキストブロック
    Blockly.Msg["TEXT_JOIN_TITLE_CREATEWITH"] = "テキスト連結：";
}