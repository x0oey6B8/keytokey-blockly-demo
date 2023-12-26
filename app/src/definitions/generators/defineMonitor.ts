import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class MONITOR extends BlockCodeGenerator {
    name = "monitor";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `getMainMonitor()`;
        return { code, order: "NONE" };
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class MONITORS extends BlockCodeGenerator {
    name = "monitors";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const code = `getAllMonitors()`;
        return { code, order: "NONE" };
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class MONITOR_PROPERTY extends BlockCodeGenerator {
    name = "monitor_property";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const monitor = this.valueToCode(block, "MONITOR", "NONE");
        const value = this.getFieldValue(block, "DROPDOWN");
        let propertyName = "";
        switch (value) {
            case "NAME": propertyName = "deviceName"; break;
            case "POINT": propertyName = "point"; break;
            case "SIZE": propertyName = "size"; break;
            case "IS_MAIN_MONITOR": propertyName = "isMain"; break;
        }
        const code = `${monitor}.${propertyName}`;
        return { code, order: "NONE" };
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}

export class MONITOR_DUMP extends BlockCodeGenerator {
    name = "monitor_dump";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const monitor = this.valueToCode(block, "MONITOR", "NONE");
        const code = `${monitor}.dump();\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        return this.GenerateAsFreeString(block);
    }
}