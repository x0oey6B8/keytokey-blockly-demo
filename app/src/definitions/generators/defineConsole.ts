import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class CONSOLE_LOG extends BlockCodeGenerator {
    name = "console_log";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const value = this.valueToCode(block, "VALUE", "ATOMIC");
        const code = `console.log(${value});\n`;
        return { code, order: "RAW" };
    }
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        const value = this.valueToCode(block, "VALUE", "ATOMIC");
        const code = `コンソールに ${value} を出力\n`;
        return { code, order: "RAW" };
    }
}

export class CONSOLE_CLEAR extends BlockCodeGenerator {
    name = "console_clear";
    GenerateAsJavascript(): GeneratedCode {
        const code = `console.clear();\n`;
        return { code, order: "RAW" };
    }
    GenerateAsComment(): GeneratedCode {
        const code = `コンソールをクリア\n`;
        return { code, order: "RAW" };
    }
}
