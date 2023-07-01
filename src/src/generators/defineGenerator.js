import Blockly from "blockly";

export function defineCodeGenerator(javascriptGenerator) {

    javascriptGenerator["entrypoint"] = function (block) {
        var statements__entry = javascriptGenerator.statementToCode(block, " Entry");
        // TODO: Assemble JavaScript into code variable.
        var code = `[Action]\nvoid Main()\n{\n${statements__entry}}\n`;
        return code;
    };

    javascriptGenerator["events"] = function (block) {
        var statements_name = javascriptGenerator.statementToCode(block, "NAME");
        // TODO: Assemble JavaScript into code variable.
        var code = "...;\n";
        return "KeyStatusChanged += (sender, e) =>\n{\n" + statements_name + "};\n";
    };

    javascriptGenerator["action_tap"] = function (block) {
        var text_key = block.getFieldValue("key");
        var wait1 = block.getFieldValue("wait1");
        var wait2 = block.getFieldValue("wait2");
        var isChecked = block.getFieldValue("NAME") == "TRUE";
        // TODO: Assemble JavaScript into code variable.
        var code = "...;\n";
        //return 'Tap(Keys.' + text_key + ', ' + text_wait1 + ', ' + text_wait2 + ', ' + checkbox_name + ');';
        return `Tap(Keys.${text_key}, ${wait1}, ${wait2}, ${isChecked});\n`;
    };

    javascriptGenerator["variable"] = function (block) {
        var value_name = javascriptGenerator.valueToCode(block, "name", javascriptGenerator.ORDER_ATOMIC);
        var value_value = javascriptGenerator.valueToCode(block, "value", javascriptGenerator.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = "...;\n";
        return code;
    };

    javascriptGenerator["statement_loop_by_num"] = function (block) {
        var loopcount = block.getFieldValue("loopCount");
        var blocks = javascriptGenerator.statementToCode(block, "blocks");
        // TODO: Assemble JavaScript into code variable.
        var code = `for (var i = 0; i < ${loopcount}; i++)\n{\n${blocks}}\n`;
        return code;
    };

    javascriptGenerator["main"] = function (block) {
        return "//@start\n";
    };

    javascriptGenerator["event_block"] = function (block) {
        var variable_key = javascriptGenerator.nameDB_.getName(block.getFieldValue("KEY_VARIABLE"), Blockly.Names.NameType.VARIABLE);
        var variable_is_pressed = javascriptGenerator.nameDB_.getName(block.getFieldValue("IS_PRESSED_VARIABLE"), Blockly.Names.NameType.VARIABLE);
        var statements_do = javascriptGenerator.statementToCode(block, "DO");
        var code = "KeyStateChanged += (sender, e) => {\n";
        code += `    ${variable_key} = e.Key;\n`;
        code += `    ${variable_is_pressed} = e.IsPressed;\n`;
        code += statements_do;
        code += "};\n";
        return code;
    };

    javascriptGenerator["custom_method"] = function (block) {
        var method_name = block.getFieldValue("METHOD_NAME");
        var params = javascriptGenerator.valueToCode(block, "PARAMS", Blockly.CSharp.ORDER_ATOMIC) || "[]";

        var code = "public void " + method_name + "(params object[] args)\n";
        code += "{\n";
        code += "    // メソッドのコードをここに記述\n";
        code += "}\n";

        return [code, javascriptGenerator.ORDER_NONE];
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

    javascriptGenerator['keys_value'] = function (block) {
        var dropdown_value = block.getFieldValue('VALUE');
        return [`Keys.${dropdown_value}`, javascriptGenerator.ORDER_NONE];
    };

    javascriptGenerator['up_all1'] = function (block) {
        var value_excluded_keys = javascriptGenerator.valueToCode(block, 'EXCLUDED_KEYS', javascriptGenerator.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = '...;\n';
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
        var code = `
            const p = mouse.getCursorPosition();
            { x: p.X, y: p.Y }
        `;
        return [code, javascriptGenerator.ORDER_ATOMIC];
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

    javascriptGenerator['custom_variable'] = function (block) {
        var name = javascriptGenerator.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
        return [`variables['${name}']`, javascriptGenerator.ORDER_ATOMIC];
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