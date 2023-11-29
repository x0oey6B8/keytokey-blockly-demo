import { BlockSvg } from "blockly";
import { BlockCodeGenerator } from "./codeGenerator";

export class CREATE_WINDOW_BY_WINDOW_HANDLE extends BlockCodeGenerator {
    name = "create_window_by_window_handle";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `createWindow(${v.windowHandle})`;
        return { code, order: "NONE" }
    }
    // @ts-ignore
    GenerateAsComment(block: BlockSvg): GeneratedCode {
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
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const title = this.valueToCode(block, "TITLE", "ATOMIC");
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
    GenerateAsComment(block: BlockSvg): GeneratedCode {
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
            case "ACTIVE": return "getActiveWindow()";
            case "UNDER_MOUSE": return "getWindowUnderMouse()";
            default: return "getActiveWindow()"
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
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "ATOMIC");
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        const propertyName = WINDOW_PROPERTIES.getPropertyName(dropdown);
        return { window, propertyName }
    }
}

export class WINDOW_SET_PROPERTY extends BlockCodeGenerator {
    name = "window_set_property";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.window}.${v.proeprtyName} = ${v.value};\n`;
        return { code, order: "ATOMIC" }
    }
    // @ts-ignore
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "ATOMIC");
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        const propertyName = WINDOW_PROPERTIES.getPropertyName(dropdown);
        const value = this.valueToCode(block, "VALUE", "ATOMIC");
        return { window, proeprtyName: propertyName, value }
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
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "ATOMIC");
        const point = this.valueToCode(block, "POINT", "ATOMIC");
        const size = this.valueToCode(block, "SIZE", "ATOMIC");

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
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const window = this.valueToCode(block, "WINDOW", "ATOMIC");
        return { window }
    }
}