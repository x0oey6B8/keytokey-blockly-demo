import { BlockSvg } from "blockly";
import { BlockCodeGenerator } from "./codeGenerator";

export class CREATE_WINDOW_BY_WINDOW_HANDLE extends BlockCodeGenerator {
    name = "create_window_by_window_handle";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `createWindowById(${v.windowHandle})`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const windowHandle = this.valueToCode(block, "WINDOW_HANDLE", "ATOMIC");
        return { windowHandle }
    }
}

export class FIND_WINDOW_BY extends BlockCodeGenerator {
    name = "find_window_by";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        switch (v.dropdown) {
            case "TITLE_PARTIAL_MATCH": return { order: "NONE", code: `findWindow({ titleContains: ${v.title} })` }
            case "TITLE_STARTS_WITH": return { order: "NONE", code: `findWindow({ titleStartsWith: ${v.title} })` }
            case "TITLE_ENDS_WITH": return { order: "NONE", code: `findWindow({ titleEndsWith: ${v.title} })` }
            default: return { order: "NONE", code: `findWindow({ title: ${v.title} })` }
        }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const title = this.valueToCode(block, "TITLE", "NONE");
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        return { title, dropdown }
    }
}

class WINDOW_PROPERTIES {
    static getPropertyName(tag: string) {
        switch (tag) {
            case "POINT": return "point";
            case "SIZE": return "size";
            case "TITLE": return "title";
            case "CLASS": return "className";
            case "TEXT": return "text";
            case "PROCESS_NAME": return "processName";
            case "PROCESS_ID": return "processId";
            case "WINDOW_HANDLE": return "handle";
            case "EXISTS": return "exists";
            case "VISIBILITY": return "isVisible";
            case "ALWAYS_ON_TOP": return "alwaysOnTop";
            case "PARENT": return "parent";
            case "SHOW_MAXIMIZED": return "isMaximized";
            case "SHOW_MINIMIZED": return "isMinimized";
            case "SHOW_NORMAL": return "isNormalVisible";
            case "CHILD_WINDOWS": return "childWindows";
        }
    }
}

export class GET_WINDOW extends BlockCodeGenerator {
    name = "get_window";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.functionName}`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        return {
            dropdown,
            functionName: this.functionName(dropdown)
        }
    }
    functionName(dropdown: string): string {
        switch (dropdown) {
            case "ACTIVE": return "activeWindow";
            case "UNDER_MOUSE": return "windowUnderMouse";
            default: return "activeWindow"
        }
    }
}

export class WINDOW_GET_PROPERTY extends BlockCodeGenerator {
    name = "window_get_property";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.window}.${v.propertyName}`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "NONE");
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        const propertyName = WINDOW_PROPERTIES.getPropertyName(dropdown);
        return { window, propertyName }
    }
}

export class WINDOW_SET_POINT extends BlockCodeGenerator {
    name = "window_set_point";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.window}.point = ${v.value};\n`;
        return { code, order: "ATOMIC" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "NONE");
        const value = this.valueToCode(block, "VALUE", "NONE");
        return { window, value }
    }
}

export class WINDOW_SET_SIZE extends BlockCodeGenerator {
    name = "window_set_size";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.window}.size = ${v.value};\n`;
        return { code, order: "ATOMIC" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "NONE");
        const value = this.valueToCode(block, "VALUE", "NONE");
        return { window, value }
    }
}

export class WINDOW_SET_TITLE extends BlockCodeGenerator {
    name = "window_set_title";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.window}.title = ${v.value};\n`;
        return { code, order: "ATOMIC" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "NONE");
        const value = this.valueToCode(block, "VALUE", "NONE");
        return { window, value }
    }
}

export class WINDOW_SET_TEXT extends BlockCodeGenerator {
    name = "window_set_text";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.window}.text = ${v.value};\n`;
        return { code, order: "ATOMIC" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "NONE");
        const value = this.valueToCode(block, "VALUE", "NONE");
        return { window, value }
    }
}

export class WINDOW_SET_BOUNDS extends BlockCodeGenerator {
    name = "window_set_bounds";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.window}.setBounds(${v.point}, ${v.size});\n`;
        return { code, order: "ATOMIC" }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "NONE");
        const point = this.valueToCode(block, "POINT", "NONE");
        const size = this.valueToCode(block, "SIZE", "NONE");
        return { window, point, size }
    }
}

export class WINDOW_DUMP extends BlockCodeGenerator {
    name = "window_dump";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.window}.dump();\n`;
        return code;
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "NONE");
        return { window }
    }
}

export class WINDOW_CLOSE extends BlockCodeGenerator {
    name = "window_close";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.window}.close();\n`;
        return code;
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "NONE");
        return { window }
    }
}

export class WINDOW_SET_STATE extends BlockCodeGenerator {
    name = "window_set_state";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.window}.state = "${v.state}";\n`;
        return code;
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "NONE");
        const state = this.getFieldValue(block, "STATE");
        return { window, state }
    }
}

export class WINDOW_SET_VISIBILITY extends BlockCodeGenerator {
    name = "window_set_visibility";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        if (v.dropdown === "SHOW") {
            return `${v.window}.show();\n`;
        } else {
            return `${v.window}.hide();\n`;
        }
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "NONE");
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        return { window, dropdown }
    }
}

export class WINDOW_RESTORE extends BlockCodeGenerator {
    name = "window_restore";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const window = this.valueToCode(block, "WINDOW", "NONE");
        return `${window}.restore();\n`
    }
    // @ts-ignore
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}