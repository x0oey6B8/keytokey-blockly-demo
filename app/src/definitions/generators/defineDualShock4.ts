import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class VIRTUAL_DUALSHOCK4_DOWN_UP extends BlockCodeGenerator {
    name = "virtual_dualshock4_down_up";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const button = this.getFieldValue(block, "BUTTON");
        const behavior = this.getFieldValue(block, "BEHAVIOR").toLowerCase();
        const code = `dualShock4.${behavior}("${button}");\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class VIRTUAL_DUALSHOCK4_TAP extends BlockCodeGenerator {
    name = "virtual_dualshock4_tap";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const button = this.getFieldValue(block, "BUTTON");
        const wait1 = this.valueToCode(block, "WAIT1", "NONE");
        const wait2 = this.valueToCode(block, "WAIT2", "NONE");
        const code = `dualShock4.tap("${button}", ${wait1}, ${wait2});\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class VIRTUAL_DUALSHOCK4_NEUTRALIZE_DPAD extends BlockCodeGenerator {
    name = "virtual_dualshock4_neutralize_dpad";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `dualShock4.neutralizeDPad();\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class VIRTUAL_DUALSHOCK4_STICK_VALUE extends BlockCodeGenerator {
    name = "virtual_dualshock4_stick_value";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const stick = this.getFieldValue(block, "STICK");
        const point = this.valueToCode(block, "POINT", "NONE");
        const code = `dualShock4.${stick}.point = ${point};\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class VIRTUAL_DUALSHOCK4_STICK_ANGLE1 extends BlockCodeGenerator {
    name = "virtual_dualshock4_stick_angle1";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const stick = this.getFieldValue(block, "STICK");
        const angle = this.getFieldValue(block, "ANGLE");
        const inputRate = this.getFieldValue(block, "INPUT_RATE");
        const code = `dualShock4.${stick}.angle(${angle}, ${inputRate});\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class VIRTUAL_DUALSHOCK4_STICK_ANGLE2 extends BlockCodeGenerator {
    name = "virtual_dualshock4_stick_angle2";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const stick = this.getFieldValue(block, "STICK");
        const angle = this.valueToCode(block, "ANGLE", "NONE");
        const inputRate = this.valueToCode(block, "INPUT_RATE", "NONE");
        const code = `dualShock4.${stick}.angle(${angle}, ${inputRate});\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class VIRTUAL_DUALSHOCK4_TRIGGER1 extends BlockCodeGenerator {
    name = "virtual_dualshock4_trigger1";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const trigger = this.getFieldValue(block, "TRIGGER");
        const inputRate = this.getFieldValue(block, "INPUT_RATE");
        const code = `dualShock4.${trigger}.value = ${inputRate};\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class VIRTUAL_DUALSHOCK4_TRIGGER2 extends BlockCodeGenerator {
    name = "virtual_dualshock4_trigger2";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const trigger = this.getFieldValue(block, "TRIGGER");
        const inputRate = this.valueToCode(block, "INPUT_RATE", "NONE");
        const code = `dualShock4.${trigger}.value = ${inputRate};\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class VIRTUAL_DUALSHOCK4_RESET extends BlockCodeGenerator {
    name = "virtual_dualshock4_reset";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `dualShock4.reset();\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}
