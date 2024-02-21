export class Debug implements IDebug {
    constructor(private hostObjects: any) {
    }

    getHistory = async (request: IGetHistoryRequest) => {
        const json = await this.hostObjects.debug.GetHistory(JSON.stringify(request));
        console.log(json);
        const history: IHistory = JSON.parse(json);
        return history;
    }
}

export class DebugPseudo implements IDebug {
    // @ts-ignore
    getHistory = async (request: IGetHistoryRequest) => {
        return { sessions: [] } as IHistory;
    }
}

export interface IDebug {
    getHistory(request: IGetHistoryRequest): Promise<IHistory>;
}

export interface IGetHistoryRequest {
    macroName: string;
    fileName: string;
}

export interface IHistorySession {
    creationTime: string;
    id: string;
    contentHashId: string;
    loggedBlockIds: string[];
}

export interface IHistory {
    sessions: IHistorySession[];
}