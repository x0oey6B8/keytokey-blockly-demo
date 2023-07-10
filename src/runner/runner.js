
export function parse(code) {
    const interpreter = new Interpreter(code, initFunction);
    console.log(interpreter);
    return interpreter;
}

function initFunction(interpreter, scope) {
    interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(alert));
    console.log(interpreter);
}

function alert(text) {
    console.log(text);
}

export function stepCode(interpreter) {
    interpreter.step()
}

export function runCode(interpreter) {
    interpreter.run();
}