import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class EVENT_MACRO_ENDED extends BlockCodeGenerator {
    name = "event_macro_ended";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const lines = [
            `Events.listen("end", args => {\n`,
            `  const value = args.someValue;\n`,
            statement,
            `});\n`
        ];
        const code = lines.join("");
        return { code, order: "RAW" };
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}