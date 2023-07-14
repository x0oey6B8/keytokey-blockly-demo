
export function parseCode(code, initializer) {
    const interpreter = new Interpreter(code, initializer);
    return interpreter;
}

export function stepCode(interpreter) {
    return interpreter.step();
}

export function runCode(interpreter) {
    interpreter.run();
}