import { BlockSvg } from "blockly";
import { BlockCodeGenerator } from "./codeGenerator";

export class CONTROLLER extends BlockCodeGenerator {
    name = "controller";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        return { code: "controller", order: "NONE" };
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}

export class XINPUT_CONTROLLER extends BlockCodeGenerator {
    name = "xinput_controller";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const index = this.getFieldValue(block, "INDEX");
        return { code: `xinput${index}`, order: "NONE" };
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}

export class CONTROLLER_PROPERTY extends BlockCodeGenerator {
    name = "controller_proeprty";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.controller}.${v.propertyName}`;
        return {
            code,
            order: "NONE"
        };
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }

    getValues(block: BlockSvg) {
        const controller = this.valueToCode(block, "CONTROLLER", "NONE");
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        const propertyName = this.getPropertyName(dropdown);
        return { controller, propertyName }
    }
    getPropertyName(dropdown: string) {
        switch (dropdown) {
            case "IS_CONNECTED": return "isConnected";
            case "IS_DIRECTINPUT": return "isDirectInput";
            case "IS_XINPUT": return "isXInput";
            case "DPAD_DIRECTION": return "dpadDirection";
            // case "NAME": return "name";
            default: return "isConnected";
        }
    }
}

export class IS_CONTROLLER_PRESSED extends BlockCodeGenerator {
    name = "is_controller_pressed";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.controller}.${v.propertyName}(${v.button})`;
        return {
            code,
            order: "NONE"
        };
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }

    getValues(block: BlockSvg) {
        const controller = this.valueToCode(block, "CONTROLLER", "NONE");
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        const button = this.valueToCode(block, "BUTTON", "NONE");
        const propertyName = dropdown === "PRESSED" ? "isPressed" : "isReleased";
        return { controller, dropdown, propertyName, button }
    }
}

export class CONTROLLER_STICK_PROPERTY extends BlockCodeGenerator {
    name = "controller_stick_property";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.controller}.${v.stick}.${v.propertyName}`;
        return {
            code,
            order: "NONE"
        };
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }

    getValues(block: BlockSvg) {
        const controller = this.valueToCode(block, "CONTROLLER", "NONE");
        const stick = this.getFieldValue(block, "STICK") === "LEFT" ? "leftStick" : "rightStick";
        const dropdown = this.getFieldValue(block, "PROPERTY");
        const propertyName = this.getPropertyName(dropdown);
        return { controller, propertyName, stick }
    }
    getPropertyName(dropdown: string) {
        switch (dropdown) {
            case "HORIZONTAL_VALUE": return "horizontal";
            case "VERTICAL_VALUE": return "vertical";
            case "ANGLE": return "angle";
            case "INPUT_RATE": return "inputRate";
            case "DIRECTION": return "direction";
            case "DEADZONE": return "deadzone";
            case "OVER_DEADZONE": return "overDeadZone";
            default: return "";
        }
    }
}

export class CONTROLLER_TRIGGER_PROPERTY extends BlockCodeGenerator {
    name = "controller_trigger_property";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.controller}.${v.stick}.${v.propertyName}`;
        return {
            code,
            order: "NONE"
        };
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }

    getValues(block: BlockSvg) {
        const controller = this.valueToCode(block, "CONTROLLER", "NONE");
        const stick = this.getFieldValue(block, "TRIGGER") === "LEFT" ? "leftTrigger" : "rightTrigger";
        const dropdown = this.getFieldValue(block, "PROPERTY");
        const propertyName = this.getPropertyName(dropdown);
        return { controller, propertyName, stick }
    }
    getPropertyName(dropdown: string) {
        switch (dropdown) {
            case "INPUT_RATE": return "inputRate";
            case "DEADZONE": return "deadzone";
            case "OVER_DEADZONE": return "overDeadZone";
            default: return "";
        }
    }
}