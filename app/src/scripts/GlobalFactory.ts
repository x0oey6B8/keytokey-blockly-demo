import { IGlobal } from "./IGlobal";
import { Keyboard } from "./features/Keyboard";
import { Mouse } from "./features/Mouse";

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