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
        spacing: 32,
        length: 3,
        colour: "#bbbbbb45",
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
        <block type="keys_value">
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
        <block type="get_point"></block>
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
        <block type="controls_forEach"></block>
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
        <block type="text_prompt_ext">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
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

    <category name="トリガー">
        <label text=""></label>
        <label text="マクロの実行トリガー"></label>
        <block type="trigger_is_pressed"></block>
    </category>


    <category name="キーボード／マウス">
        <label text="キーボード／マウスを押す・離す"></label>
        <block type="down_up">
            <field name="BEHAVIOR">Down</field>
            <value name="KEY">
            <block type="keys_value">
                <field name="VALUE">A</field>
            </block>
            </value>
            <value name="WAIT">
            <block type="math_number">
                <field name="NUM">0</field>
            </block>
            </value>
        </block>
        <block type="down_up">
            <field name="BEHAVIOR">Up</field>
            <value name="KEY">
            <block type="keys_value">
                <field name="VALUE">A</field>
            </block>
            </value>
            <value name="WAIT">
            <block type="math_number">
                <field name="NUM">0</field>
            </block>
            </value>
        </block>
        <block type="down_up">
            <field name="BEHAVIOR">Down</field>
            <value name="KEY">
                <block type="keys_value">
                    <field name="VALUE">A</field>
                </block>
            </value>
            <value name="WAIT">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
            <next>
                <block type="down_up">
                    <field name="BEHAVIOR">Up</field>
                    <value name="KEY">
                        <block type="keys_value">
                            <field name="VALUE">A</field>
                        </block>
                    </value>
                    <value name="WAIT">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </next>
        </block>
        <block type="tap">
            <value name="KEY1">
                <block type="keys_value">
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
        <block type="up_all"></block>

        <label text=""></label>
        <label text="マウスの移動（絶対座標）"></label>
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
        <label text="マウスの移動（相対座標）"></label>
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
        <block type="get_point">
            <field name="DROPDOWN">X</field>
            <value name="POINT">
                <block type="mouse_get_point"></block>
            </value>
        </block>
        <block type="get_point">
            <field name="DROPDOWN">Y</field>
            <value name="POINT">
                <block type="mouse_get_point"></block>
            </value>
        </block>

        <label text=""></label>
        <label text="キー／マウスの状態"></label>
        <block type="key_is_pressed">
            <value name="KEY">
                <block type="keys_value">
                    <field name="VALUE">A</field>
                </block>
            </value>
        </block>
        <block type="phisical_key_is_pressed">
            <value name="KEY">
                <block type="keys_value">
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
                        <block type="keys_value">
                            <field name="VALUE">A</field>
                        </block>
                    </value>
                    <value name="ADD1">
                        <block type="keys_value">
                            <field name="VALUE">B</field>
                        </block>
                    </value>
                </block>
            </value>
        </block>
        
        <label text=""></label>
        <label text="イベント"></label>
        <block type="key_event"></block>
        

        <label text=""></label>
        <label text="テンプレート"></label>
        <!-- LCtrl+C -->
        <label text="Control + C"></label>
        <block type="down_up">
            <field name="BEHAVIOR">Down</field>
            <value name="KEY">
                <block type="keys_value">
                    <field name="VALUE">LControl</field>
                </block>
            </value>
            <value name="WAIT">
                <block type="math_number">
                    <field name="NUM">10</field>
                </block>
            </value>
            <next>
                <block type="tap">
                    <value name="KEY1">
                        <block type="keys_value">
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
                                <block type="keys_value">
                                    <field name="VALUE">LControl</field>
                                </block>
                            </value>
                            <value name="WAIT">
                                <block type="math_number">
                                    <field name="NUM">10</field>
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
                <block type="keys_value">
                    <field name="VALUE">LControl</field>
                </block>
            </value>
            <value name="WAIT">
                <block type="math_number">
                    <field name="NUM">10</field>
                </block>
            </value>
            <next>
                <block type="down_up">
                    <field name="BEHAVIOR">Down</field>
                    <value name="KEY">
                        <block type="keys_value">
                            <field name="VALUE">LShift</field>
                        </block>
                    </value>
                    <value name="WAIT">
                        <block type="math_number">
                            <field name="NUM">10</field>
                        </block>
                    </value>
                    <next>
                        <block type="tap">
                            <value name="KEY1">
                                <block type="keys_value">
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
                                        <block type="keys_value">
                                            <field name="VALUE">LShift</field>
                                        </block>
                                    </value>
                                    <value name="WAIT">
                                        <block type="math_number">
                                            <field name="NUM">10</field>
                                        </block>
                                    </value>
                                    <next>
                                        <block type="down_up">
                                            <field name="BEHAVIOR">Up</field>
                                            <value name="KEY">
                                                <block type="keys_value">
                                                    <field name="VALUE">LControl</field>
                                                </block>
                                            </value>
                                            <value name="WAIT">
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
    </category>




    <category name="javascript">
        <block type="js"></block>
        <block type="evaluate_js"></block>
    </category>


    <category name="コントローラー">
    </category>


    <category name="仮想コントローラー">
    </category>

    <category name="画像認識">
    </category>

    <category name="ウィンドウ">
    </category>

    <category name="コンソール">
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
        <block type="comment"></block>
        <block type="global_get_variable"></block>
    </category>

    <category name="テンプレート">
        <block type="text_print">
            <value name="TEXT">
                <block type="text">
                    <field name="TEXT">'Twas brillig, and the slithy toves</field>
                </block>
            </value>
            <next>
                <block type="text_print">
                    <value name="TEXT">
                        <block type="text">
                            <field name="TEXT"> Did gyre and gimble in the wabe:</field>
                        </block>
                    </value>
                    <next>
                        <block type="text_print">
                            <value name="TEXT">
                                <block type="text">
                                    <field name="TEXT">All mimsy were the borogroves,</field>
                                </block>
                            </value>
                            <next>
                                <block type="text_print">
                                    <value name="TEXT">
                                        <block type="text">
                                            <field name="TEXT"> And the mome raths outgrabe.</field>
                                        </block>
                                    </value>
                                </block>
                            </next>
                        </block>
                    </next>
                </block>
            </next>
        </block>
        
        <block type="controls_if" id="-i[bNHVL@N)p=l$Bd!p0" x="126" y="90">
            <statement name="DO0">
                <block type="controls_repeat_ext" id="dg2'0eh)p[s48Km3bLlN">
                    <value name="TIMES">
                        <shadow type="math_number" id="WE;;nrs'.H,cm.2e?a+*">
                            <field name="NUM">10</field>
                        </shadow>
                    </value>
                </block>
            </statement>
            <next>
                <block type="text_print" id="21:oC=z'{szruSfwuwG|">
                    <value name="TEXT">
                        <block type="text" id=";pir/uIEZo)8)jqDyGyK">
                            <field name="TEXT">'Twas brillig, and the slithy toves</field>
                        </block>
                    </value>
                    <next>
                        <block type="text_print" id="pUyAKTC!*d[XDR:UphM3">
                            <value name="TEXT">
                                <block type="text" id="k-m49,q~}Po]?,usR$Ln">
                                    <field name="TEXT"> Did gyre and gimble in the wabe:</field>
                                </block>
                            </value>
                            <next>
                                <block type="text_print" id="HEnKrY8^)?._7lLCPo|9">
                                    <value name="TEXT">
                                        <block type="text" id="?@kExHQM?W.IpPOuTxSO">
                                            <field name="TEXT">All mimsy were the borogroves,</field>
                                        </block>
                                    </value>
                                    <next>
                                        <block type="text_print" id="Ou/q^Na0'$^VR7T(5[1R">
                                            <value name="TEXT">
                                                <block type="text" id="x'-kMSbMYFY%bouTGb%5">
                                                    <field name="TEXT"> And the mome raths outgrabe.</field>
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
</xml>
`;
}
