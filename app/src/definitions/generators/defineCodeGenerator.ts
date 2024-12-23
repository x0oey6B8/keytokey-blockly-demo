import { definedCodeGenerators } from "./codeGenerator";
import { COMMENT, COMMENT_STATEMENT } from "./defineComment";
import { CONSOLE_CLEAR, CONSOLE_LOG, CONSOLE_SEPARATE } from "./defineConsole";
import { CONTROLLER, CONTROLLER_PROPERTY, CONTROLLER_STICK_PROPERTY, CONTROLLER_TRIGGER_PROPERTY, IS_CONTROLLER_PRESSED, XINPUT_CONTROLLER } from "./defineController";
import { VIRTUAL_DUALSHOCK4_DOWN_UP, VIRTUAL_DUALSHOCK4_NEUTRALIZE_DPAD, VIRTUAL_DUALSHOCK4_RESET, VIRTUAL_DUALSHOCK4_STICK_ANGLE1, VIRTUAL_DUALSHOCK4_STICK_ANGLE2, VIRTUAL_DUALSHOCK4_STICK_VALUE, VIRTUAL_DUALSHOCK4_TAP, VIRTUAL_DUALSHOCK4_TRIGGER1, VIRTUAL_DUALSHOCK4_TRIGGER2 } from "./defineDualShock4";
import { EVENT_CANCEL_INPUT, EVENT_CONTROLLER_STATE_CHANGED, EVENT_KEY_PRESSED, EVENT_KEY_RELEASED, EVENT_KEY_STATE_CHANGED, EVENT_MACRO_ENDED, EVENT_MOUSE_MOVED, EVENT_TRIGGER_PRESSED, EVENT_TRIGGER_RELEASED } from "./defineEvent";
import { GET_IME_CONVERSION_MODE, SET_IME_CONVERSION_MODE } from "./defineIME";
import { KEY_DOWN_UP, KEY_TAP, KEY_IS_PRESSED, KEY_UP_ALL, MOUSE_SET_RANDOM_OFFSET_RANGE, MOUSE_SET_ORIGIN_POINT, MOUSE_MOVE, MOUSE_RELATIVE_MOVE, MOUSE_GET_POINT, KEYS_ARE_PRESSED, key_is_hardware_pressed, INPUT_TEXT, MOUSE_SCROLL, INPUT_REPLAY } from "./defineInput";
import { EMBEDDED_SINGLELINE_JAVASCRIPT, FORMTTED_JSON_STRINGIFY, EMBEDDED_MULTILINE_JAVASCRIPT, JSON_STRINGIFY, JSON_PARSE } from "./defineJavascript";
import { LOGIC_EXPRESSION, LOGIC_OPERATION } from "./defineLogic";
import { FOR_OF } from "./defineLoop";
import { MAPPING_INPUT_ARRAY, MAPPING_SUSPEND_RESUME } from "./defineMapping";
import { MONITOR, MONITORS, MONITOR_DUMP, MONITOR_PROPERTY } from "./defineMonitor";
import { CHANGE_PROFILE, PROFILE_CAN_WORK, PROFILE_CAN_WORK_ON_ACTIVE_WINDOW, PROFILE_GET_NAME, PROFILE_IS_ENABLED } from "./definePofile";
import { INTERRUPT } from "./defineSystem";
import { TEMPLATE_MATCHING_RESULT_PROPERTIES, TEMPLATE_MATCHING_MATCH_BY_ID, TEMPLATE_MATCHING_FOUND_IMAGE_PROPERTIES } from "./defineTemplateMatching";
import { DATE_TIME_PROPERTY, DATE_TIME_NOW, PERFORMANCE_NOW, DATE_TIME_TO_STRING } from "./defineTime";
import { TRIGGER_AS_CONTROLLER, TRIGGER_AS_KEY, TRIGGER_IS_CONTROLLER, TRIGGER_IS_KEYBOARD, TRIGGER_IS_KEY_OR_MOUSE, TRIGGER_IS_MOUSE, TRIGGER_IS_PRESSED } from "./defineTrigger";
import { VALUE_CONTROLLER_BUTTONS, VALUE_KEYS, VALUE_POINT, VALUE_POINT_GET_PROPERTY, DIRECTION, VALUE_SIZE, MAPPING_TARGET, VALUE_RANDOM_POINT, GET_SIZE_PROPERTY, IME_CONVERSION_MODE } from "./defineValue";
import { CLEAR_LOCAL_VARIABLES, GET_VALUE_FROM_VARIABLE, SET_VALUE_TO_VARIABLE, VARIABLE_EXISTS } from "./defineVariable";
import { VIRTUAL_XINPUT_DOWN_UP, VIRTUAL_XINPUT_NEUTRALIZE_DPAD, VIRTUAL_XINPUT_RESET, VIRTUAL_XINPUT_STICK_ANGLE1, VIRTUAL_XINPUT_STICK_ANGLE2, VIRTUAL_XINPUT_STICK_VALUE, VIRTUAL_XINPUT_TAP, VIRTUAL_XINPUT_TRIGGER1, VIRTUAL_XINPUT_TRIGGER2 } from "./defineVirtualXInput";
import { WAIT, HIGH_PRECISION_WAIT, WAIT_FOR_INPUT } from "./defineWait";
import { GET_WINDOW, CREATE_WINDOW_BY_WINDOW_HANDLE, WINDOW_GET_PROPERTY, WINDOW_DUMP, FIND_WINDOW_BY, WINDOW_SET_BOUNDS, WINDOW_CLOSE, WINDOW_SET_STATE, WINDOW_SET_VISIBILITY, WINDOW_SET_POINT, WINDOW_SET_SIZE, WINDOW_SET_TEXT, WINDOW_SET_TITLE, WINDOW_RESTORE } from "./defineWindow";

export function defineTestCodeGenerator(generator: any) {

    // システム
    definedCodeGenerators.push(new INTERRUPT(generator))

    // javascript
    /* Obsolete */definedCodeGenerators.push(new EMBEDDED_MULTILINE_JAVASCRIPT(generator));
    /* Obsolete */definedCodeGenerators.push(new EMBEDDED_SINGLELINE_JAVASCRIPT(generator));
    definedCodeGenerators.push(new JSON_STRINGIFY(generator));
    definedCodeGenerators.push(new FORMTTED_JSON_STRINGIFY(generator));
    definedCodeGenerators.push(new JSON_PARSE(generator));

    // 変数
    definedCodeGenerators.push(new SET_VALUE_TO_VARIABLE(generator));
    definedCodeGenerators.push(new GET_VALUE_FROM_VARIABLE(generator));
    definedCodeGenerators.push(new VARIABLE_EXISTS(generator));
    definedCodeGenerators.push(new CLEAR_LOCAL_VARIABLES(generator));

    // 値
    definedCodeGenerators.push(new VALUE_KEYS(generator));
    definedCodeGenerators.push(new VALUE_CONTROLLER_BUTTONS(generator));
    definedCodeGenerators.push(new VALUE_POINT(generator));
    definedCodeGenerators.push(new VALUE_SIZE(generator));
    definedCodeGenerators.push(new GET_SIZE_PROPERTY(generator));
    definedCodeGenerators.push(new VALUE_POINT_GET_PROPERTY(generator));
    definedCodeGenerators.push(new VALUE_RANDOM_POINT(generator));
    definedCodeGenerators.push(new DIRECTION(generator));
    definedCodeGenerators.push(new IME_CONVERSION_MODE(generator));
    definedCodeGenerators.push(new MAPPING_TARGET(generator));

    // イベント関連
    definedCodeGenerators.push(new EVENT_MACRO_ENDED(generator));
    definedCodeGenerators.push(new EVENT_TRIGGER_PRESSED(generator));
    definedCodeGenerators.push(new EVENT_TRIGGER_RELEASED(generator));
    definedCodeGenerators.push(new EVENT_KEY_PRESSED(generator));
    definedCodeGenerators.push(new EVENT_KEY_RELEASED(generator));
    definedCodeGenerators.push(new EVENT_KEY_STATE_CHANGED(generator));
    definedCodeGenerators.push(new EVENT_MOUSE_MOVED(generator));
    definedCodeGenerators.push(new EVENT_CANCEL_INPUT(generator));
    definedCodeGenerators.push(new EVENT_CONTROLLER_STATE_CHANGED(generator));


    // ループ
    definedCodeGenerators.push(new FOR_OF(generator));

    // 条件
    definedCodeGenerators.push(new LOGIC_OPERATION(generator));
    definedCodeGenerators.push(new LOGIC_EXPRESSION(generator));

    // プロファイル
    definedCodeGenerators.push(new PROFILE_IS_ENABLED(generator));
    definedCodeGenerators.push(new PROFILE_CAN_WORK_ON_ACTIVE_WINDOW(generator));
    definedCodeGenerators.push(new PROFILE_CAN_WORK(generator));
    definedCodeGenerators.push(new PROFILE_GET_NAME(generator));
    definedCodeGenerators.push(new CHANGE_PROFILE(generator));

    // トリガー
    definedCodeGenerators.push(new TRIGGER_IS_PRESSED(generator));
    definedCodeGenerators.push(new TRIGGER_IS_KEYBOARD(generator));
    definedCodeGenerators.push(new TRIGGER_IS_MOUSE(generator));
    definedCodeGenerators.push(new TRIGGER_IS_KEY_OR_MOUSE(generator));
    definedCodeGenerators.push(new TRIGGER_IS_CONTROLLER(generator));
    definedCodeGenerators.push(new TRIGGER_AS_KEY(generator));
    definedCodeGenerators.push(new TRIGGER_AS_CONTROLLER(generator));

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
    definedCodeGenerators.push(new key_is_hardware_pressed(generator));

    // 待機
    definedCodeGenerators.push(new WAIT(generator));
    definedCodeGenerators.push(new HIGH_PRECISION_WAIT(generator));
    definedCodeGenerators.push(new WAIT_FOR_INPUT(generator));

    // 画像認識
    definedCodeGenerators.push(new TEMPLATE_MATCHING_MATCH_BY_ID(generator));
    definedCodeGenerators.push(new TEMPLATE_MATCHING_RESULT_PROPERTIES(generator));
    definedCodeGenerators.push(new TEMPLATE_MATCHING_FOUND_IMAGE_PROPERTIES(generator));

    // コンソール
    definedCodeGenerators.push(new CONSOLE_LOG(generator));
    definedCodeGenerators.push(new CONSOLE_SEPARATE(generator));
    definedCodeGenerators.push(new CONSOLE_CLEAR(generator));

    // ウィンドウ
    definedCodeGenerators.push(new CREATE_WINDOW_BY_WINDOW_HANDLE(generator));
    definedCodeGenerators.push(new FIND_WINDOW_BY(generator));
    definedCodeGenerators.push(new GET_WINDOW(generator));
    definedCodeGenerators.push(new WINDOW_GET_PROPERTY(generator));
    definedCodeGenerators.push(new WINDOW_SET_POINT(generator));
    definedCodeGenerators.push(new WINDOW_SET_SIZE(generator));
    definedCodeGenerators.push(new WINDOW_SET_TITLE(generator));
    definedCodeGenerators.push(new WINDOW_SET_TEXT(generator));
    definedCodeGenerators.push(new WINDOW_SET_BOUNDS(generator));
    definedCodeGenerators.push(new WINDOW_DUMP(generator));
    definedCodeGenerators.push(new WINDOW_CLOSE(generator));
    definedCodeGenerators.push(new WINDOW_SET_VISIBILITY(generator));
    definedCodeGenerators.push(new WINDOW_RESTORE(generator));
    definedCodeGenerators.push(new WINDOW_SET_STATE(generator));

    // コントローラー
    definedCodeGenerators.push(new CONTROLLER(generator));
    definedCodeGenerators.push(new XINPUT_CONTROLLER(generator));
    definedCodeGenerators.push(new CONTROLLER_PROPERTY(generator));
    definedCodeGenerators.push(new CONTROLLER_STICK_PROPERTY(generator));
    definedCodeGenerators.push(new CONTROLLER_TRIGGER_PROPERTY(generator));
    definedCodeGenerators.push(new IS_CONTROLLER_PRESSED(generator));

    // 仮想コントローラーのマッピング
    definedCodeGenerators.push(new MAPPING_SUSPEND_RESUME(generator));
    definedCodeGenerators.push(new MAPPING_INPUT_ARRAY(generator));

    // 仮想XINPUTコントローラー
    definedCodeGenerators.push(new VIRTUAL_XINPUT_DOWN_UP(generator));
    definedCodeGenerators.push(new VIRTUAL_XINPUT_TAP(generator));
    definedCodeGenerators.push(new VIRTUAL_XINPUT_NEUTRALIZE_DPAD(generator));
    definedCodeGenerators.push(new VIRTUAL_XINPUT_STICK_VALUE(generator));
    definedCodeGenerators.push(new VIRTUAL_XINPUT_STICK_ANGLE1(generator));
    definedCodeGenerators.push(new VIRTUAL_XINPUT_STICK_ANGLE2(generator));
    definedCodeGenerators.push(new VIRTUAL_XINPUT_TRIGGER1(generator));
    definedCodeGenerators.push(new VIRTUAL_XINPUT_TRIGGER2(generator));
    definedCodeGenerators.push(new VIRTUAL_XINPUT_RESET(generator));

    // 仮想DUALSHOCK4コントローラー
    definedCodeGenerators.push(new VIRTUAL_DUALSHOCK4_DOWN_UP(generator));
    definedCodeGenerators.push(new VIRTUAL_DUALSHOCK4_TAP(generator));
    definedCodeGenerators.push(new VIRTUAL_DUALSHOCK4_NEUTRALIZE_DPAD(generator));
    definedCodeGenerators.push(new VIRTUAL_DUALSHOCK4_STICK_VALUE(generator));
    definedCodeGenerators.push(new VIRTUAL_DUALSHOCK4_STICK_ANGLE1(generator));
    definedCodeGenerators.push(new VIRTUAL_DUALSHOCK4_STICK_ANGLE2(generator));
    definedCodeGenerators.push(new VIRTUAL_DUALSHOCK4_TRIGGER1(generator));
    definedCodeGenerators.push(new VIRTUAL_DUALSHOCK4_TRIGGER2(generator));
    definedCodeGenerators.push(new VIRTUAL_DUALSHOCK4_RESET(generator));

    // 時間
    definedCodeGenerators.push(new PERFORMANCE_NOW(generator));
    definedCodeGenerators.push(new DATE_TIME_NOW(generator));
    definedCodeGenerators.push(new DATE_TIME_TO_STRING(generator));
    definedCodeGenerators.push(new DATE_TIME_PROPERTY(generator));

    // モニター
    definedCodeGenerators.push(new MONITOR(generator));
    definedCodeGenerators.push(new MONITORS(generator));
    definedCodeGenerators.push(new MONITOR_PROPERTY(generator));
    definedCodeGenerators.push(new MONITOR_DUMP(generator));

    // IME
    definedCodeGenerators.push(new GET_IME_CONVERSION_MODE(generator));
    definedCodeGenerators.push(new SET_IME_CONVERSION_MODE(generator));

    // コメント
    definedCodeGenerators.push(new COMMENT(generator));
    definedCodeGenerators.push(new COMMENT_STATEMENT(generator));

    for (const item of definedCodeGenerators) {
        item.register();
    }
}