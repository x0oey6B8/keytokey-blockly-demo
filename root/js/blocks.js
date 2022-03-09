Blockly.defineBlocksWithJsonArray(
    [
        {
            "type": "main",
            "message0": "実行 %1",
            "args0": [
                {
                    "type": "input_statement",
                    "name": "NAME",
                    "align": "RIGHT"
                }
            ],
            "colour": 260,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "entrypoint",
            "message0": "%1",
            "args0": [
                {
                    "type": "input_statement",
                    "name": " Entry"
                }
            ],
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "events",
            "message0": "キー／マウスの状態が変更されたら %1 %2",
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "NAME"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 60,
            "tooltip": "イベント",
            "helpUrl": ""
        },
        {
            "type": "action_tap",
            "message0": "%1 を押した後 %2 %3 ms待機 %4 離した後 %5 ms待機 %6",
            "args0": [
                {
                    "type": "field_input",
                    "name": "key",
                    "text": "A"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "field_input",
                    "name": "wait1",
                    "text": "0"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "field_input",
                    "name": "wait2",
                    "text": "0"
                },
                {
                    "type": "field_checkbox",
                    "name": "NAME",
                    "checked": true
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 210,
            "tooltip": "説明",
            "helpUrl": "URL?"
        },
        {
            "type": "variable",
            "message0": "変数 %1 に %2 を代入",
            "args0": [
                {
                    "type": "input_value",
                    "name": "name",
                    "check": [
                        "ABC",
                        "DEF"
                    ]
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "inputsInline": true,
            "colour": 330,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "statement_loop_by_num",
            "message0": "ループ %1 回 %2 %3",
            "args0": [
                {
                    "type": "field_input",
                    "name": "loopCount",
                    "text": "10"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "blocks"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        },
        // Block for repeat n times (external number).
        {
            "type": "controls_repeat_ext2",
            "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
            "args0": [{
                "type": "input_value",
                "name": "TIMES",
                "check": "Number"
            }],
            "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
            "args1": [{
                "type": "input_statement",
                "name": "DO"
            }],
            "previousStatement": null,
            "nextStatement": null,
            "style": "loop_blocks",
            "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
            "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
        },
        {
            "type": "test",
            "message0": "%1 回繰り返すYO",
            "args0": [
                {
                    "type": "input_value",
                    "name": "a",
                    "check": "Number"
                },
            ],
            "message1": "実行 %1",
            "args1": [
                {
                    "type": "input_statement",
                    "name": "abcdef",
                },
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "loop_blocks",
            "tooltip": "",
            "helpUrl": ""
        }
    ]
);