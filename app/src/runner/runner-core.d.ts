declare function parseCode(code: string, initializer: (interpreter: any, scope: any) => void): void;

declare function stepCode(interpreter: any): boolean;

declare function runCode(interpreter: any): void

export { parseCode, stepCode, runCode }