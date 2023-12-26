import { BlockCodeGenerator } from "./codeGenerator";

export class TRIGGER_IS_PRESSED extends BlockCodeGenerator {
    name = "trigger_is_pressed";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const dropdown_value = this.getFieldValue(block, "DROPDOWN");
        const not = (dropdown_value === "RELEASED" ? "Not" : "");
        const code = `trigger.is${not}Pressed()`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        var dropdown_value = this.getFieldValue(block, "DROPDOWN");
        var code = "トリガーが押されて" + dropdown_value === "RELEASED" ? "いない" : "いる";
        return { code, order: "NONE" }
    }
}