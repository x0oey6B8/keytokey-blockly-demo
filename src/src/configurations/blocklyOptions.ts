import { BlocklyOptions } from "blockly";

export const options: BlocklyOptions = {
    renderer: "zelos",
    theme: "myStyle",
    media: "media",
    toolbox: getToolBoxXml(),
    collapse: true,
    comments: true,
    disable: true,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: "start",
    css: true,
    rtl: false,
    scrollbars: true,
    sounds: false,
    oneBasedIndex: true,
    grid: {
        spacing: 36,
        length: 2,
        colour: "#cccccc40",
        snap: true,
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.8,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.05,
    },
    move: {
        drag: true,
        wheel: false,
    },
    plugins: {},
};

function getToolBoxXml(): string {
    return `
<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox">


    <category name="システム" colour="270">
        <block type="main" deletable="false" />
    </category>

    

    <category name="値" colour="10">
        <label text="キーボード／マウス" web-class="ioLabel"></label>
        <button text="値を検索して追加" callbackKey="myFirstButtonPressed"></button>
        <button text="値をキー／マウス入力で追加" callbackKey="myFirstButtonPressed"></button>
        <block type="keys_value">
            <field name="VALUE">A</field>
        </block>
        <label text="数値" web-class="ioLabel"></label>
        <block type="math_number" gap="32">
            <field name="NUM">123</field>
        </block>
        <label text="文字列" web-class="ioLabel"></label>
        <block type="text" gap="32">
            <field name="TEXT">文字列!</field>
        </block>
        <label text="座標" web-class="ioLabel"></label>
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



    <category name="キーボード／マウス" colour="200">
        <label text="押す・離す" web-class="ioLabel"></label>
        <block type="down_up">
            <field name="BEHAVIOR">DOWN</field>
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
        <block type="up_all"></block>

        <label text="マウスの移動（絶対座標）" web-class="ioLabel"></label>
        <block type="origin_point">
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
        <block type="move_absolute">
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
        <block type="move_absolute_smoothly">
            <field name="SPEED">NORMAL</field>
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

        <label text="マウスの移動（相対座標）" web-class="ioLabel"></label>
        <block type="move_relative">
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
        <block type="move_relative_smoothly">
            <field name="SPEED">NORMAL</field>
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

        <label text="マウスカーソルの座標" web-class="ioLabel"></label>
        <block type="get_cursor_point"></block>

        <label text="キー／マウスの状態" web-class="ioLabel"></label>
        <block type="trigger_is_pressed"></block>

        <label text="イベント" web-class="ioLabel"></label>
        <block type="event_block"></block>
    </category>



    <category name="待機" colour="200">
        <label text="通常待機" web-class="ioLabel"></label>
        <block type="wait">
            <value name="WAIT_TIME">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
        </block>
        <label text="高精度／高負荷" web-class="ioLabel"></label>
        <block type="highprecision_wait">
            <value name="WAIT_TIME">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
        </block>
    </category>



    <category name="カスタム">
        <block type="custom_method"></block>
        <block type="get_global_variable"></block>
        <block type="custom_variable"></block>
    </category>



    <category name="条件" categorystyle="logic_category">
        <block type="controls_if"></block>
        <!--<block type="logic_compare"></block>-->
        <block type="logic_expression"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null" disabled="true"></block>
        <block type="logic_ternary"></block>
    </category>



    <category name="ループ" categorystyle="loop_category">
        <block type="controls_repeat_ext">
            <value name="TIMES">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="controls_repeat" disabled="true"></block>
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
        <label text="Input/Output:" web-class="ioLabel"></label>
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



    <sep></sep>



    <category name="変数" categorystyle="variable_category" custom="VARIABLE"></category>



    <category name="関数" categorystyle="procedure_category" custom="PROCEDURE"></category>



    <category name="テンプレート">
        <statement name="SACK">
            <block type="entrypoint">
                <next>
                    <block type="events"></block>
                </next>
            </block>
        </statement>
        <block type="action_tap"></block>
        <block type="variable"></block>
        <block type="statement_loop_by_num"></block>
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
                    <statement name="DO">
                        <block type="events" id="m@i~Mi0XK?TlRAwKK~02">
                            <statement name="NAME">
                                <block type="action_tap" id="4Fce3aFs8O*)~$4jjtx9">
                                    <field name="key">A</field>
                                    <field name="wait1">0</field>
                                    <field name="wait2">0</field>
                                    <field name="NAME">TRUE</field>
                                    <next>
                                        <block type="action_tap" id="7SFS_LvVn|SFduhT1}UN">
                                            <field name="key">A</field>
                                            <field name="wait1">0</field>
                                            <field name="wait2">0</field>
                                            <field name="NAME">TRUE</field>
                                            <next>
                                                <block type="action_tap" id="~F7qiYB2ztNTQp5bj9XA">
                                                    <field name="key">A</field>
                                                    <field name="wait1">0</field>
                                                    <field name="wait2">0</field>
                                                    <field name="NAME">TRUE</field>
                                                </block>
                                            </next>
                                        </block>
                                    </next>
                                </block>
                            </statement>
                        </block>
                    </statement>
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
