import { BlocklyOptions } from "blockly";

export const options: BlocklyOptions = {
    renderer: "zelos",
    // renderer: "",
    theme: "myStyle",
    media: "media",
    toolbox: getToolBoxXml(),
    collapse: true,
    comments: true,
    disable: true,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: getToolBoxPosition(),
    css: true,
    rtl: false,
    scrollbars: true,
    sounds: false,
    oneBasedIndex: true,
    grid: {
        spacing: 33,
        length: 3,
        colour: "#bbbbbb60",
        snap: true,
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.75,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.05,
    },
    move: {
        drag: true,
        wheel: false,
    },
    plugins: {
    }
};

function getToolBoxPosition() {
    const position = localStorage.getItem("toolbox_position");
    return position ? position : "end";
}

export function switchToolBoxPosition() {
    const position = getToolBoxPosition();
    const newPosition = position === "end" ? "start" : "end";
    localStorage.setItem("toolbox_position", newPosition);
    location.reload();
}

function getToolBoxXml(): string {
    return `
<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox">

    <category name="値" colour="250">

        <label text="キーボード／マウス"></label>
        <block type="keys">
            <field name="VALUE">A</field>
        </block>
        
        <label text="コントローラーのボタンやスティック"></label>
        <block type="controller_buttons">
            <field name="VALUE">A</field>
        </block>

        <label text="数値"></label>
        <block type="math_number" gap="32">
            <field name="NUM">123</field>
        </block>

        <label text="真理値"></label>
        <block type="logic_boolean"></block>

        <label text="文字列"></label>
        <block type="text" gap="32">
            <field name="TEXT">文字列!</field>
        </block>

        <label text="座標"></label>
        <block type="point">
            <value name="X">
            <block type="math_number">
                <field name="NUM">0</field>
            </block>
            </value>
            <value name="Y">
            <block type="math_number">
                <field name="NUM">0</field>
            </block>
            </value>
        </block>
        <block type="get_point_property"></block>
        <block type="random_point">
            <value name="X_FROM">
                <block type="math_number">
                    <field name="NUM">-10</field>
                </block>
            </value>
            <value name="X_TO">
                <block type="math_number">
                    <field name="NUM">10</field>
                </block>
            </value>
            <value name="Y_FROM">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
            <value name="Y_TO">
                <block type="math_number">
                    <field name="NUM">100</field>
                </block>
            </value>
        </block>

        <label text="サイズ"></label>
        <block type="size"></block>
        <block type="get_size_property"></block>

        <label text="方角"></label>
        <block type="direction"></block>

        <label text="ウィンドウの状態"></label>
        <block type="window_state"></block>

        <label text="IMEの変換モード"></label>
        <block type="ime_conversion_mode"></block>

        <label text="　"></label>
        <label text="　"></label>
        <label text="　"></label>
        <label text="　"></label>
        <label text="　"></label>
        <label text="　"></label>
        <label text="　"></label>
    </category>



    <category name="変数" categorystyle="variable_category" custom="VARIABLE">
    </category>


    <category name="変数（KeyToKey）" categorystyle="variable_category">
    </category>

    <category name="イベント関連" categorystyle="variable_category">
        <block type="event_macro_ended"></block>
    </category>

    <category name="関数" categorystyle="procedure_category" custom="PROCEDURE"></category>



    <sep></sep>

    

    <category name="条件" categorystyle="logic_category">
        <block type="controls_if"></block>
        <!--<block type="logic_compare"></block>-->
        <block type="logic_expression"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <!--
        <block type="logic_null" disabled="true"></block>
        <block type="logic_ternary"></block>
        -->
    </category>



    <category name="ループ" categorystyle="loop_category">
        <block type="controls_repeat_ext">
            <value name="TIMES">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="controls_whileUntil"></block>
        <block type="controls_for">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
            <value name="BY">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <!--
        <block type="controls_forEach"></block>
        -->
        <block type="for_of"></block>
        <block type="controls_flow_statements"></block>

        <label text="テンプレート"></label>
        <label text="トリガーが押されている間ループ"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="controls_whileUntil">
            <field name="MODE">WHILE</field>
            <value name="BOOL">
                <block type="trigger_is_pressed">
                    <field name="DROPDOWN">PRESSED</field>
                </block>
            </value>
        </block>
    </category>


    <category name="数学" categorystyle="math_category">
        <block type="math_number" gap="32">
            <field name="NUM">123</field>
        </block>
        <block type="math_arithmetic">
            <value name="A">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="B">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="math_single">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">9</field>
                </shadow>
            </value>
        </block>
        <block type="math_trig">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">45</field>
                </shadow>
            </value>
        </block>
        <block type="math_constant"></block>
        <block type="math_number_property">
            <value name="NUMBER_TO_CHECK">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="math_round">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">3.1</field>
                </shadow>
            </value>
        </block>
        <block type="math_on_list"></block>
        <block type="math_modulo">
            <value name="DIVIDEND">
                <shadow type="math_number">
                    <field name="NUM">64</field>
                </shadow>
            </value>
            <value name="DIVISOR">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="math_constrain">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="LOW">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="HIGH">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="math_random_int">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="math_random_float"></block>
        <block type="math_atan2">
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
    </category>



    <category name="テキスト" categorystyle="text_category">
        <block type="text"></block>
        <block type="text_multiline"></block>
        <block type="text_join"></block>
        <block type="text_append">
            <value name="TEXT">
                <shadow type="text"></shadow>
            </value>
        </block>
        <block type="text_length">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_isEmpty">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>
            </value>
        </block>
        <block type="text_indexOf">
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR">text</field>
                </block>
            </value>
            <value name="FIND">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_charAt">
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR">text</field>
                </block>
            </value>
        </block>
        <block type="text_getSubstring">
            <value name="STRING">
                <block type="variables_get">
                    <field name="VAR">text</field>
                </block>
            </value>
        </block>
        <block type="text_changeCase">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_trim">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_count">
            <value name="SUB">
                <shadow type="text"></shadow>
            </value>
            <value name="TEXT">
                <shadow type="text"></shadow>
            </value>
        </block>
        <block type="text_replace">
            <value name="FROM">
                <shadow type="text"></shadow>
            </value>
            <value name="TO">
                <shadow type="text"></shadow>
            </value>
            <value name="TEXT">
                <shadow type="text"></shadow>
            </value>
        </block>
        <block type="text_reverse">
            <value name="TEXT">
                <shadow type="text"></shadow>
            </value>
        </block>

        <label text="Input/Output:"></label>
        <block type="text_print">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <!--
        <block type="text_prompt_ext">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        -->
        <block type="input_text">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">入力する文字</field>
                </shadow>
            </value>
            <value name="INTERVAL">
                <block type="math_number">
                    <field name="NUM">5</field>
                </block>
            </value>
        </block>
    </category>



    <category name="リスト" categorystyle="list_category">
        <block type="lists_create_with">
            <mutation items="0"></mutation>
        </block>
        <block type="lists_create_with"></block>
        <block type="lists_repeat">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
        <block type="lists_length"></block>
        <block type="lists_isEmpty"></block>
        <block type="lists_indexOf">
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR">list</field>
                </block>
            </value>
        </block>
        <block type="lists_getIndex">
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR">list</field>
                </block>
            </value>
        </block>
        <block type="lists_setIndex">
            <value name="LIST">
                <block type="variables_get">
                    <field name="VAR">list</field>
                </block>
            </value>
        </block>
        <block type="lists_getSublist">
            <value name="LIST">
                <block type="variables_get">
                    <field name="VAR">list</field>
                </block>
            </value>
        </block>
        <block type="lists_split">
            <value name="DELIM">
                <shadow type="text">
                    <field name="TEXT">,</field>
                </shadow>
            </value>
        </block>
        <block type="lists_sort"></block>
        <block type="lists_reverse"></block>
    </category>


    <sep></sep>


    <category name="プロファイル"></category>


    <category name="トリガー">
        <label text="トリガーの状態取得"></label>
        <block type="trigger_is_pressed"></block>

        <label text="トリガーの値を取得"></label>
        <block type="trigger_as_key"></block>
        <block type="trigger_as_controller"></block>

        <label text="トリガーの種類取得"></label>
        <block type="trigger_is_keyboard"></block>
        <block type="trigger_is_mouse"></block>
        <block type="trigger_is_keyboard_or_mouse"></block>
        <block type="trigger_is_controller"></block>

        <label text="テンプレート"></label>
        <label text="トリガーが押されている間ループ"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="controls_whileUntil">
            <field name="MODE">WHILE</field>
            <value name="BOOL">
                <block type="trigger_is_pressed">
                    <field name="DROPDOWN">PRESSED</field>
                </block>
            </value>
        </block>
    </category>


    <category name="キーボード／マウス">
        <label text="キーボード／マウスを押す・離す"></label>
        <block type="down_up">
            <field name="BEHAVIOR">Down</field>
            <value name="KEY">
            <block type="keys">
                <field name="VALUE">A</field>
            </block>
            </value>
        </block>
        <block type="down_up">
            <field name="BEHAVIOR">Up</field>
            <value name="KEY">
            <block type="keys">
                <field name="VALUE">A</field>
            </block>
            </value>
        </block>
        <block type="down_up">
            <field name="BEHAVIOR">Down</field>
            <value name="KEY">
                <block type="keys">
                    <field name="VALUE">A</field>
                </block>
            </value>
            <next>
                <block type="wait">
                    <field name="UNIT">MILLISECONDS</field>
                    <value name="WAIT_TIME">
                        <block type="math_number">
                            <field name="NUM">10</field>
                        </block>
                    </value>
                    <next>
                        <block type="down_up">
                            <field name="BEHAVIOR">Up</field>
                            <value name="KEY">
                                <block type="keys">
                                    <field name="VALUE">A</field>
                                </block>
                            </value>
                            <next>
                                <block type="wait">
                                    <field name="UNIT">MILLISECONDS</field>
                                    <value name="WAIT_TIME">
                                        <block type="math_number">
                                            <field name="NUM">10</field>
                                        </block>
                                    </value>
                                </block>
                            </next>
                        </block>
                    </next>
                </block>
            </next>
        </block>
        
        <label text=""></label>
        <label text="キーボード／マウスを押して離す"></label>
        <block type="tap">
            <value name="KEY1">
                <block type="keys">
                    <field name="VALUE">A</field>
                </block>
            </value>
            <value name="WAIT1">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
            <value name="WAIT2">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
        </block>

        <label text=""></label>
        <label text="キーボード／マウスをすべて離す"></label>
        <block type="up_all">
            <value name="EXCLUDED_KEYS">
                <block type="lists_create_with">
                    <mutation items="0"></mutation>
                </block>
            </value>
        </block>

        <label text=""></label>
        <label text="マウス移動（絶対座標）"></label>
        <block type="mouse_move">
            <field name="SPEED">WARP</field>
            <value name="POINT">
                <block type="point">
                    <value name="X">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                    </value>
                    <value name="Y">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                    </value>
                </block>
            </value>
        </block>
        <block type="mouse_set_origin_point">
            <value name="ORIGIN">
                <block type="point">
                    <value name="X">
                        <block type="math_number">
                        <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="Y">
                        <block type="math_number">
                        <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </value>
        </block>
        <block type="mouse_set_random_offset_range">
            <value name="X">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
            <value name="Y">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
        </block>
        <block type="random_point">
            <value name="X_FROM">
                <block type="math_number">
                    <field name="NUM">-10</field>
                </block>
            </value>
            <value name="X_TO">
                <block type="math_number">
                    <field name="NUM">10</field>
                </block>
            </value>
            <value name="Y_FROM">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
            <value name="Y_TO">
                <block type="math_number">
                    <field name="NUM">100</field>
                </block>
            </value>
        </block>

        <label text=""></label>
        <label text="マウス移動（相対座標）"></label>
        <block type="mouse_move_relative">
            <field name="SPEED">WARP</field>
            <value name="DX">
            <block type="math_number">
                <field name="NUM">0</field>
            </block>
            </value>
            <value name="DY">
            <block type="math_number">
                <field name="NUM">0</field>
            </block>
            </value>
        </block>

        <label text=""></label>
        <label text="マウスカーソルの座標"></label>
        <block type="mouse_get_point"></block>
        <block type="get_point_property">
            <field name="DROPDOWN">x</field>
            <value name="POINT">
                <block type="mouse_get_point"></block>
            </value>
        </block>
        <block type="get_point_property">
            <field name="DROPDOWN">y</field>
            <value name="POINT">
                <block type="mouse_get_point"></block>
            </value>
        </block>

        <label text=""></label>
        <label text="マウスのスクロール"></label>
        <block type="scroll">
            <field name="direction">down</field>
            <value name="DELTA">
                <block type="math_number">
                    <field name="NUM">120</field>
                </block>
            </value>
        </block>
        </block>

        <label text=""></label>
        <label text="キー／マウスの状態"></label>
        <block type="key_is_pressed">
            <value name="KEY">
                <block type="keys">
                    <field name="VALUE">A</field>
                </block>
            </value>
        </block>
        <block type="physical_key_is_pressed">
            <value name="KEY">
                <block type="keys">
                    <field name="VALUE">A</field>
                </block>
            </value>
        </block>
        <block type="keys_are_pressed">
            <field name="DROPDOWN">SOME_PRESSED</field>
            <value name="KEY_ARRAY">
                <block type="lists_create_with" inline="true">
                    <mutation items="2"></mutation>
                    <value name="ADD0">
                        <block type="keys">
                            <field name="VALUE">A</field>
                        </block>
                    </value>
                    <value name="ADD1">
                        <block type="keys">
                            <field name="VALUE">B</field>
                        </block>
                    </value>
                </block>
            </value>
        </block>
        
        <!--
        <label text=""></label>
        <label text="イベント"></label>
        <block type="key_event"></block>
        -->

        <label text="テキストの入力"></label>
        <block type="input_text">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">入力する文字</field>
                </shadow>
            </value>
            <value name="INTERVAL">
                <block type="math_number">
                    <field name="NUM">5</field>
                </block>
            </value>
        </block>

        <label text=""></label>
        <label text="記録した入力の再生"></label>
        <block type="replay">
            <value name="PATH">
                <block type="text">
                    <field name="TEXT">c:\\keytokey\\記録ファイル.kilog</field>
                </block>
            </value>
        </block>

        <label text=""></label>
        <label text="テンプレート"></label>
        <!-- LCtrl+C -->
        <label text="Control + C"></label>
        <block type="down_up">
            <field name="BEHAVIOR">Down</field>
            <value name="KEY">
                <block type="keys">
                    <field name="VALUE">LControlKey</field>
                </block>
            </value>
            <next>
                <block type="tap">
                    <value name="KEY1">
                        <block type="keys">
                            <field name="VALUE">C</field>
                        </block>
                    </value>
                    <value name="WAIT1">
                        <block type="math_number">
                            <field name="NUM">10</field>
                        </block>
                    </value>
                    <value name="WAIT2">
                        <block type="math_number">
                            <field name="NUM">10</field>
                        </block>
                    </value>
                    <next>
                        <block type="down_up">
                            <field name="BEHAVIOR">Up</field>
                            <value name="KEY">
                                <block type="keys">
                                    <field name="VALUE">LControlKey</field>
                                </block>
                            </value>
                        </block>
                    </next>
                </block>
            </next>
        </block>

        <!-- LCtrl+LShift+D -->
        <label text="Control + Shift + D"></label>
        <block type="down_up">
            <field name="BEHAVIOR">Down</field>
            <value name="KEY">
                <block type="keys">
                    <field name="VALUE">LControlKey</field>
                </block>
            </value>
            <next>
                <block type="down_up">
                    <field name="BEHAVIOR">Down</field>
                    <value name="KEY">
                        <block type="keys">
                            <field name="VALUE">LShiftKey</field>
                        </block>
                    </value>
                    <next>
                        <block type="tap">
                            <value name="KEY1">
                                <block type="keys">
                                    <field name="VALUE">D</field>
                                </block>
                            </value>
                            <value name="WAIT1">
                                <block type="math_number">
                                    <field name="NUM">10</field>
                                </block>
                            </value>
                            <value name="WAIT2">
                                <block type="math_number">
                                    <field name="NUM">10</field>
                                </block>
                            </value>
                            <next>
                                <block type="down_up">
                                    <field name="BEHAVIOR">Up</field>
                                    <value name="KEY">
                                        <block type="keys">
                                            <field name="VALUE">LShiftKey</field>
                                        </block>
                                    </value>
                                    <next>
                                        <block type="down_up">
                                            <field name="BEHAVIOR">Up</field>
                                            <value name="KEY">
                                                <block type="keys">
                                                    <field name="VALUE">LControlKey</field>
                                                </block>
                                            </value>
                                        </block>
                                    </next>
                                </block>
                            </next>
                        </block>
                    </next>
                </block>
            </next>
        </block>

        <label text="マウス移動の原点座標をウィンドウの左上に設定"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="mouse_set_origin_point">
            <value name="ORIGIN">
                <block type="window_get_property">
                    <field name="DROPDOWN">POINT</field>
                    <value name="WINDOW">
                        <block type="get_window">
                            <field name="DROPDOWN">ACTIVE</field>
                        </block>
                    </value>
                </block>
            </value>
        </block>

        <label text="　"></label>
        <label text="　"></label>
        <label text="　"></label>
        <label text="　"></label>

    </category>



    <category name="待機">
        <label text="通常待機"></label>
        <block type="wait">
            <value name="WAIT_TIME">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
        </block>
        <label text="高精度／高負荷"></label>
        <block type="highprecision_wait">
            <value name="WAIT_TIME">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
        </block>
        <label text="キーの入力を待つ"></label>
        <block type="wait_for_input">
            <value name="KEY">
                <block type="keys">
                    <field name="VALUE">A</field>
                </block>
            </value>
        </block>
        <label text="コントローラーの入力を待つ"></label>
        <block type="wait_for_controller">
            <value name="BUTTON">
                <block type="controller_buttons">
                    <field name="VALUE">A</field>
                </block>
            </value>
        </block>
    </category>



    <category name="javascript">
        <block type="embedded_multiline_javascript"></block>
        <block type="embedded_singleline_javascript"></block>
        <block type="json_stringify"></block>
        <block type="formatted_json_stringify"></block>
    </category>



    <category name="コントローラー">
        <label text="現在設定中のコントローラー"></label>
        <block type="controller"></block>
        <block type="xinput_controller"></block>

        <label text="コントローラーの情報"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="controller_proeprty">
            <field name="DROPDOWN">IS_CONNECTED</field>
            <value name="CONTROLLER">
                <block type="controller"></block>
            </value>
        </block>

        <label text="スティック"></label>
        <block type="controller_stick_property">
            <value name="CONTROLLER">
                <block type="controller"></block>
            </value>
        </block>

        <label text="トリガー（コントローラー）"></label>
        <block type="controller_trigger_property">
            <value name="CONTROLLER">
                <block type="controller"></block>
            </value>
        </block>

        <label text="ボタンやスティックが押されてるかどうか"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="is_controller_pressed">
            <field name="DROPDOWN">PRESSED</field>
            <value name="CONTROLLER">
                <block type="controller"></block>
            </value>
            <value name="BUTTON">
                <block type="controller_buttons">
                    <field name="VALUE">A</field>
                </block>
            </value>
        </block>

        <label text="テンプレート"></label>
        <label text="テンプレート"></label>
    </category>

    <category name="画像認識">

        <label text="画像認識を実行し結果を取得"></label>
        <block type="template_matching_match_by_id">
            <value name="IDENTIFIER">
                <block type="text">
                    <field name="TEXT">識別キー</field>
                </block>
            </value>
        </block>

        <label text="画像認識の実行結果の値"></label>
        <block type="template_matching_result_properties">
            <field name="DROPDOWN">IS_SUCCESS</field>
            <value name="RESULT">
                <block type="variables_get">
                    <field name="VAR">結果</field>
                </block>
            </value>
        </block>

        <label text="見つかった画像情報の値"></label>
        <block type="template_matching_found_image_properties"></block>
        <block xmlns="https://developers.google.com/blockly/xml" type="template_matching_found_image_properties">
            <field name="DROPDOWN">FOUND_POINT_CENTER</field>
            <value name="RESULT">
                <block type="template_matching_result_properties">
                    <field name="DROPDOWN">FOUND_FIRST_IMAGE</field>
                    <value name="RESULT">
                        <block type="variables_get">
                            <field name="VAR" id="2}oH}@8I#0H8^Fq/U8Zj">結果</field>
                        </block>
                    </value>
                </block>
            </value>
        </block>

        <label text="テンプレート"></label>
        <label text="画像認識を実行し画像を一つ探す"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="variables_set">
            <field name="VAR" id="2}oH}@8I#0H8^Fq/U8Zj">結果</field>
            <value name="VALUE">
                <block type="template_matching_match_by_id">
                    <field name="DROPDOWN">MULTIPLE</field>
                    <value name="IDENTIFIER">
                        <block type="text">
                            <field name="TEXT">識別キー</field>
                        </block>
                    </value>
                </block>
            </value>
            <next>
                <block type="controls_if">
                    <mutation else="1"></mutation>
                    <value name="IF0">
                        <block type="template_matching_result_properties">
                            <field name="DROPDOWN">IS_SUCCESS</field>
                            <value name="RESULT">
                                <block type="variables_get">
                                    <field name="VAR" id="2}oH}@8I#0H8^Fq/U8Zj">結果</field>
                                </block>
                            </value>
                        </block>
                    </value>
                    <statement name="DO0">
                        <block type="mouse_move">
                            <field name="SPEED">WARP</field>
                            <value name="POINT">
                                <block type="template_matching_found_image_properties">
                                    <field name="DROPDOWN">FOUND_POINT_CENTER</field>
                                    <value name="RESULT">
                                        <block type="template_matching_result_properties">
                                            <field name="DROPDOWN">FOUND_FIRST_IMAGE</field>
                                            <value name="RESULT">
                                                <block type="variables_get">
                                                    <field name="VAR" id="2}oH}@8I#0H8^Fq/U8Zj">結果</field>
                                                </block>
                                            </value>
                                        </block>
                                    </value>
                                </block>
                            </value>
                        </block>
                    </statement>
                    <statement name="ELSE">
                        <block type="console_log">
                            <value name="VALUE">
                                <block type="text">
                                    <field name="TEXT">見つからなかった</field>
                                </block>
                            </value>
                        </block>
                    </statement>
                </block>
            </next>
        </block>

        <label text="画像認識を実行し画像を複数探す"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="variables_set">
            <field name="VAR" id="2}oH}@8I#0H8^Fq/U8Zj">結果</field>
            <value name="VALUE">
                <block type="template_matching_match_by_id">
                    <field name="DROPDOWN">MULTIPLE</field>
                    <value name="IDENTIFIER">
                        <block type="text">
                            <field name="TEXT">識別キー</field>
                        </block>
                    </value>
                </block>
            </value>
            <next>
                <block type="controls_if">
                    <mutation else="1"></mutation>
                    <value name="IF0">
                        <block type="template_matching_result_properties">
                            <field name="DROPDOWN">IS_SUCCESS</field>
                            <value name="RESULT">
                                <block type="variables_get">
                                    <field name="VAR" id="2}oH}@8I#0H8^Fq/U8Zj">結果</field>
                                </block>
                            </value>
                        </block>
                    </value>
                    <statement name="DO0">
                        <block type="for_of">
                            <field name="VARIABLE" id="^aNAoR-zu93J(_6BRE4]">画像情報</field>
                            <value name="LIST">
                                <block type="template_matching_result_properties">
                                    <field name="DROPDOWN">FOUND_ALL_IMAGES</field>
                                    <value name="RESULT">
                                        <block type="variables_get">
                                            <field name="VAR" id="2}oH}@8I#0H8^Fq/U8Zj">結果</field>
                                        </block>
                                    </value>
                                </block>
                            </value>
                            <statement name="STATEMENT">
                                <block type="mouse_move">
                                    <field name="SPEED">WARP</field>
                                    <value name="POINT">
                                        <block type="template_matching_found_image_properties">
                                            <field name="DROPDOWN">FOUND_POINT_CENTER</field>
                                            <value name="RESULT">
                                                <block type="variables_get">
                                                    <field name="VAR" id="^aNAoR-zu93J(_6BRE4]">画像情報</field>
                                                </block>
                                            </value>
                                        </block>
                                    </value>
                                </block>
                            </statement>
                        </block>
                    </statement>
                    <statement name="ELSE">
                        <block type="console_log">
                            <value name="VALUE">
                                <block type="text">
                                    <field name="TEXT">見つからなかった</field>
                                </block>
                            </value>
                        </block>
                    </statement>
                </block>
            </next>
        </block>
    </category>

    <category name="仮想コントローラー">
        <category name="マッピング">
            <label text="マッピングの一時停止と再開"></label>
            <block type="mapping_suspend_resume"></block>

            <label text="簡易入力のリスト"></label>
            <block type="mapping_input_list"></block>

            <label text="手動入力のリスト"></label>
            <block type="mapping_target"></block>
            <block xmlns="https://developers.google.com/blockly/xml" type="lists_create_with" inline="true">
                <mutation items="2"></mutation>
                <value name="ADD0">
                    <block type="mapping_target">
                        <field name="VALUE">A</field>
                    </block>
                </value>
                <value name="ADD1">
                    <block type="mapping_target">
                        <field name="VALUE">B</field>
                    </block>
                </value>
            </block>
        </category>

        <category name="XInput">
            <label text="押す・離す"></label>
            <block type="virtual_xinput_down_up"></block>
            <block xmlns="https://developers.google.com/blockly/xml" type="virtual_xinput_tap">
                <field name="DEVICE_NUMBER">0</field>
                <field name="BUTTON">A</field>
                <value name="WAIT1">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="WAIT2">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
            </block>
            <block type="virtual_xinput_neutralize_dpad"></block>

            <label text="スティックの操作"></label>
            <block type="virtual_xinput_stick_angle1"></block>
            <block xmlns="https://developers.google.com/blockly/xml" type="virtual_xinput_stick_angle2">
                <field name="DEVICE_NUMBER">0</field>
                <field name="STICK">leftStick</field>
                <value name="ANGLE">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="INPUT_RATE">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
            </block>
            <block type="virtual_xinput_stick_value"></block>

            <label text="トリガー（コントローラー）の操作"></label>
            <block type="virtual_xinput_trigger1"></block>
            <block xmlns="https://developers.google.com/blockly/xml" type="virtual_xinput_trigger2">
                <field name="DEVICE_NUMBER">0</field>
                <field name="TRIGGER">leftTrigger</field>
                <value name="INPUT_RATE">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
            </block>

            <label text="状態をリセット"></label>
            <block type="virtual_xinput_reset"></block>

            <label text="テンプレート"></label>
            <label text="スティックを1回転させる"></label>
            <block xmlns="https://developers.google.com/blockly/xml" type="controls_for">
                <field name="VAR" id="vD)!J2F3=1gf2IH_T~d_">角度</field>
                <value name="FROM">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="TO">
                    <shadow type="math_number">
                        <field name="NUM">360</field>
                    </shadow>
                </value>
                <value name="BY">
                    <shadow type="math_number">
                        <field name="NUM">15</field>
                    </shadow>
                </value>
                <statement name="DO">
                    <block type="virtual_xinput_stick_angle2">
                        <field name="DEVICE_NUMBER">0</field>
                        <field name="STICK">leftStick</field>
                        <value name="ANGLE">
                            <block type="variables_get">
                                <field name="VAR" id="vD)!J2F3=1gf2IH_T~d_">角度</field>
                            </block>
                        </value>
                        <value name="INPUT_RATE">
                            <block type="math_number">
                                <field name="NUM">1</field>
                            </block>
                        </value>
                        <next>
                            <block type="highprecision_wait">
                                <value name="WAIT_TIME">
                                    <block type="math_number">
                                        <field name="NUM">5</field>
                                    </block>
                                </value>
                            </block>
                        </next>
                    </block>
                </statement>
            </block>
        </category>


        <category name="DualShock4">
            <label text="押す・離す"></label>
            <block type="virtual_dualshock4_down_up"></block>
            <block xmlns="https://developers.google.com/blockly/xml" type="virtual_dualshock4_tap">
                <field name="DEVICE_NUMBER">0</field>
                <field name="BUTTON">A</field>
                <value name="WAIT1">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="WAIT2">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
            </block>
            <block type="virtual_dualshock4_neutralize_dpad"></block>

            <label text="スティックの操作"></label>
            <block type="virtual_dualshock4_stick_angle1"></block>
            <block xmlns="https://developers.google.com/blockly/xml" type="virtual_dualshock4_stick_angle2">
                <field name="DEVICE_NUMBER">0</field>
                <field name="STICK">leftStick</field>
                <value name="ANGLE">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="INPUT_RATE">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
            </block>
            <block type="virtual_dualshock4_stick_value"></block>

            <label text="トリガー（コントローラー）の操作"></label>
            <block type="virtual_dualshock4_trigger1"></block>
            <block xmlns="https://developers.google.com/blockly/xml" type="virtual_dualshock4_trigger2">
                <field name="DEVICE_NUMBER">0</field>
                <field name="TRIGGER">leftTrigger</field>
                <value name="INPUT_RATE">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
            </block>

            <label text="状態をリセット"></label>
            <block type="virtual_dualshock4_reset"></block>

            <label text="テンプレート"></label>
            <label text="スティックを1回転させる"></label>
            <block xmlns="https://developers.google.com/blockly/xml" type="controls_for">
                <field name="VAR" id="vD)!J2F3=1gf2IH_T~d_">角度</field>
                <value name="FROM">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="TO">
                    <shadow type="math_number">
                        <field name="NUM">360</field>
                    </shadow>
                </value>
                <value name="BY">
                    <shadow type="math_number">
                        <field name="NUM">15</field>
                    </shadow>
                </value>
                <statement name="DO">
                    <block type="virtual_dualshock4_stick_angle2">
                        <field name="DEVICE_NUMBER">0</field>
                        <field name="STICK">leftStick</field>
                        <value name="ANGLE">
                            <block type="variables_get">
                                <field name="VAR" id="vD)!J2F3=1gf2IH_T~d_">角度</field>
                            </block>
                        </value>
                        <value name="INPUT_RATE">
                            <block type="math_number">
                                <field name="NUM">1</field>
                            </block>
                        </value>
                        <next>
                            <block type="highprecision_wait">
                                <value name="WAIT_TIME">
                                    <block type="math_number">
                                        <field name="NUM">5</field>
                                    </block>
                                </value>
                            </block>
                        </next>
                    </block>
                </statement>
            </block>
        </category>

        <!--
        <category name="vJoy">
        </category>
        -->

    </category>

    <category name="ウィンドウ">
        <label text="ウィンドウの取得"></label>
        <block type="get_window"></block>

        <label text="ウィンドウを探す"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="find_window_by">
            <value name="TITLE">
                <block type="text">
                    <field name="TEXT">タイトル</field>
                </block>
            </value>
        </block>

        <label text="ウィンドウの作成"></label>
        <block type="create_window_by_window_handle"></block>

        <label text="ウィンドウの情報を取得"></label>
        <block type="window_get_property"></block>
        <block xmlns="https://developers.google.com/blockly/xml" type="window_get_property">
            <field name="DROPDOWN">POINT</field>
            <value name="WINDOW">
                <block type="get_window"></block>
            </value>
        </block>

        <label text="ウィンドウの情報をコンソールに出力"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="window_dump">
        </block>

        <label text="ウィンドウの座標をセット"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="window_set_point">
            <value name="VALUE">
                <block type="point">
                    <value name="X">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="Y">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </value>
        </block>

        <label text="ウィンドウのサイズをセット"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="window_set_size">
            <value name="VALUE">
                <block type="size">
                    <value name="X">
                        <block type="math_number">
                            <field name="NUM">1920</field>
                        </block>
                    </value>
                    <value name="Y">
                        <block type="math_number">
                            <field name="NUM">1080</field>
                        </block>
                    </value>
                </block>
            </value>
        </block>

        <label text="ウィンドウのタイトルをセット"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="window_set_title">
            <value name="VALUE">
                <block type="text">
                    <field name="TEXT">タイトル</field>
                </block>
            </value>
        </block>

        <label text="ウィンドウのテキストをセット"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="window_set_text">
            <value name="VALUE">
                <block type="text">
                    <field name="TEXT">テキスト</field>
                </block>
            </value>
        </block>

        <label text="ウィンドウに座標とサイズをセット"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="window_set_bounds" inline="false">
            <value name="POINT">
                <block type="point">
                    <value name="X">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="Y">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </value>
            <value name="SIZE">
                <block type="size">
                    <value name="X">
                        <block type="math_number">
                            <field name="NUM">1920</field>
                        </block>
                    </value>
                    <value name="Y">
                        <block type="math_number">
                            <field name="NUM">1080</field>
                        </block>
                    </value>
                </block>
            </value>
        </block>

        <label text="ウィンドウを閉じる"></label>
        <block type="window_close"></block>

        <label text="ウィンドウの最大化／最小化"></label>
        <block type="window_set_state"></block>

        <label text="最小化／最大化されたウィンドウの表示を元に戻す"></label>
        <block type="window_restore"></block>

        <label text="ウィンドウの表示／非表示"></label>
        <block type="window_set_visibility"></block>

        <label text="テンプレート"></label>
        <label text="テンプレート"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="variables_set">
            <field name="VAR" id="W;=5~p}vbgVJ(Ah$.BT2">ウィンドウ</field>
            <value name="VALUE">
                <block type="create_window_by_window_handle">
                    <value name="WINDOW_HANDLE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </value>
            <next>
                <block type="variables_set">
                    <field name="VAR" id="]ZrGM3]S_n]O##+emxQ]">値</field>
                    <value name="VALUE">
                        <block type="window_get_property">
                            <field name="DROPDOWN">POINT</field>
                            <value name="WINDOW">
                                <block type="variables_get">
                                    <field name="VAR" id="W;=5~p}vbgVJ(Ah$.BT2">ウィンドウ</field>
                                </block>
                            </value>
                        </block>
                    </value>
                </block>
            </next>
        </block>

    </category>

 
    <category name="コンソール">
        <block type="console_log"></block>
        <block xmlns="https://developers.google.com/blockly/xml" type="console_log">
            <value name="VALUE">
                <block type="text">
                    <field name="TEXT">コンソールに出力したいテキスト</field>
                </block>
            </value>
        </block>
        <block type="console_clear"></block>
    </category>

    <!--
    <category name="ファイル">
    </category>

    <category name="サウンド">
    </category>
    -->

    <category name="時間">
        <label text="マクロを開始してからの経過時間（ミリ秒）"></label>
        <block type="performance_now"></block>

        <label text="時刻を取得"></label>
        <block type="date_time_now"></block>

        <label text="時刻をテキストとして取得"></label>
        <block type="date_time_to_string"></block>
        
        <label text="時刻の値"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="date_time_property">
            <field name="DROPDOWN">YEAR</field>
            <value name="DATE">
                <block type="date_time_now"></block>
            </value>
        </block>

        <label text="テンプレート"></label>
        <label text="処理にかかった時間の計測"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="variables_set">
            <field name="VAR" id="8xPzdgI,ER6h|=S_Lq2S">計測開始時間</field>
            <value name="VALUE">
                <block type="performance_now"></block>
            </value>
            <next>
                <block type="comment_statement">
                    <field name="COMMENT">メモ：計測したい処理をここに</field>
                    <next>
                        <block type="variables_set">
                            <field name="VAR" id="Dy*v|)nsgFJ_VS}?C$[j">計測終了時間</field>
                            <value name="VALUE">
                                <block type="performance_now"></block>
                            </value>
                            <next>
                                <block type="variables_set">
                                    <field name="VAR" id="r_2?e4eXbrNS-BP,9XM$">経過時間</field>
                                    <value name="VALUE">
                                        <block type="math_arithmetic">
                                            <field name="OP">MINUS</field>
                                            <value name="A">
                                                <shadow type="math_number">
                                                    <field name="NUM">1</field>
                                                </shadow>
                                                <block type="variables_get">
                                                    <field name="VAR" id="Dy*v|)nsgFJ_VS}?C$[j">計測終了時間</field>
                                                </block>
                                            </value>
                                            <value name="B">
                                                <shadow type="math_number">
                                                    <field name="NUM">1</field>
                                                </shadow>
                                                <block type="variables_get">
                                                    <field name="VAR" id="8xPzdgI,ER6h|=S_Lq2S">計測開始時間</field>
                                                </block>
                                            </value>
                                        </block>
                                    </value>
                                    <next>
                                        <block type="console_log">
                                            <value name="VALUE">
                                                <block type="text_join" inline="true">
                                                    <mutation items="2"></mutation>
                                                    <value name="ADD0">
                                                        <block type="text">
                                                            <field name="TEXT">経過時間(ms)：</field>
                                                        </block>
                                                    </value>
                                                    <value name="ADD1">
                                                        <block type="variables_get">
                                                            <field name="VAR" id="r_2?e4eXbrNS-BP,9XM$">経過時間</field>
                                                        </block>
                                                    </value>
                                                </block>
                                            </value>
                                        </block>
                                    </next>
                                </block>
                            </next>
                        </block>
                    </next>
                </block>
            </next>
        </block>
    </category>


    <category name="モニター">
        <label text="メインモニターを取得"></label>
        <block type="monitor"></block>

        <label text="すべてのモニターのリストを取得"></label>
        <block type="monitor_list"></block>

        <label text="モニターの情報"></label>
        <block type="monitor_property"></block>

        <label text="モニターの情報をコンソールに出力"></label>
        <block type="monitor_dump"></block>
    </category>


    <category name="IME">
        <label text="現在の変換モード"></label>
        <block type="get_ime_conversion_mode"></block>

        <label text="変換モードの値"></label>
        <block type="ime_conversion_mode"></block>

        <label text="変換モードをセット"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="set_ime_conversion_mode">
            <value name="MODE">
                <block type="ime_conversion_mode">
                    <field name="VALUE">HankakuEisuu</field>
                </block>
            </value>s
        </block>

        <label text="テンプレート"></label>
        <label text="変換モードが半角英数だったら"></label>
        <block xmlns="https://developers.google.com/blockly/xml" type="controls_if">
            <value name="IF0">
                <block type="logic_expression">
                    <field name="operator">EQUAL</field>
                    <value name="LEFT_VALUE">
                        <block type="get_ime_conversion_mode"></block>
                    </value>
                    <value name="RIGHT_VALUE">
                        <block type="ime_conversion_mode">
                            <field name="VALUE">HankakuEisuu</field>
                        </block>
                    </value>
                </block>
            </value>
        </block>
        
    </category>

    <category name="その他">
        <label text="メモ"></label>
        <block type="comment"></block>
        <block type="comment_statement"></block>
    </category>
</xml>
`;
}
