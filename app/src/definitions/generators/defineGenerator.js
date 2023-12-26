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

export function valueToCode(generator, block, key, order) {
    return generator.valueToCode(block, key, order);
}

export function statementToCode(generator, block, key, order) {
    return generator.statementToCode(block, key, order);
}

export function getVariableName(generator, field_value) {
    return generator.getVariableName(field_value);
}

export function registerDefinition(generator, name, callback) {
    generator.forBlock[name] = callback;
}

export function getBlockCallback(generator, name) {
    return generator.forBlock[name];
}

export function defineCodeGenerator(javascriptGenerator) {
    javascriptGenerator.forBlock['js'] = function (block) {
        const value_name = block.getFieldValue("CODE") + "\n";
        return value_name;
    };

    javascriptGenerator.forBlock['evaluate_js'] = function (block) {
        const value_name = block.getFieldValue("CODE");
        return [value_name, javascriptGenerator.ORDER_ATOMIC];
    };
}