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
                json: "[]",
                type: "EVENT_TRIGGER_PRESSED"
            },
            {
                header: `${eventTag}トリガーが離されたら`,
                subHeader: "trigger released",
                javascript: ``,
                json: "[]",
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
                json: "[]",
                type: "EVENT_KEY_PRESSED"
            },
            {
                header: `${eventTag}キーが離されたら`,
                subHeader: "key released",
                javascript: ``,
                json: "[]",
                type: "EVENT_KEY_RELEASED"
            },
            {
                header: `${eventTag}マウスが移動したら`,
                subHeader: "mouse moved",
                javascript: ``,
                json: "[]",
                type: "EVENT_MOUSE_MOVED"
            },
        ]
    }
]