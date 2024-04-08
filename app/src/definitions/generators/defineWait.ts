import { BlockSvg } from "blockly";
import { BlockCodeGenerator } from "./codeGenerator";

export abstract class WAIT_BASE extends BlockCodeGenerator {
    unitToText(unit: string) {
        switch (unit) {
            case "SECONDS": return "秒";
            case "MINUTES": return "分";
            case "HOURS": return "時間";
            default: return "ミリ秒";
        }
    }
    unitToShortenedUnit(unit: string) {
        switch (unit) {
            case "SECONDS": return "sec";
            case "MINUTES": return "min";
            case "HOURS": return "hr";
            default: return "ms";
        }
    }
    getValues(block: BlockSvg) {
        var time = this.valueToCode(block, 'WAIT_TIME', "ATOMIC");
        var unit = this.getFieldValue(block, 'UNIT');
        return { time, unit }
    }
}

export class WAIT extends WAIT_BASE {
    name = "wait";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const unit = this.unitToShortenedUnit(v.unit);
        const code = `wait(${v.time}, "${unit}");\n`
        return code;
    }
}

export class HIGH_PRECISION_WAIT extends WAIT_BASE {
    name = "highprecision_wait";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `h_wait(${v.time});\n`
        return code;
    }
}

export class WAIT_FOR_INPUT extends BlockCodeGenerator {
    name = "wait_for_input";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const input = this.valueToCode(block, "INPUT", "NONE");
        const code = `waitForInput(${input});\n`
        return code;
    }
}