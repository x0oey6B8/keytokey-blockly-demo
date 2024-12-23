import { BlockSvg } from "blockly";
import { BlockCodeGenerator } from "./codeGenerator";

export class EMBEDDED_MULTILINE_JAVASCRIPT extends BlockCodeGenerator {
    name = "embedded_multiline_javascript";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const code = this.getFieldValue(block, "CODE") + "\n";
        return { code, order: "RAW" }
    }
}

export class EMBEDDED_SINGLELINE_JAVASCRIPT extends BlockCodeGenerator {
    name = "embedded_singleline_javascript";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const code = this.getFieldValue(block, "CODE");
        return { code, order: "NONE" }
    }
}

export class JSON_STRINGIFY extends BlockCodeGenerator {
    name = "json_stringify";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const value = this.valueToCode(block, "VALUE", "NONE");
        const code = `JSON.stringify(${value})`;
        return { code, order: "NONE" }
    }
}

export class FORMTTED_JSON_STRINGIFY extends BlockCodeGenerator {
    name = "formatted_json_stringify";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const value = this.valueToCode(block, "VALUE", "NONE");
        const code = `JSON.stringify(${value}, " ", 2)`;
        return { code, order: "NONE" }
    }
}

export class JSON_PARSE extends BlockCodeGenerator {
    name = "json_parse";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const value = this.valueToCode(block, "VALUE", "NONE");
        const code = `JSON.parse(${value})`;
        return { code, order: "NONE" }
    }
}
