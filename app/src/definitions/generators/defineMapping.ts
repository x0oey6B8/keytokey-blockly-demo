import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";
import { controllerButtons } from "../blocks/controllerButtons";

export class MAPPING_SUSPEND_RESUME extends BlockCodeGenerator {
    name = "mapping_suspend_resume";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const array = this.valueToCode(block, "INPUT_LIST", "NONE");
        const targetDevice = this.getFieldValue(block, "TARGET_DEVICE");
        const code = `mapping.suspend("${targetDevice}", ${array});\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class MAPPING_INPUT_ARRAY extends BlockCodeGenerator {
    name = "mapping_input_list";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        let code = "";
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        switch (dropdown) {
            case "LEFT_STICK":
                code = `["LeftStickUp","LeftStickDown","LeftStickLeft","LeftStickRight"]`;
                break;
            case "RIGHT_STICK":
                code = `["RightStickUp","RightStickDown","RightStickLeft","RightStickRight"]`;
                break;
            case "DPAD":
                code = `["DPadUp","DPadDown","DPadLeft","DPadRight"]`;
                break;
            case "ALL":
                code = `[${controllerButtons.map(array => `"${array[1]}"`).join(", ")}]`;
                break;
            default:
                code = "[]";
                break;
        }
        return { code, order: "NONE" };
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}