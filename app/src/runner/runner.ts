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
            try {
                this._isRunning = true;
                eval(code)
            } catch (error) {
                if (error instanceof InterruptedError) {
                    console.log("interrupted");
                }
            } finally {
                this._isRunning = false;
            }
        });
    }

    private canRun() {
        return !this._isRunning;
    }

    isRunning(): boolean {
        return this._isRunning;
    }
}

export function throwInterruptedError() {
    throw new InterruptedError;
}

export class InterruptedError extends Error {
}