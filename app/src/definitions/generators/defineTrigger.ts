import { BlockCodeGenerator } from "./codeGenerator";

export class TRIGGER_IS_PRESSED extends BlockCodeGenerator {
    name = "trigger_is_pressed";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const dropdown_value = this.getFieldValue(block, "DROPDOWN");
        const not = (dropdown_value === "RELEASED" ? "Not" : "");
        const code = `trigger.is${not}Pressed`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}

export class TRIGGER_IS_KEYBOARD extends BlockCodeGenerator {
    name = "trigger_is_keyboard";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `trigger.isKey`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}

export class TRIGGER_IS_MOUSE extends BlockCodeGenerator {
    name = "trigger_is_mouse";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `trigger.isMouse`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}

export class TRIGGER_IS_KEY_OR_MOUSE extends BlockCodeGenerator {
    name = "trigger_is_keyboard_or_mouse";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `trigger.isKeyOrMouse`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}

export class TRIGGER_IS_CONTROLLER extends BlockCodeGenerator {
    name = "trigger_is_controller";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `trigger.isController`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}

export class TRIGGER_AS_KEY extends BlockCodeGenerator {
    name = "trigger_as_key";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `trigger.asKey`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}

export class TRIGGER_AS_CONTROLLER extends BlockCodeGenerator {
    name = "trigger_as_controller";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `trigger.asController`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}