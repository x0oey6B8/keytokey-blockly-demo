import { IPathUtils } from "./pathUtils";

export function getHostObjects() {
    // @ts-ignore
    const hostObjects = (chrome?.webview?.hostObjects as any);
    return hostObjects;
}

class HostObjects implements IHostObjects {
    hostObjects: any
    constructor(hostObjects: any) {
        this.hostObjects = hostObjects;
    }

    hasHost = () => this.hostObjects != null && this.hostObjects != undefined;

    pathUtils: IPathUtils = {
        isValidPathChars: async (text: string) => {
            return await this.hostObjects.pathUtils.IsValidPathChars(text);
        },
    }

    macroManager: IMacroManager = {
        create: async (request: ICreationRequest) => {
            const json = await this.hostObjects.macroManager.Create(JSON.stringify(request));
            const settings: ICreationResult = JSON.parse(json);
            return settings;
        },
        list: async () => {
            if (!this.hasHost()) {
                return [];
            }
            const json = await this.hostObjects.macroManager.List();
            const settings: IMacroSetting[] = JSON.parse(json);
            return settings;
        },
        select: async (request: ISelectRequest) => {
            const json = await this.hostObjects.macroManager.SelectMacro(JSON.stringify(request));
            const file: IMacroSetting = JSON.parse(json);
            return file;
        },
        hasMacroSelected: async () => {
            return await this.hostObjects.macroManager.HasMacroSelected();
        },
        changeFile: async (request: ISelectRequest) => {
            return await this.hostObjects.macroManager.TryChangeFile(JSON.stringify(request));
        },
        getCurrentFile: async () => {
            const json = await this.hostObjects.macroManager.GetCurrentFile();
            const file: IMacroFile = JSON.parse(json);
            return file;
        },
        save: async (json: string, jsCode: string) => {
            return await this.hostObjects.macroManager.Save(json, jsCode);
        }
    }
}

interface IHostObjects {
    hasHost: () => boolean;
    pathUtils: IPathUtils;
    macroManager: IMacroManager;
}

interface ICreationResult {
    hasError: boolean;
    errorMessage: string;
    createdId: string;
}

interface ICreationRequest {
    name: string;
}

interface ISelectRequest {
    name: string;
}

export const host: IHostObjects = new HostObjects(getHostObjects());

export interface IMacroManager {
    create: (request: ICreationRequest) => Promise<ICreationResult>
    list: () => Promise<IMacroSetting[]>;
    select: (macroName: ISelectRequest) => Promise<IMacroSetting>,
    changeFile: (name: ISelectRequest) => Promise<boolean>
    getCurrentFile: () => Promise<IMacroFile>,
    save: (json: string, jsCode: string) => Promise<boolean>,
    hasMacroSelected: () => Promise<boolean>
}

export interface IMacroSetting {
    id: string;
    name: string;
    entryFile: string;
    eventFiles: Record<EventType, string>;
}

export enum EventType {
    MacroEnded = 0,
    KeyPressed = 1,
    KeyReleased = 2,
    MouseMoved = 3,
    TriggerPressed = 4,
    TriggerReleased = 5,
}

export interface IMacroFile {
    name: string,
    json: string,
    javascriptCode: string
}