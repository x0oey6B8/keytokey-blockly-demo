export interface IInputListener {
    waitForInput(request: IWaitForInputRequest): Promise<IInputReceivedArgs>;
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
    waitForInput = async (request: IWaitForInputRequest) => {
        return {
            type: request.listenType,
            name: "A"
        };
    }
}