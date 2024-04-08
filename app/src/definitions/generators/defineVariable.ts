import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

export class SET_VALUE_TO_VARIABLE extends BlockCodeGenerator {
    name = "set_value_to_variable";

    generateCode(block: BlockSvg): GeneratedCode {
        const type = this.getFieldValue(block, "TYPE");
        const name = this.valueToCode(block, "NAME", "NONE");
        const value = this.valueToCode(block, "VALUE", "NONE");
        const code = `${type.toLowerCase()}Variable.set(${name}, ${value});\n`
        return { code, order: "RAW" };
    }
}

export class GET_VALUE_FROM_VARIABLE extends BlockCodeGenerator {
    name = "get_value_from_variable";

    generateCode(block: BlockSvg): GeneratedCode {
        const type = this.getFieldValue(block, "TYPE");
        const name = this.valueToCode(block, "NAME", "NONE");
        const code = `${type.toLowerCase()}Variable.get(${name})`
        return { code, order: "NONE" };
    }
}

export class VARIABLE_EXISTS extends BlockCodeGenerator {
    name = "variable_exists";

    generateCode(block: BlockSvg): GeneratedCode {
        const type = this.getFieldValue(block, "TYPE");
        const name = this.valueToCode(block, "NAME", "NONE");
        const code = `${type.toLowerCase()}Variable.exists(${name})`
        return { code, order: "NONE" };
    }
}

export class CLEAR_LOCAL_VARIABLES extends BlockCodeGenerator {
    name = "clear_local_variables";

    generateCode(): GeneratedCode {
        const code = `localVariable.clear()`;
        return { code, order: "RAW" };
    }
}