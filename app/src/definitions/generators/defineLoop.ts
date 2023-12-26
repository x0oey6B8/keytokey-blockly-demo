import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class FOR_OF extends BlockCodeGenerator {
    name = "for_of";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `for (${v.variableName} of ${v.list}) {\n${v.statement}}\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
    getValues(block: BlockSvg) {

        const list = this.valueToCode(block, "LIST", "ATOMIC");
        const variableName = this.getFieldVaribleName(block, "VARIABLE");
        const statement = this.statementToCode(block, "STATEMENT", "ATOMIC");
        return {
            list,
            variableName,
            statement
        }
    }
}