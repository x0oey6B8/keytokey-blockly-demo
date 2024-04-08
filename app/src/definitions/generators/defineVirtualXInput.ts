import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class VIRTUAL_XINPUT_DOWN_UP extends BlockCodeGenerator {
    name = "virtual_xinput_down_up";
    generateCode(block: BlockSvg): GeneratedCode {

        const number = this.getFieldValue(block, "DEVICE_NUMBER");
        const button = this.getFieldValue(block, "BUTTON");
        const behavior = this.getFieldValue(block, "BEHAVIOR").toLowerCase();
        const code = `virtualXInput${number}.${behavior}("${button}");\n`;
        return code;
    }
}

export class VIRTUAL_XINPUT_TAP extends BlockCodeGenerator {
    name = "virtual_xinput_tap";
    generateCode(block: BlockSvg): GeneratedCode {

        const number = this.getFieldValue(block, "DEVICE_NUMBER");
        const button = this.getFieldValue(block, "BUTTON");
        const wait1 = this.valueToCode(block, "WAIT1", "NONE");
        const wait2 = this.valueToCode(block, "WAIT2", "NONE");
        const code = `virtualXInput${number}.tap("${button}", ${wait1}, ${wait2});\n`;
        return code;
    }
}

export class VIRTUAL_XINPUT_NEUTRALIZE_DPAD extends BlockCodeGenerator {
    name = "virtual_xinput_neutralize_dpad";
    generateCode(block: BlockSvg): GeneratedCode {
        const number = this.getFieldValue(block, "DEVICE_NUMBER");
        const code = `virtualXInput${number}.neutralizeDPad();\n`;
        return code;
    }
}

export class VIRTUAL_XINPUT_STICK_VALUE extends BlockCodeGenerator {
    name = "virtual_xinput_stick_value";
    generateCode(block: BlockSvg): GeneratedCode {

        const number = this.getFieldValue(block, "DEVICE_NUMBER");
        const stick = this.getFieldValue(block, "STICK");
        const point = this.valueToCode(block, "POINT", "NONE");
        const code = `virtualXInput${number}.${stick}.setPoint(${point});\n`;
        return code;
    }
}

export class VIRTUAL_XINPUT_STICK_ANGLE1 extends BlockCodeGenerator {
    name = "virtual_xinput_stick_angle1";
    generateCode(block: BlockSvg): GeneratedCode {

        const number = this.getFieldValue(block, "DEVICE_NUMBER");
        const stick = this.getFieldValue(block, "STICK");
        const angle = this.getFieldValue(block, "ANGLE");
        const inputRate = this.getFieldValue(block, "INPUT_RATE");
        const code = `virtualXInput${number}.${stick}.angle(${angle}, ${inputRate});\n`;
        return code;
    }
}

export class VIRTUAL_XINPUT_STICK_ANGLE2 extends BlockCodeGenerator {
    name = "virtual_xinput_stick_angle2";
    generateCode(block: BlockSvg): GeneratedCode {

        const number = this.getFieldValue(block, "DEVICE_NUMBER");
        const stick = this.getFieldValue(block, "STICK");
        const angle = this.valueToCode(block, "ANGLE", "NONE");
        const inputRate = this.valueToCode(block, "INPUT_RATE", "NONE");
        const code = `virtualXInput${number}.${stick}.angle(${angle}, ${inputRate});\n`;
        return code;
    }
}

export class VIRTUAL_XINPUT_TRIGGER1 extends BlockCodeGenerator {
    name = "virtual_xinput_trigger1";
    generateCode(block: BlockSvg): GeneratedCode {

        const number = this.getFieldValue(block, "DEVICE_NUMBER");
        const trigger = this.getFieldValue(block, "TRIGGER");
        const inputRate = this.getFieldValue(block, "INPUT_RATE");
        const code = `virtualXInput${number}.${trigger}.value = ${inputRate};\n`;
        return code;
    }
}

export class VIRTUAL_XINPUT_TRIGGER2 extends BlockCodeGenerator {
    name = "virtual_xinput_trigger2";
    generateCode(block: BlockSvg): GeneratedCode {

        const number = this.getFieldValue(block, "DEVICE_NUMBER");
        const trigger = this.getFieldValue(block, "TRIGGER");
        const inputRate = this.valueToCode(block, "INPUT_RATE", "NONE");
        const code = `virtualXInput${number}.${trigger}.value = ${inputRate};\n`;
        return code;
    }
}

export class VIRTUAL_XINPUT_RESET extends BlockCodeGenerator {
    name = "virtual_xinput_reset";
    generateCode(block: BlockSvg): GeneratedCode {

        const number = this.getFieldValue(block, "DEVICE_NUMBER");
        const code = `virtualXInput${number}.reset();\n`;
        return code;
    }
}
