Blockly.JavaScript['entrypoint'] = function (block) {
    var statements__entry = Blockly.JavaScript.statementToCode(block, ' Entry');
    // TODO: Assemble JavaScript into code variable.
    var code = `[Action]\nvoid Main()\n{\n${statements__entry}}\n`;
    return code;
};

Blockly.JavaScript['events'] = function (block) {
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return 'KeyStatusChanged += (sender, e) =>\n{\n' + statements_name + '};\n';
};

Blockly.JavaScript['action_tap'] = function (block) {
    var text_key = block.getFieldValue('key');
    var wait1 = block.getFieldValue('wait1');
    var wait2 = block.getFieldValue('wait2');
    var isChecked = block.getFieldValue('NAME') == 'TRUE';
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    //return 'Tap(Keys.' + text_key + ', ' + text_wait1 + ', ' + text_wait2 + ', ' + checkbox_name + ');';
    return `Tap(Keys.${text_key}, ${wait1}, ${wait2}, ${isChecked});\n`;
};

Blockly.JavaScript['variable'] = function (block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
};

Blockly.JavaScript['statement_loop_by_num'] = function (block) {
    var loopcount = block.getFieldValue('loopCount');
    var blocks = Blockly.JavaScript.statementToCode(block, 'blocks');
    // TODO: Assemble JavaScript into code variable.
    var code = `for (var i = 0; i < ${loopcount}; i++)\n{\n${blocks}}\n`;
    return code;
};

Blockly.JavaScript['main'] = function (block) {
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    var code = `[Action]\nvoid Execute(){\n${statements_name}}\n`;
    return code;
};