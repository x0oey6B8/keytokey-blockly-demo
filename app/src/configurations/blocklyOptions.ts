import { BlocklyOptions } from "blockly";

export const options: BlocklyOptions = {
    renderer: "zelos",
    theme: "myStyle",
    media: "media",
    toolbox: getToolBoxXml(),
    collapse: true,
    comments: false,
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
        <button text="値を検索して追加" callbackKey="addKeyValue"></button>
        <button text="値をキー／マウス入力で追加" callbackKey="addKeyValue"></button>
        <block type="keys">
            <field name="VALUE">A</field>
        </block>
        
        <label text="コントローラーのボタンやスティック"></label>
        <button text="値を検索して追加" callbackKey="addKeyValue"></button>
        <button text="値をキー／マウス入力で追加" callbackKey="addKeyValue"></button>
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
        <label text="マクロの実行トリガー"></label>
        <block type="trigger_is_pressed"></block>
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
        <block type="js"></block>
        <block type="evaluate_js"></block>
    </category>


    <category name="コントローラー">
        <label text="現在設定中のコントローラー"></label>
        <block type="controller"></block>
        <block type="controller_proeprty"></block>

        <label text="ボタンやスティックが押されているかどうか"></label>
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

        <label text="スティック"></label>
        <block type="controller_stick_property">
            <value name="CONTROLLER">
                <block type="controller"></block>
            </value>
        </block>


        <label text="テンプレート"></label>
        <label text="テンプレート"></label>
    </category>
    <category name="XInputの状態">
    </category>
    <category name="仮想XInput">
    </category>
    <category name="仮想DualShock4">
    </category>
    <category name="仮想vJoy">
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

        <label text="ウィンドウの値を取得"></label>
        <block type="window_get_property"></block>
        <block xmlns="https://developers.google.com/blockly/xml" type="window_get_property">
            <field name="DROPDOWN">POINT</field>
            <value name="WINDOW">
                <block type="get_window"></block>
            </value>
        </block>

        <label text="ウィンドウの値を設定"></label>
        <block type="window_set_property"></block>
        <block type="window_set_bounds"></block>

        <label text="ウィンドウの情報をコンソールに出力"></label>
        <block type="window_dump"></block>

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
        <block type="console_clear"></block>
    </category>

    <category name="ファイル">
    </category>

    <category name="サウンド">
    </category>

    <category name="時間">
    </category>

    <category name="IME">
    </category>

    <category name="モニター">
    </category>

<!--
    <category name="色" categorystyle="colour_category">
        <block type="colour_picker"></block>
        <block type="colour_random"></block>
        <block type="colour_rgb">
            <value name="RED">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="GREEN">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="BLUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="colour_blend">
            <value name="COLOUR1">
                <shadow type="colour_picker">
                    <field name="COLOUR">#ff0000</field>
                </shadow>
            </value>
            <value name="COLOUR2">
                <shadow type="colour_picker">
                    <field name="COLOUR">#3333ff</field>
                </shadow>
            </value>
            <value name="RATIO">
                <shadow type="math_number">
                    <field name="NUM">0.5</field>
                </shadow>
            </value>
        </block>
    </category>
-->

    <category name="その他">
        <label text="メモ"></label>
        <block type="comment"></block>

        <label text="その他"></label>
        <block type="global_get_variable"></block>
    </category>
</xml>
`;
}
