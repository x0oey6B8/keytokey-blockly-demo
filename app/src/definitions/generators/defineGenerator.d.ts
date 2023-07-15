export declare function defineCodeGenerator(javascriptGenerator: any): void;
export declare function setStatementPrefix(javascriptGenerator: any, prefix: StatementPrefix): void;
export declare enum StatementPrefix {
    NONE = 0,
    THROW_INTERUPPTED_EXCEPTION = 1,
    HIGHLIGHT_BLOCK = 2
}
