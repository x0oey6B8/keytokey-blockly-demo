import Blockly from "blockly";

export const StatementPrefix = {
    NONE: 0,
    COMMENT_WITH_BLOCK_ID: 1,
    THROW_INTERRUPTED_EXCEPTION: 2,
    HIGHLIGHT_BLOCK: 3,
    CHECK_POINT: 4
}

export function setStatementPrefix(javascriptGenerator, prefix) {
    if (prefix == StatementPrefix.THROW_INTERRUPTED_EXCEPTION) {
        javascriptGenerator.STATEMENT_PREFIX = 'throwIntrupptedError();\n';
    } else if (prefix == StatementPrefix.HIGHLIGHT_BLOCK) {
        javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    } else if (prefix == StatementPrefix.COMMENT_WITH_BLOCK_ID) {
        javascriptGenerator.STATEMENT_PREFIX = '// ⇓ブロックID: %1\n';
    } else if (prefix == StatementPrefix.CHECK_POINT) {
        javascriptGenerator.STATEMENT_PREFIX = 'checkPoint(%1);\n';
    } else {
        javascriptGenerator.STATEMENT_PREFIX = '';
    }
}

export function defineCodeGenerator(javascriptGenerator) {

    javascriptGenerator.forBlock['comment'] = function (block) {
        var comment = block.getFieldValue('COMMENT');
        var code = `/*\n${comment}\n*/\n`;
        return code;
    };

    javascriptGenerator.forBlock['run_js'] = function (block) {
        const value_name = block.getFieldValue("CODE") + "\n";
        return value_name;
    };

    javascriptGenerator.forBlock['evaluate_js'] = function (block) {
        const value_name = block.getFieldValue("CODE");
        return [value_name, javascriptGenerator.ORDER_ATOMIC];
    };

    javascriptGenerator.forBlock["entrypoint"] = function (block) {
        var statements__entry = javascriptGenerator.statementToCode(block, " Entry");
        var code = `[Action]\nvoid Main()\n{\n${statements__entry}}\n`;
        return code;
    };

    javascriptGenerator.forBlock['key_event'] = function (block) {
        var dropdown_behavior = block.getFieldValue('BEHAVIOR');
        var variable_key = javascriptGenerator.nameDB_.getName(block.getFieldValue('KEY'), Blockly.Names.NameType.VARIABLE);
        var statement = javascriptGenerator.statementToCode(block, 'STAMEMENT');
        var code = `Events.subscribe("${dropdown_behavior}", e => {\n`;
        code += `  ${variable_key} = e.Key;\n`;
        code += statement;
        code += "});\n";
        return code;
    };

    javascriptGenerator.forBlock['trigger_is_pressed'] = function (block) {
        return ["isTriggerPressed()", javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator.forBlock['trigger_is_not_pressed'] = function (block) {
        return ["!isTriggerPressed()", javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator.forBlock['logic_expression'] = function (block) {
        var left = javascriptGenerator.valueToCode(block, 'LEFT_VALUE', javascriptGenerator.ORDER_ATOMIC);
        var right = javascriptGenerator.valueToCode(block, 'RIGHT_VALUE', javascriptGenerator.ORDER_ATOMIC);
        var operator = block.getFieldValue('operator');
        //var code = `${left} ${operator} ${right}`;
        var code = `${left} === ${right}`;
        return [code, javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator.forBlock['down_up'] = function (block) {
        var value_key = javascriptGenerator.valueToCode(block, 'KEY', javascriptGenerator.ORDER_NONE);
        var dropdown_behavior = block.getFieldValue('BEHAVIOR').toString().toLowerCase();
        var number_wait = javascriptGenerator.valueToCode(block, 'WAIT', javascriptGenerator.ORDER_NONE);
        var code = `${dropdown_behavior}(${value_key}, ${number_wait});\n`;
        return code;
    };

    javascriptGenerator.forBlock['tap'] = function (block) {
        var value_key = javascriptGenerator.valueToCode(block, 'KEY1', javascriptGenerator.ORDER_NONE);
        var value_wait1 = javascriptGenerator.valueToCode(block, 'WAIT1', javascriptGenerator.ORDER_ATOMIC);
        var value_wait2 = javascriptGenerator.valueToCode(block, 'WAIT2', javascriptGenerator.ORDER_ATOMIC);
        return `tap(${value_key}, ${value_wait1}, ${value_wait2});\n`;
    };

    javascriptGenerator.forBlock['keys_value'] = function (block) {
        var dropdown_value = block.getFieldValue('VALUE');
        return [`Keys.${dropdown_value}`, javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator.forBlock['up_all'] = function (block) {
        var value_excluded_keys = javascriptGenerator.valueToCode(block, 'EXCLUDED_KEYS', javascriptGenerator.ORDER_ATOMIC);
        var code = `upAll(${value_excluded_keys});\n`;
        return code;
    };

    javascriptGenerator.forBlock['point'] = function (block) {
        const value_x = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const value_y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);
        const code = `{ x: ${value_x}, y: ${value_y} }`;
        return [code, javascriptGenerator.ORDER_ATOMIC];
    };

    javascriptGenerator.forBlock['get_point'] = function (block) {
        var value_point = javascriptGenerator.valueToCode(block, 'POINT', javascriptGenerator.ORDER_ATOMIC);
        var property = block.getFieldValue('DROPDOWN');
        var code = `${value_point}.${property}`;
        return [code, javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator.forBlock['random_point'] = function (block) {
        var value_x_from = javascriptGenerator.valueToCode(block, 'X_FROM', javascriptGenerator.ORDER_ATOMIC);
        var value_x_to = javascriptGenerator.valueToCode(block, 'X_TO', javascriptGenerator.ORDER_ATOMIC);
        var value_y_from = javascriptGenerator.valueToCode(block, 'Y_FROM', javascriptGenerator.ORDER_ATOMIC);
        var value_y_to = javascriptGenerator.valueToCode(block, 'Y_TO', javascriptGenerator.ORDER_ATOMIC);
        const code = `getRandomPoint(${value_x_from}, ${value_x_to}, ${value_y_from}, ${value_y_to})`;
        return [code, javascriptGenerator.ORDER_ATOMIC];
    };

    javascriptGenerator.forBlock['set_random_offset_range'] = function (block) {
        var value_x = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        var value_y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);
        var code = `setRandomOffsetRange(${value_x}, ${value_y})\n`;
        return code;
    };

    javascriptGenerator.forBlock['get_cursor_point'] = function (block) {
        var code = `mouse.getCursorPosition()`;
        return [code, javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator.forBlock['origin_point'] = function (block) {
        var origin = javascriptGenerator.valueToCode(block, 'ORIGIN', javascriptGenerator.ORDER_ATOMIC);
        return `setMoveOrigin(${origin});\n`;
    };

    javascriptGenerator.forBlock['move_absolute'] = function (block) {
        var value_point = javascriptGenerator.valueToCode(block, 'POINT', javascriptGenerator.ORDER_ATOMIC);
        return `move(${value_point});\n`;
    };

    javascriptGenerator.forBlock['move_absolute_smoothly'] = function (block) {
        var point = javascriptGenerator.valueToCode(block, 'POINT', javascriptGenerator.ORDER_ATOMIC);
        var speed = block.getFieldValue('SPEED');
        return `moveTo(${point}, "${speed}");\n`;
    };

    javascriptGenerator.forBlock['move_relative'] = function (block) {
        var value_dx = javascriptGenerator.valueToCode(block, 'DX', javascriptGenerator.ORDER_ATOMIC);
        var value_dy = javascriptGenerator.valueToCode(block, 'DY', javascriptGenerator.ORDER_ATOMIC);
        return `moverel(${value_dx}, ${value_dy});\n`;
    };

    javascriptGenerator.forBlock['move_relative_smoothly'] = function (block) {
        var x = javascriptGenerator.valueToCode(block, 'DX', javascriptGenerator.ORDER_ATOMIC);
        var y = javascriptGenerator.valueToCode(block, 'DY', javascriptGenerator.ORDER_ATOMIC);
        var speed = block.getFieldValue('SPEED');
        return `moveRelTo({ x: ${x}, y: ${y} }, "${speed}");\n`;
    };

    javascriptGenerator.forBlock['get_global_variable'] = function (block) {
        var text_global_variable_name = block.getFieldValue('GLOBAL_VARIABLE_NAME');
        var code = `global.variables.${text_global_variable_name}`
        return [code, javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator.forBlock['wait'] = function (block) {
        var value_wait_time = javascriptGenerator.valueToCode(block, 'WAIT_TIME', javascriptGenerator.ORDER_ATOMIC);
        var unit = block.getFieldValue('UNIT');
        return `wait(${value_wait_time}, "${unit}");\n`;
    };

    javascriptGenerator.forBlock['highprecision_wait'] = function (block) {
        var value_wait_time = javascriptGenerator.valueToCode(block, 'WAIT_TIME', javascriptGenerator.ORDER_ATOMIC);
        var code = `highPrecisionWait(${value_wait_time})\n`;
        return code;
    };
}