export class Runner {
    private _isRunning = false;

    constructor() {
        (window as any).InterruptedError = InterruptedError;
    }

    run(code: string) {
        if (!this.canRun()) {
            return;
        }

        new Promise(() => {
            this._isRunning = true;
            eval(code)
            this._isRunning = false;
        })
    }

    private canRun() {
        return !this._isRunning;
    }

    isRunning(): boolean {
        return this._isRunning;
    }
}

export function throwIntrupptedError() {
    //throw new InterruptedError;
    console.log("interrupted!!!!!");
}

export class InterruptedError extends Error {
}