import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class VALUE_KEYS extends BlockCodeGenerator {
    name = "keys";

    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        return { code: `"${v.dropdown_value}"`, order: "NONE" };
    }
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        var dropdown_value = block.getFieldValue('VALUE');
        return { dropdown_value };
    }
}

export class VALUE_CONTROLLER_BUTTONS extends BlockCodeGenerator {
    name = "controller_buttons";

    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        return { code: `"${v.dropdown_value}"`, order: "NONE" };
    }
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        var dropdown_value = block.getFieldValue('VALUE');
        return { dropdown_value };
    }
}

export class VALUE_POINT extends BlockCodeGenerator {
    name = "point";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `{ x: ${v.x}, y: ${v.y} }`;
        return { code, order: "NONE" };
    }
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const x = this.valueToCode(block, 'X', "ATOMIC");
        const y = this.valueToCode(block, 'Y', "ATOMIC");
        return { x, y };
    }
}

export class VALUE_SIZE extends BlockCodeGenerator {
    name = "size";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `{ width: ${v.x}, height: ${v.y} }`;
        return { code, order: "NONE" };
    }
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const x = this.valueToCode(block, 'X', "ATOMIC");
        const y = this.valueToCode(block, 'Y', "ATOMIC");
        return { x, y };
    }
}

export class VALUE_POINT_GET_PROPERTY extends BlockCodeGenerator {
    name = "get_point_property";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.point}.${v.property}`;
        return { code, order: "NONE" };
    }
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        const point = this.valueToCode(block, 'POINT', "ATOMIC");
        const property = this.getFieldValue(block, 'DROPDOWN');
        return { point, property };
    }
}

export class VALUE_RANDOM_POINT extends BlockCodeGenerator {
    name = "random_point";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `randomPoint(${v.x_from}, ${v.x_to}, ${v.y_from}, ${v.y_to})`;
        return { code, order: "NONE" };
    }
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
    getValues(block: BlockSvg) {
        var x_from = this.valueToCode(block, 'X_FROM', "ATOMIC");
        var x_to = this.valueToCode(block, 'X_TO', "ATOMIC");
        var y_from = this.valueToCode(block, 'Y_FROM', "ATOMIC");
        var y_to = this.valueToCode(block, 'Y_TO', "ATOMIC");
        return { x_from, x_to, y_from, y_to };
    }
}