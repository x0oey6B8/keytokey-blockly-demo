import { BlockSvg } from "blockly";
import { BlockCodeGenerator } from "./codeGenerator";

export class PERFORMANCE_NOW extends BlockCodeGenerator {
    name = "performance_now";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `performance.now()`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}

export class DATE_TIME_NOW extends BlockCodeGenerator {
    name = "date_time_now";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `DateTime.now`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}

export class DATE_TIME_PROPERTY extends BlockCodeGenerator {
    name = "date_time_property";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const date = this.valueToCode(block, "DATE", "NONE");
        let v = this.getFieldValue(block, "DROPDOWN").toString().toLowerCase();
        if (v === "dayofweek") {
            v = "dayOfWeek";
        }
        const code = `${date}.${v}`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}

export class DATE_TIME_TO_STRING extends BlockCodeGenerator {
    name = "date_time_to_string";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const date = this.valueToCode(block, "DATE", "NONE");
        const code = `${date}.toString`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}