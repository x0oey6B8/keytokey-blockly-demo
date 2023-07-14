import { IGlobalFactory, GlobalFactory } from "../scripts/GlobalFactory";
import { parseCode, runCode, stepCode } from "./runner-core";

export interface IInterpreterInitializer {
    initialize(interpreter: Interpreter, globalObject: any): void;
}

export class Interpreter {
    private _interpreter: any;
    private _isInitialized: boolean = false;

    constructor(interpreter: any) {
        this._interpreter = interpreter;
    }

    public static Create(
        code: string,
        initializer: IInterpreterInitializer = InterpreterInitializer.default): Interpreter {
        const interpreter = parseCode(code, (interpreter, globalObject) => {
            const wrapper = new Interpreter(interpreter);
            initializer.initialize(wrapper, globalObject);
        });
        const interpreterWrapper = new Interpreter(interpreter);
        interpreterWrapper._isInitialized = true;
        return interpreterWrapper;
    }

    run() {
        this.throwNotInitializedError();
        runCode(this._interpreter);
    }

    step(): boolean {
        this.throwNotInitializedError();
        return stepCode(this._interpreter);
    }

    setFunction(globalObject: any, functionName: string, func: any) {
        this.throwInitializedError();
        this._interpreter.setProperty(globalObject, functionName, this._interpreter.createNativeFunction(func));
    }

    setAsyncFunction(globalObject: any, functionName: string, func: any) {
        this.throwInitializedError();
        this._interpreter.setProperty(globalObject, functionName, this._interpreter.createAsyncFunction(func));
    }

    setNativeObjectAsPseudo(globalObject: any, nativeName: string, native: any) {
        this.throwInitializedError();
        this._interpreter.setProperty(globalObject, nativeName, this._interpreter.nativeToPseudo(native));
    }

    getStacks() {
        const stack = this._interpreter.getStateStack();
        return stack;
    }

    private throwInitializedError() {
        if (this._isInitialized) {
            throw new Error("Interpreter has already initialized.");
        }
    }

    private throwNotInitializedError() {
        if (!this._isInitialized) {
            throw new Error("Interpreter is not initialized.");
        }
    }
}

export class Runner {

    interpreter: Interpreter;

    private _isRunning = false;
    private _isSuspended = false;

    constructor(interpreter: Interpreter) {
        this.interpreter = interpreter;
    }

    trySetNewInterpreter(interpreter: Interpreter): boolean {
        if (!this.canRun()) {
            return false;
        }

        this.interpreter = interpreter;
        this._isSuspended = false;
        return true;
    }

    run() {
        if (!this.canRun()) {
            return;
        }

        this._isRunning = true;
        this.interpreter.run();
        this._isRunning = false;
    }

    stepAuto() {
        if (!this.canRun()) {
            return;
        }

        this._isRunning = true;
        while (!this._isSuspended && this.interpreter.step()) { }
        this._isRunning = false;
    }

    suspend() {
        this._isSuspended = true;
    }

    private canRun() {
        return !this._isRunning;
    }

    isRunning(): boolean {
        return this._isRunning;
    }
}

export class InterpreterInitializer implements IInterpreterInitializer {

    static get default() {
        return new InterpreterInitializer();
    }

    _factory: IGlobalFactory

    constructor(factory: IGlobalFactory = new GlobalFactory()) {
        this._factory = factory;
    }

    initialize(interpreter: Interpreter, globalObject: any): void {
        this.registerNativeObjects(interpreter, globalObject);
        this.registerCustomGlobal(interpreter, globalObject);
    }

    private isFunction(value: any): boolean {
        return typeof value === "function";
    }

    private isAwaitableFunction(value: any) {
        return value && typeof value.then === 'function';
    }

    private registerCustomGlobal(interpreter: Interpreter, globalObject: any) {
        const global = this._factory.create();
        const keys = Object.keys(global);
        const values = Object.values(global);
        for (let index = 0; index < keys.length; index++) {
            const name = keys[index];
            const value = values[index];
            if (this.isAwaitableFunction(value)) {
                interpreter.setAsyncFunction(globalObject, name, value);
            } else if (this.isFunction(value)) {
                interpreter.setFunction(globalObject, name, value);
            } else {
                interpreter.setNativeObjectAsPseudo(globalObject, name, value);
            }
        }
    }

    private registerNativeObjects(interpreter: Interpreter, globalObject: any) {
        interpreter.setNativeObjectAsPseudo(globalObject, "console", console);
        interpreter.setNativeObjectAsPseudo(globalObject, "performance", performance);
        interpreter.setNativeObjectAsPseudo(globalObject, "performance", {
            now: function () {
                return performance.now.apply(performance, []);
            }
        });
    }
}