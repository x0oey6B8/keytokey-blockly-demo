import Blockly from "blockly";

export const StatementPrefix = {
    NONE: 0,
    THROW_INTERUPPTED_EXCEPTION: 1,
    HIGHLIGHT_BLOCK: 2,
}

export function setStatementPrefix(javascriptGenerator, prefix) {
    if (prefix == StatementPrefix.THROW_INTERUPPTED_EXCEPTION) {
        javascriptGenerator.STATEMENT_PREFIX = 'throwIntrupptedError();\n';
    } else if (prefix == StatementPrefix.HIGHLIGHT_BLOCK) {
        javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    } else {
        javascriptGenerator.STATEMENT_PREFIX = '';
    }
}

export function defineCodeGenerator(javascriptGenerator) {

    javascriptGenerator['comment'] = function (block) {
        var comment = block.getFieldValue('COMMENT');
        var code = `/*\n${comment}\n*/\n`;
        return code;
    };

    javascriptGenerator['run_js'] = function (block) {
        const value_name = block.getFieldValue("CODE") + "\n";
        return value_name;
    };

    javascriptGenerator['evaluate_js'] = function (block) {
        const value_name = block.getFieldValue("CODE");
        return [value_name, javascriptGenerator.ORDER_ATOMIC];
    };

    javascriptGenerator["entrypoint"] = function (block) {
        var statements__entry = javascriptGenerator.statementToCode(block, " Entry");
        var code = `[Action]\nvoid Main()\n{\n${statements__entry}}\n`;
        return code;
    };

    javascriptGenerator['key_event'] = function (block) {
        var dropdown_behavior = block.getFieldValue('BEHAVIOR');
        var variable_key = javascriptGenerator.nameDB_.getName(block.getFieldValue('KEY'), Blockly.Names.NameType.VARIABLE);
        var statement = javascriptGenerator.statementToCode(block, 'STAMEMENT');
        var code = `Events.subscribe("${dropdown_behavior}", e => {\n`;
        code += `  ${variable_key} = e.Key;\n`;
        code += statement;
        code += "});\n";
        return code;
    };

    javascriptGenerator['trigger_is_pressed'] = function (block) {
        return ["Trigger.IsPressed", javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator['logic_expression'] = function (block) {
        var left = javascriptGenerator.valueToCode(block, 'LEFT_VALUE', javascriptGenerator.ORDER_ATOMIC);
        var right = javascriptGenerator.valueToCode(block, 'RIGHT_VALUE', javascriptGenerator.ORDER_ATOMIC);
        var operator = block.getFieldValue('operator');
        //var code = `${left} ${operator} ${right}`;
        var code = `${left} === ${right}`;
        return [code, javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator['down_up'] = function (block) {
        var value_key = javascriptGenerator.valueToCode(block, 'KEY', javascriptGenerator.ORDER_NONE);
        var dropdown_behavior = block.getFieldValue('BEHAVIOR').toString().toLowerCase();
        var number_wait = javascriptGenerator.valueToCode(block, 'WAIT', javascriptGenerator.ORDER_NONE);
        var code = `${dropdown_behavior}(${value_key}, ${number_wait});\n`;
        return code;
    };

    javascriptGenerator['tap'] = function (block) {
        var value_key = javascriptGenerator.valueToCode(block, 'KEY1', javascriptGenerator.ORDER_NONE);
        var value_wait1 = javascriptGenerator.valueToCode(block, 'WAIT1', javascriptGenerator.ORDER_ATOMIC);
        var value_wait2 = javascriptGenerator.valueToCode(block, 'WAIT2', javascriptGenerator.ORDER_ATOMIC);
        return `tap(${value_key}, ${value_wait1}, ${value_wait2});\n`;
    };

    javascriptGenerator['keys_value'] = function (block) {
        var dropdown_value = block.getFieldValue('VALUE');
        return [`Keys.${dropdown_value}`, javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator['up_all'] = function (block) {
        var value_excluded_keys = javascriptGenerator.valueToCode(block, 'EXCLUDED_KEYS', javascriptGenerator.ORDER_ATOMIC);
        var code = `upAll(${value_excluded_keys});\n`;
        return code;
    };

    javascriptGenerator['point'] = function (block) {
        const value_x = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const value_y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);
        const code = `{ x: ${value_x}, y: ${value_y} }`;
        return [code, javascriptGenerator.ORDER_ATOMIC];
    };

    javascriptGenerator['get_point'] = function (block) {
        var value_point = javascriptGenerator.valueToCode(block, 'POINT', javascriptGenerator.ORDER_ATOMIC);
        var property = block.getFieldValue('DROPDOWN');
        var code = `${value_point}.${property}`;
        return [code, javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator['get_cursor_point'] = function (block) {
        var code = `mouse.getCursorPosition()`;
        return [code, javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator['origin_point'] = function (block) {
        var origin = javascriptGenerator.valueToCode(block, 'ORIGIN', javascriptGenerator.ORDER_ATOMIC);
        return `setMoveOrigin(${origin});\n`;
    };

    javascriptGenerator['move_absolute'] = function (block) {
        var value_point = javascriptGenerator.valueToCode(block, 'POINT', javascriptGenerator.ORDER_ATOMIC);
        return `move(${value_point});\n`;
    };

    javascriptGenerator['move_absolute_smoothly'] = function (block) {
        var point = javascriptGenerator.valueToCode(block, 'POINT', javascriptGenerator.ORDER_ATOMIC);
        var speed = block.getFieldValue('SPEED');
        if (speed == "FAST") {

        } else if (speed == "NORMAL") {

        } else if (speed == "SLOW") {

        }
        return `move_smoothly(${point}, "${speed}");\n`;
    };

    javascriptGenerator['move_relative'] = function (block) {
        var value_dx = javascriptGenerator.valueToCode(block, 'DX', javascriptGenerator.ORDER_ATOMIC);
        var value_dy = javascriptGenerator.valueToCode(block, 'DY', javascriptGenerator.ORDER_ATOMIC);
        return `moverel(${value_dx}, ${value_dy});\n`;
    };

    javascriptGenerator['move_relative_smoothly'] = function (block) {
        var x = javascriptGenerator.valueToCode(block, 'DX', javascriptGenerator.ORDER_ATOMIC);
        var y = javascriptGenerator.valueToCode(block, 'DY', javascriptGenerator.ORDER_ATOMIC);
        var speed = block.getFieldValue('SPEED');
        if (speed == "FAST") {

        } else if (speed == "NORMAL") {

        } else if (speed == "SLOW") {

        }
        return `moverel_smoothly({ deltaX: ${x}, deltaY: ${y} }, "${speed}");\n`;
    };

    javascriptGenerator['get_global_variable'] = function (block) {
        var text_global_variable_name = block.getFieldValue('GLOBAL_VARIABLE_NAME');
        var code = `global.variables.${text_global_variable_name}`
        return [code, javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator['wait'] = function (block) {
        var value_wait_time = javascriptGenerator.valueToCode(block, 'WAIT_TIME', javascriptGenerator.ORDER_ATOMIC);
        var unit = block.getFieldValue('UNIT');
        return `wait(${value_wait_time}, "${unit}");\n`;
    };

    javascriptGenerator['highprecision_wait'] = function (block) {
        var value_wait_time = javascriptGenerator.valueToCode(block, 'WAIT_TIME', javascriptGenerator.ORDER_ATOMIC);
        var code = `highprecision_wait(${value_wait_time})\n`;
        return code;
    };
}