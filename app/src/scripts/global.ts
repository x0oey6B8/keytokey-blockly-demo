import { IKeyboard, Keyboard } from "./features/keyboard";
import { IMouse, Mouse } from "./features/mouse";

export interface IGlobal {
    isInterruptionReqested: boolean;
    alert: (text: string) => void;
    wait: (time: number, highPrecision: boolean) => boolean;
    cancelWait: () => void;
    keyboard: IKeyboard;
    mouse: IMouse;
}

export interface IGlobalFactory {
    create(): IGlobal;
}

export class GlobalFactory implements IGlobalFactory {
    create(): IGlobal {
        return {
            isInterruptionReqested: false,
            keyboard: new Keyboard,
            mouse: new Mouse,
            // @ts-ignore
            alert: function (text: string) {
            },
            // @ts-ignore
            wait: function (time, highPrecision) {
                return true;
            },
            cancelWait: function () {
            }
        }
    }
}

export class DebuggableGlobalFactory implements IGlobalFactory {
    create(): IGlobal {
        return {
            isInterruptionReqested: false,
            keyboard: new Keyboard,
            mouse: new Mouse,
            // @ts-ignore
            alert: function (text: string) {
                console.log(text);
            },
            // @ts-ignore
            wait: function (time, highPrecision) {
                console.log(`wait: ${time}`);
            },
            cancelWait: function () {
                console.log("cancelWait()");
            }
        }
    }
}


export class GlobalRegistry {
    public static register(global: IGlobal): void {
        if (!global) {
            return;
        }

        const w = (window as any);
        const keys = Object.keys(global);
        const values = Object.values(global);
        console.log(values);
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const value = values[index];
            w[key] = value;
        }
    }

}