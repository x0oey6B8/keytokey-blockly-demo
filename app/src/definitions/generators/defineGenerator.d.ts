export declare function defineCodeGenerator(javascriptGenerator: any): void;
export declare function setStatementPrefix(javascriptGenerator: any, prefix: StatementPrefix): void;
export declare enum StatementPrefix {
    NONE = 0,
    COMMENT_WITH_BLOCK_ID = 1,
    THROW_INTERRUPTED_EXCEPTION = 2,
    HIGHLIGHT_BLOCK = 3,
    CHECK_POINT = 4
}
