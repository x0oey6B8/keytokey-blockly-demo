export interface IInputListener {
    waitForInput(request: IWaitForInputRequest): Promise<IInputReceivedArgs>;
    startToLogCursorPositions(): void;
    stopLoggingCursorPositions(): void;
    changeTrigger(keyName: string): void;
    getTrigger(): Promise<string>;
}

export enum InputType {
    KeyboardOrMouse = 0,
    Controller = 1
}

export interface IInputReceivedArgs {
    type: InputType;
    name: string;
}

export interface IWaitForInputRequest {
    listenType: InputType;
}

export class InputListener implements IInputListener {
    constructor(private hostObjects: any) {
    }
    getTrigger(): Promise<string> {
        return this.hostObjects.inputListener.GetTrigger();
    }
    changeTrigger(keyName: string) {
        this.hostObjects.inputListener.ChangeTrigger(keyName);
    }
    startToLogCursorPositions(): void {
        this.hostObjects.inputListener.StartToLogCursorPositions();
    }
    stopLoggingCursorPositions(): void {
        this.hostObjects.inputListener.StopLoggingCursorPositions();
    }
    waitForInput = async (request: IWaitForInputRequest) => {
        const requestJsonString = JSON.stringify(request);
        const jsonString = await this.hostObjects.inputListener.WaitForInput(requestJsonString);
        const input: IInputReceivedArgs = JSON.parse(jsonString);
        return input
    }
}

export class InputListenerPseudo implements IInputListener {
    constructor() {
    }
    async getTrigger(): Promise<string> {
        return "LButton"
    }
    // @ts-ignore
    changeTrigger(keyName: string): void {
    }
    startToLogCursorPositions(): void {
    }

    stopLoggingCursorPositions(): void {
    }

    waitForInput = async (request: IWaitForInputRequest) => {
        return {
            type: request.listenType,
            name: "A"
        };
    }
}