import { BlockSvg } from "blockly";
import { BlockCodeGenerator } from "./codeGenerator";

export class TEMPLATE_MATCHING_MATCH_BY_ID extends BlockCodeGenerator {
    name = "template_matching_match_by_id";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `templateMatching.${v.functionName}(${v.identifier})`;
        return { code, order: "NONE" };
    }
    getValues(block: BlockSvg) {
        const identifier = this.valueToCode(block, "IDENTIFIER", "ATOMIC");
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        let functionName = "matchById";
        if (dropdown === "MULTIPLE") {
            functionName = "matchesById";
        }
        return { identifier, functionName };
    }
}

class TEMPLATE_MATCHING_RESULT_PROPERTY_NAMES {
    static getPropertyName(dropdown: string) {
        switch (dropdown) {
            case "IS_SUCCESS": return "isSuccess";
            case "IS_NOT_SUCCESS": return "isNotSuccess";
            case "FOUND_FIRST_IMAGE": return "foundImage";
            case "FOUND_ALL_IMAGES": return "foundImages";
            case "SCORE": return "isSuccess";
            case "FOUND_POINT_CENTER": return "point";
            case "FOUND_POINT_TOP_LEFT": return "topLeftPoint";
            case "FOUND_POINT_BOTTOM_RIGHT": return "bottomRightPoint";
            case "IDENTIFIER": return "identifier";
            default: return "";
        }
    }
}

export class TEMPLATE_MATCHING_RESULT_PROPERTIES extends BlockCodeGenerator {
    name = "template_matching_result_properties";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.result}.${v.propertyName}`;
        return { code, order: "NONE" };
    }
    getValues(block: BlockSvg) {
        const result = this.valueToCode(block, "RESULT", "ATOMIC");
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        const propertyName = TEMPLATE_MATCHING_RESULT_PROPERTY_NAMES.getPropertyName(dropdown);
        return { result, dropdown, propertyName };
    }
}

export class TEMPLATE_MATCHING_FOUND_IMAGE_PROPERTIES extends BlockCodeGenerator {
    name = "template_matching_found_image_properties";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.result}.${v.propertyName}`;
        return { code, order: "NONE" };
    }
    getValues(block: BlockSvg) {
        const result = this.valueToCode(block, "RESULT", "ATOMIC");
        const dropdown = this.getFieldValue(block, "DROPDOWN");
        const propertyName = TEMPLATE_MATCHING_RESULT_PROPERTY_NAMES.getPropertyName(dropdown);
        return { result, dropdown, propertyName };
    }
}