import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class EVENT_MACRO_ENDED extends BlockCodeGenerator {
    name = "event_macro_ended";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const lines = [
            `Events.listen("end", e => {\n`,
            `  const value = e.someValue;\n`,
            statement,
            `});\n`
        ];
        const code = lines.join("");
        return { code, order: "RAW" };
    }
}

export class EVENT_TRIGGER_PRESSED extends BlockCodeGenerator {
    name = "event_trigger_pressed";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const lines = [
            `Events.listen("trigger-pressed", e => {\n`,
            `  // do something \n`,
            statement,
            `});\n`
        ];
        const code = lines.join("");
        return { code, order: "RAW" };
    }
}

export class EVENT_TRIGGER_RELEASED extends BlockCodeGenerator {
    name = "event_trigger_released";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const lines = [
            `Events.listen("trigger-released", e => {\n`,
            `  // do something \n`,
            statement,
            `});\n`
        ];
        const code = lines.join("");
        return { code, order: "RAW" };
    }
}

export class EVENT_KEY_PRESSED extends BlockCodeGenerator {
    name = "event_key_pressed";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const name = this.getFieldVaribleName(block, "KEY");
        const isRepeated = this.getFieldVaribleName(block, "IS_REPEATED");
        const lines = [
            `Events.listen("key-pressed", e => {\n`,
            `   ${name} = e.key;\n`,
            `   ${isRepeated} = e.isRepeated;\n`,
            statement,
            `});\n`
        ];
        const code = lines.join("");
        return { code, order: "RAW" };
    }
}

export class EVENT_KEY_RELEASED extends BlockCodeGenerator {
    name = "event_key_released";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const name = this.getFieldVaribleName(block, "KEY");
        const lines = [
            `Events.listen("key-released", e => {\n`,
            `   ${name} = e.key;\n`,
            statement,
            `});\n`
        ];
        const code = lines.join("");
        return { code, order: "RAW" };
    }
}

export class EVENT_KEY_STATE_CHANGED extends BlockCodeGenerator {
    name = "event_key_state_changed";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const name = this.getFieldVaribleName(block, "KEY");
        const isKeyPressed = this.getFieldVaribleName(block, "IS_KEY_PRESSED");
        const isInputByApp = this.getFieldVaribleName(block, "IS_INPUT_BY_APP");
        const isToggleKey = this.getFieldVaribleName(block, "IS_TOGGLE_KEY");
        const isRepeated = this.getFieldVaribleName(block, "IS_REPEATED");
        const lines = [
            `Events.listen("key-state-changed", e => {\n`,
            `   ${name} = e.key;\n`,
            `   ${isKeyPressed} = e.isKeyPressed;\n`,
            `   ${isToggleKey} = e.IsToggleKey;\n`,
            `   ${isRepeated} = e.isRepeated;\n`,
            `   ${isInputByApp} = e.isInputByApp;\n`,
            statement,
            `});\n`
        ];
        const code = lines.join("");
        return { code, order: "RAW" };
    }
}

export class EVENT_CANCEL_INPUT extends BlockCodeGenerator {
    name = "event_cancel_input";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const value = this.getFieldValue(block, "VALUE");
        const code = `e.cancel = ${value};\n`;
        return { code, order: "RAW" };
    }
}

export class EVENT_MOUSE_MOVED extends BlockCodeGenerator {
    name = "event_mouse_moved";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const newPoint = this.getFieldVaribleName(block, "NEW_POINT");
        const oldPoint = this.getFieldVaribleName(block, "OLD_POINT");
        const deltaX = this.getFieldVaribleName(block, "DELTA_X");
        const deltaY = this.getFieldVaribleName(block, "DELTA_Y");
        const isInputByApp = this.getFieldVaribleName(block, "IS_INPUT_BY_APP");
        const lines = [
            `Events.listen("mouse-moved", e => {\n`,
            `   ${newPoint} = e.newPoint;\n`,
            `   ${oldPoint} = e.oldPoint;\n`,
            `   ${deltaX} = e.deltaX;\n`,
            `   ${deltaY} = e.deltaY;\n`,
            `   ${isInputByApp} = e.isInputByApp;\n`,
            statement,
            `});\n`
        ];
        const code = lines.join("");
        return { code, order: "RAW" };
    }
}

export class EVENT_CONTROLLER_STATE_CHANGED extends BlockCodeGenerator {
    name = "event_controller_state_changed";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const statement = this.statementToCode(block, "STATEMENT", "NONE");
        const input = this.getFieldVaribleName(block, "INPUT");
        const isPressed = this.getFieldVaribleName(block, "IS_PRESSED");
        const lines = [
            `Events.listen("controller-state-changed", e => {\n`,
            `  ${input} = e.changedInput;\n`,
            `  ${isPressed} = e.isInputPressed;\n`,
            statement,
            `});\n`
        ];
        const code = lines.join("");
        return { code, order: "RAW" };
    }
}