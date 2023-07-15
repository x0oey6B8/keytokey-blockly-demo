import { IKeyboard, Keyboard } from "./features/keyboard";
import { IMouse, Mouse } from "./features/mouse";

export interface IGlobal {
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
        // 注意：methodではなくfunctionにすること
        return {
            keyboard: new Keyboard,
            mouse: new Mouse,
            alert: function (text: string) {
                //window.alert(text)
            },
            wait: function (time, highPrecision) {
                return true;
            },
            cancelWait: function () {

            }
        }
    }
}