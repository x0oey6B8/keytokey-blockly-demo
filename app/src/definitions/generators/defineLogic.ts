import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class LOGIC_OPERATION extends BlockCodeGenerator {
    name = "logic_operation";

    constructor(generator: any) {
        super(generator);
    }

    generateCode(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        return v.operator === "AND"
            ? { code: `${v.left} && ${v.right}`, order: "NONE" }
            : { code: `${v.left} || ${v.right}`, order: "NONE" };
    }
    getValues(block: BlockSvg) {
        return {
            left: this.valueToCode(block, 'A', "ATOMIC"),
            right: this.valueToCode(block, 'B', "ATOMIC"),
            operator: this.getFieldValue(block, 'OP'),
        }
    }
}

export class LOGIC_EXPRESSION extends BlockCodeGenerator {
    name = "logic_expression";

    generateCode(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const symbol = this.operatorToSymbol(v.operator);
        const code = `${v.left} ${symbol} ${v.right}`;
        return { code, order: "NONE" };
    }
    getValues(block: BlockSvg) {
        return {
            left: this.valueToCode(block, 'LEFT_VALUE', "ATOMIC"),
            right: this.valueToCode(block, 'RIGHT_VALUE', "ATOMIC"),
            operator: this.getFieldValue(block, 'operator'),
        }
    }

    operatorToSymbol(operator: string) {
        switch (operator) {
            case "GRATER_THAN_OR_EQUAL_TO": return ">=";
            case "LESS_THAN_OR_EQUAL_TO": return "<=";
            case "GRATER_THAN": return ">";
            case "LESS_THAN": return "<";
            case "EQUAL": return "==";
            case "NOT_EQUAL": return "!=";
        }
    }

    generateCommentFromOperator(block: BlockSvg) {
        const v = this.getValues(block);
        switch (v.operator) {
            case "GRATER_THAN_OR_EQUAL_TO": return `${v.left} が ${v.right} 以上の場合`;
            case "LESS_THAN_OR_EQUAL_TO": return `${v.left} が ${v.right} 以下の場合`;
            case "GRATER_THAN": return `${v.left} が ${v.right} より大きい場合`;
            case "LESS_THAN": return `${v.left} が ${v.right} より小さい場合`;
            case "EQUAL": return `${v.left} と ${v.right} が等しい場合`;
            case "NOT_EQUAL": return `${v.left} と ${v.right} 等しくない場合`;
            default: return `${v.left} ${v.operator} ${v.right}`;
        }
    }
}