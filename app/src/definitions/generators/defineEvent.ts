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

export class EVENT_TRIGGER_PRESSED extends BlockCodeGenerator {
    name = "event_trigger_pressed";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const lines = [
            `Events.listen("trigger-pressed", args => {\n`,
            `  // do something \n`,
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

export class EVENT_TRIGGER_RELEASED extends BlockCodeGenerator {
    name = "event_trigger_released";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const lines = [
            `Events.listen("trigger-released", args => {\n`,
            `  // do something \n`,
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

export class EVENT_KEY_PRESSED extends BlockCodeGenerator {
    name = "event_key_pressed";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const name = this.getFieldVaribleName(block, "KEY");
        const lines = [
            `Events.listen("key-pressed", args => {\n`,
            `   ${name} = args.key;\n`,
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

export class EVENT_KEY_RELEASED extends BlockCodeGenerator {
    name = "event_key_released";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const name = this.getFieldVaribleName(block, "KEY");
        const lines = [
            `Events.listen("key-released", args => {\n`,
            `   ${name} = args.key;\n`,
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