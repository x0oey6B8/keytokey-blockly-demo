import { BlockSvg } from "blockly";
import { KEY_DOWN_UP, KEY_TAP, KEY_IS_PRESSED } from "./defineInput";
import { LOGIC_OPERATION } from "./defineLogic";
import { TRIGGER_IS_PRESSED } from "./defintTrigger";

export declare function registerDefinition(generator, name, callback): void;
export declare function getBlockCallback(generator: any, name: string): (block: BlockSvg) => string[] | string;
export declare function getVariableName(generator: any, field_value: any): string;
export declare function valueToCode(generator: any, block: BlockSvg, key: string, order: string): string;
export declare function statementToCode(generator: any, block: BlockSvg, key: string, order: string): string;
export declare function defineCodeGenerator(javascriptGenerator: any): void;
export declare function setStatementPrefix(javascriptGenerator: any, prefix: StatementPrefix): void;
export declare enum StatementPrefix {
    NONE = 0,
    COMMENT_WITH_BLOCK_ID = 1,
    THROW_INTERRUPTED_EXCEPTION = 2,
    HIGHLIGHT_BLOCK = 3,
    CHECK_POINT = 4
}