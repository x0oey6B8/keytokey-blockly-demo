import { definedCodeGenerators } from "./codeGenerator";
import { COMMENT } from "./defineComment";
import { CONSOLE_CLEAR, CONSOLE_LOG } from "./defineConsole";
import { CONTROLLER, CONTROLLER_PROPERTY, CONTROLLER_STICK_PROPERTY, IS_CONTROLLER_PRESSED } from "./defineController";
import { KEY_DOWN_UP, KEY_TAP, KEY_IS_PRESSED, KEY_UP_ALL, MOUSE_SET_RANDOM_OFFSET_RANGE, MOUSE_SET_ORIGIN_POINT, MOUSE_MOVE, MOUSE_RELATIVE_MOVE, MOUSE_GET_POINT, KEYS_ARE_PRESSED, PHYSICAL_KEY_IS_PRESSED, INPUT_TEXT, MOUSE_SCROLL, INPUT_REPLAY } from "./defineInput";
import { LOGIC_EXPRESSION, LOGIC_OPERATION } from "./defineLogic";
import { FOR_OF } from "./defineLoop";
import { TEMPLATE_MATCHING_RESULT_PROPERTIES, TEMPLATE_MATCHING_MATCH_BY_ID, TEMPLATE_MATCHING_FOUND_IMAGE_PROPERTIES } from "./defineTemplateMatching";
import { VALUE_CONTROLLER_BUTTONS, VALUE_KEYS, VALUE_POINT, VALUE_POINT_GET_PROPERTY, VALUE_RANDOM_POINT, VALUE_SIZE } from "./defineValue";
import { WAIT, HIGH_PRECISION_WAIT, WAIT_FOR_INPUT, WAIT_FOR_CONTROLLER } from "./defineWait";
import { GET_WINDOW, CREATE_WINDOW_BY_WINDOW_HANDLE, WINDOW_GET_PROPERTY, WINDOW_DUMP, FIND_WINDOW_BY, WINDOW_SET_PROPERTY, WINDOW_SET_BOUNDS } from "./defineWindow";
import { TRIGGER_IS_PRESSED } from "./defintTrigger";

export function defineTestCodeGenerator(generator: any) {
    // 値
    definedCodeGenerators.push(new VALUE_KEYS(generator));
    definedCodeGenerators.push(new VALUE_CONTROLLER_BUTTONS(generator));
    definedCodeGenerators.push(new VALUE_POINT(generator));
    definedCodeGenerators.push(new VALUE_SIZE(generator));
    definedCodeGenerators.push(new VALUE_POINT_GET_PROPERTY(generator));
    definedCodeGenerators.push(new VALUE_RANDOM_POINT(generator));

    // ループ
    definedCodeGenerators.push(new FOR_OF(generator));

    // 条件
    definedCodeGenerators.push(new LOGIC_OPERATION(generator));
    definedCodeGenerators.push(new LOGIC_EXPRESSION(generator));

    // トリガー
    definedCodeGenerators.push(new TRIGGER_IS_PRESSED(generator));

    // 入力
    definedCodeGenerators.push(new KEY_DOWN_UP(generator));
    definedCodeGenerators.push(new KEY_TAP(generator));
    definedCodeGenerators.push(new KEY_UP_ALL(generator));
    definedCodeGenerators.push(new MOUSE_SET_RANDOM_OFFSET_RANGE(generator));
    definedCodeGenerators.push(new MOUSE_SET_ORIGIN_POINT(generator));
    definedCodeGenerators.push(new MOUSE_MOVE(generator));
    definedCodeGenerators.push(new MOUSE_RELATIVE_MOVE(generator));
    definedCodeGenerators.push(new MOUSE_GET_POINT(generator));
    definedCodeGenerators.push(new INPUT_TEXT(generator));
    definedCodeGenerators.push(new MOUSE_SCROLL(generator));
    definedCodeGenerators.push(new INPUT_REPLAY(generator));

    definedCodeGenerators.push(new KEY_IS_PRESSED(generator));
    definedCodeGenerators.push(new KEYS_ARE_PRESSED(generator));
    definedCodeGenerators.push(new PHYSICAL_KEY_IS_PRESSED(generator));

    // 待機
    definedCodeGenerators.push(new WAIT(generator));
    definedCodeGenerators.push(new HIGH_PRECISION_WAIT(generator));
    definedCodeGenerators.push(new WAIT_FOR_INPUT(generator));
    definedCodeGenerators.push(new WAIT_FOR_CONTROLLER(generator));

    // 画像認識
    definedCodeGenerators.push(new TEMPLATE_MATCHING_MATCH_BY_ID(generator));
    definedCodeGenerators.push(new TEMPLATE_MATCHING_RESULT_PROPERTIES(generator));
    definedCodeGenerators.push(new TEMPLATE_MATCHING_FOUND_IMAGE_PROPERTIES(generator));

    // コンソール
    definedCodeGenerators.push(new CONSOLE_LOG(generator));
    definedCodeGenerators.push(new CONSOLE_CLEAR(generator));

    // ウィンドウ
    definedCodeGenerators.push(new CREATE_WINDOW_BY_WINDOW_HANDLE(generator));
    definedCodeGenerators.push(new FIND_WINDOW_BY(generator));
    definedCodeGenerators.push(new GET_WINDOW(generator));
    definedCodeGenerators.push(new WINDOW_GET_PROPERTY(generator));
    definedCodeGenerators.push(new WINDOW_SET_PROPERTY(generator));
    definedCodeGenerators.push(new WINDOW_SET_BOUNDS(generator));
    definedCodeGenerators.push(new WINDOW_DUMP(generator));

    // コントローラー
    definedCodeGenerators.push(new CONTROLLER(generator));
    definedCodeGenerators.push(new CONTROLLER_PROPERTY(generator));
    definedCodeGenerators.push(new CONTROLLER_STICK_PROPERTY(generator));
    definedCodeGenerators.push(new IS_CONTROLLER_PRESSED(generator));

    // コメント
    definedCodeGenerators.push(new COMMENT(generator));

    for (const item of definedCodeGenerators) {
        item.register();
    }
}