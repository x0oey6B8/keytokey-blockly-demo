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
    getValues(block: BlockSvg) {
        var time = this.valueToCode(block, 'WAIT_TIME', "ATOMIC");
        var unit = this.getFieldValue(block, 'UNIT');
        return { time, unit }
    }
}

export class WAIT extends WAIT_BASE {
    name = "wait";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `wait(${v.time}, "${v.unit}");\n`
        return code;
    }
    // @ts-ignore
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const unitText = this.unitToText(v.unit);
        const code = `${v.time}${unitText}待つ\n`
        return code;
    }
}

export class HIGH_PRECISION_WAIT extends WAIT_BASE {
    name = "highprecision_wait";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `h_wait(${v.time});\n`
        return code;
    }
    // @ts-ignore
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.time}ミリ秒待つ\n`
        return code;
    }
}

export class WAIT_FOR_INPUT extends BlockCodeGenerator {
    name = "wait_for_input";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `waitForInput(${v.key});\n`
        return code;
    }
    // @ts-ignore
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.key}の入力を待つ\n`
        return code;
    }

    getValues(block: BlockSvg) {
        return {
            key: this.valueToCode(block, "KEY", "ATOMIC")
        }
    }
}

export class WAIT_FOR_CONTROLLER extends BlockCodeGenerator {
    name = "wait_for_controller";
    // @ts-ignore
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `controller.waitForInput(${v.button});\n`
        return code;
    }
    // @ts-ignore
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `コントローラー：${v.button}の入力を待つ\n`
        return code;
    }

    getValues(block: BlockSvg) {
        return {
            button: this.valueToCode(block, "BUTTON", "ATOMIC")
        }
    }
}