import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class CONSOLE_LOG extends BlockCodeGenerator {
    name = "console_log";
    generateCode(block: BlockSvg): GeneratedCode {
        const value = this.valueToCode(block, "VALUE", "ATOMIC");
        const code = `console.log(${value});\n`;
        return { code, order: "RAW" };
    }
}

export class CONSOLE_SEPARATE extends BlockCodeGenerator {
    name = "console_separate";
    generateCode(): GeneratedCode {
        const code = `console.separate();\n`;
        return { code, order: "RAW" };
    }
}

export class CONSOLE_CLEAR extends BlockCodeGenerator {
    name = "console_clear";
    generateCode(): GeneratedCode {
        const code = `console.clear();\n`;
        return { code, order: "RAW" };
    }
}
