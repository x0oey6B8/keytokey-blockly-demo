import { BlockSvg } from "blockly";
import { getBlockCallback, getVariableName, registerDefinition, statementToCode, valueToCode } from "./defineGenerator";

export const definedCodeGenerators: BlockCodeGenerator[] = [];

export interface IBlockCodeGenerator {
    generate(block: BlockSvg): string[] | string;
}

export type CodeGenerationTarget = "JAVASCRIPT" | "DESCRIPTION"

export type Order = "RAW" | "NONE" | "ATOMIC";

export interface IReturnedCode {
    code: string;
    order: Order;
}

export type GeneratedCode = IReturnedCode | string[] | string;

export abstract class BlockCodeGenerator implements IBlockCodeGenerator {

    abstract name: string;
    abstract GenerateAsJavascript(block: BlockSvg): GeneratedCode;
    abstract GenerateAsComment(block: BlockSvg): GeneratedCode;

    target: CodeGenerationTarget = "JAVASCRIPT";

    constructor(private generator: any) {
    }

    generate = (block: BlockSvg) => {

        let generated: GeneratedCode;

        if (this.target === "JAVASCRIPT") {
            generated = this.GenerateAsJavascript(block);
        } else if (this.target === "DESCRIPTION") {
            generated = this.GenerateAsComment(block);
        } else {
            generated = this.GenerateAsJavascript(block);
        }

        if (typeof generated === "string" || Array.isArray(generated)) {
            return generated;
        }

        const order = this.convertOrder(generated.order);
        if (order) {
            return [generated.code, this.convertOrder(generated.order)];
        } else {
            return generated.code;
        }
    }

    getCurrentCallbackOf(blockName: string) {
        return getBlockCallback(this.generator, blockName);
    }

    convertOrder = (order: Order): string => {
        if (order === "RAW") {
            return "";
        } else if (order === "NONE") {
            return this.generator.ORDER_NONE;
        } else if (order === "ATOMIC") {
            return this.generator.ORDER_ATOMIC;
        } else {
            return "";
        }
    }

    valueToCode = (block: BlockSvg, key: string, order: Order) => {
        return valueToCode(this.generator, block, key, this.convertOrder(order));
    }

    statementToCode = (block: BlockSvg, key: string, order: Order) => {
        return statementToCode(this.generator, block, key, this.convertOrder(order));
    }

    getFieldValue = (block: BlockSvg, key: string) => {
        return block.getFieldValue(key);
    }

    getFieldVaribleName = (block: BlockSvg, key: string) => {
        const value = block.getFieldValue(key);
        return getVariableName(this.generator, value);
    }

    register = () => {
        registerDefinition(this.generator, this.name, this.generate);
    }
}