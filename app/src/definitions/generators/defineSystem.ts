import { BlockCodeGenerator } from "./codeGenerator";

export class INTERRUPT extends BlockCodeGenerator {
    name = "interrupt";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const code = `interrupt();\n`;
        return { code, order: "RAW" };
    }
}