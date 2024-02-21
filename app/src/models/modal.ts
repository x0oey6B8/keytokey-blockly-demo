export interface IModalState {
    isShowing: boolean;
    lock: boolean;
    stateChanged: () => void;
}

export class ModalStateFactory {
    static create(): IModalState {
        return {
            isShowing: false,
            lock: false,
            stateChanged: () => { }
        }
    }
}