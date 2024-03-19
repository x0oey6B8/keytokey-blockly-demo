import { IFileTempalteGroup } from "../../models/fileTemplate";

const eventTag = "";
export const fileTemplateGroups: IFileTempalteGroup[] = [
    {
        name: "MAIN",
        templates: [
            {
                header: "",
                subHeader: "",
                javascript: `function _E3_81_93_E3_81_93_E3_81_8B_E3_82_89_E5_AE_9F_E8_A1_8C() {}`,
                json: `{"blocks":{"languageVersion":0,"blocks":[{"type":"procedures_defnoreturn","id":"Dbgo[d[^7[-r!epxmf4#","x":50,"y":49,"icons":{"comment":{"text":"この関数の説明…","pinned":false,"height":80,"width":160}},"fields":{"NAME":"ここから実行"}}]}}`,
                type: "MAIN"
            },
        ]
    },
    {
        name: "マクロ",
        templates: [
            {
                header: `${eventTag}マクロが終了したら`,
                subHeader: "end:マクロのメイン処理が終わったら実行されます。",
                javascript: ``,
                json: `{"blocks":{"languageVersion":0,"blocks":[{"type":"event_macro_ended","id":"sM=TKxjPdw{HBsv=eVpc","x":16,"y":-17,"deletable":false}]}}`,
                type: "EVENT_MACRO_ENDED"
            },
        ]
    },
    {
        name: "トリガー",
        templates: [
            {
                header: `${eventTag}トリガーが押されたら`,
                subHeader: "trigger pressed",
                javascript: ``,
                json: `{"blocks":{"languageVersion":0,"blocks":[{"type":"event_trigger_pressed","id":"}^_;B/ym[TcF)6;U}2kd","x":16,"y":-17}]}}`,
                type: "EVENT_TRIGGER_PRESSED"
            },
            {
                header: `${eventTag}トリガーが離されたら`,
                subHeader: "trigger released",
                javascript: ``,
                json: `{"blocks":{"languageVersion":0,"blocks":[{"type":"event_trigger_released","id":"d#+{Y[:D]CO^1.ajOPv)","x":16,"y":-17}]}}`,
                type: "EVENT_TRIGGER_RELEASED"
            },
        ]
    },
    {
        name: "キー／マウス",
        templates: [
            {
                header: `${eventTag}キーが押されたら`,
                subHeader: "key pressed",
                javascript: ``,
                json: `{"blocks":{"languageVersion":0,"blocks":[{"type":"event_key_pressed","id":"colR%))R?sSdbm4t,vB3","x":16,"y":-17,"fields":{"KEY":{"id":"pzH?hx9HqkK0l/~|.@l6"}},"inputs":{"STATEMENT":{"block":{"type":"controls_if","id":";:v,N*]4iQ6AMCDH1OOm","inputs":{"IF0":{"block":{"type":"logic_expression","id":"V1QxLOwRWb1x--+eM:Tw","fields":{"operator":"EQUAL"},"inputs":{"LEFT_VALUE":{"block":{"type":"variables_get","id":")!{K|Wsx43klMtI|Gy$h","fields":{"VAR":{"id":"pzH?hx9HqkK0l/~|.@l6"}}}},"RIGHT_VALUE":{"block":{"type":"keys","id":"K+[Z+OG^.BUL4zbO2^%/","fields":{"VALUE":"A"}}}}}}}}}}}]},"variables":[{"name":"押されたキー","id":"pzH?hx9HqkK0l/~|.@l6"}]}`,
                type: "EVENT_KEY_PRESSED"
            },
            {
                header: `${eventTag}キーが離されたら`,
                subHeader: "key released",
                javascript: ``,
                json: `{"blocks":{"languageVersion":0,"blocks":[{"type":"event_key_released","id":"mcYln#~6W^X*cd0#5YuI","x":16,"y":-17,"fields":{"KEY":{"id":"i2a]rV[0kc$TVm/xRPTm"}},"inputs":{"STATEMENT":{"block":{"type":"controls_if","id":";:v,N*]4iQ6AMCDH1OOm","inputs":{"IF0":{"block":{"type":"logic_expression","id":"V1QxLOwRWb1x--+eM:Tw","fields":{"operator":"EQUAL"},"inputs":{"LEFT_VALUE":{"block":{"type":"variables_get","id":"?Ed8zPQY3yyly/I^cUMB","fields":{"VAR":{"id":"i2a]rV[0kc$TVm/xRPTm"}}}},"RIGHT_VALUE":{"block":{"type":"keys","id":"K+[Z+OG^.BUL4zbO2^%/","fields":{"VALUE":"A"}}}}}}}}}}}]},"variables":[{"name":"離されたキー","id":"i2a]rV[0kc$TVm/xRPTm"}]}`,
                type: "EVENT_KEY_RELEASED"
            },
            {
                header: `${eventTag}マウスが移動したら`,
                subHeader: "mouse moved",
                javascript: ``,
                json: ``,
                type: "EVENT_MOUSE_MOVED"
            },
        ]
    }
]