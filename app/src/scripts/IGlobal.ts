import { IKeyboard } from "./features/Keyboard";
import { IMouse } from "./features/Mouse";

export interface IGlobal {
    alert: (text: string) => void;
    wait: (time: number, highPrecision: boolean) => boolean;
    cancelWait: () => void;
    keyboard: IKeyboard;
    mouse: IMouse;
}