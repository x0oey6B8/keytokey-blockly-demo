import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class GET_IME_CONVERSION_MODE extends BlockCodeGenerator {
    name = "get_ime_conversion_mode";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `IME.conversionMode`;
        return { code, order: "NONE" };
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class SET_IME_CONVERSION_MODE extends BlockCodeGenerator {
    name = "set_ime_conversion_mode";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const mode = this.valueToCode(block, "MODE", "NONE");
        const code = `IME.conversionMode = ${mode};\n`;
        return { code, order: "RAW" };
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}