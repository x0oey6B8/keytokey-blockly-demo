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
        create: async (request: IMacroCreationRequest) => {
            const json = await this.hostObjects.macroManager.Create(JSON.stringify(request));
            const result: IRequestResult = JSON.parse(json);
            return result;
        },
        updateSetting: async (macroSetting: IMacroSetting) => {
            const request: IMacroSettingUpdateRequest = { macroSetting }
            console.log(JSON.stringify(request));

            const json = await this.hostObjects.macroManager.UpdateMacroSetting(JSON.stringify(request));
            const result: IRequestResult = JSON.parse(json);
            return result;
        },
        clone: async (request: IMacroCloneRequest) => {
            const json = await this.hostObjects.macroManager.Clone(JSON.stringify(request));
            const result: IRequestResult = JSON.parse(json);
            return result;
        },
        delete: async (request: IMacroDeletionRequest) => {
            const json = await this.hostObjects.macroManager.Delete(JSON.stringify(request));
            const result: IRequestResult = await JSON.parse(json);
            return result;
        },
        rename: async (request: IMacroRenameRequest) => {
            const json = await this.hostObjects.macroManager.Rename(JSON.stringify(request));
            const result: IRequestResult = JSON.parse(json);
            return result;
        },
        list: async () => {
            if (!this.hasHost()) {
                return [];
            }
            const json = await this.hostObjects.macroManager.List();
            const settings: IMacroSetting[] = JSON.parse(json);
            return settings.map(setting => new Macro(setting));
        },
        write: async (request: IWriteRequest) => {
            return await this.hostObjects.macroManager.WriteFile(JSON.stringify(request));
        },
        find: async (request: IFindMacroRequest) => {
            const json = await this.hostObjects.macroManager.Find(JSON.stringify(request));
            const setting: IMacroSetting = JSON.parse(json);
            return new Macro(setting);
        },
        read: async (file: IFileInfo): Promise<IMacroFileContent> => {
            const json = await this.hostObjects.macroManager.ReadFile(JSON.stringify(file));
            const content: IMacroFileContent = JSON.parse(json);
            return content;
        }
    }
}

interface IHostObjects {
    pathUtils: IPathUtils;
    macroManager: IMacroManager;
}

export interface IRequestResult {
    hasError: boolean;
    errorMessage: string;
    json: string;
}

export interface IMacroCreationRequest {
    macroName: string;
}

interface IMacroSettingUpdateRequest {
    macroSetting: IMacroSetting; // IMacroSetting
}

export interface IMacroDeletionRequest {
    macroName: string;
}

export interface IMacroCloneRequest {
    newMacroName: string;
    sourceMacroName: string;
}

export interface IMacroRenameRequest {
    newMacroName: string;
    sourceMacroName: string;
}

export interface IFindMacroRequest {
    macroName: string;
}

export interface IFileInfo {
    macroName: string;
    fileName: string;
}

export interface IWriteRequest extends IFileInfo {
    json: string;
    javascript: string;
}

export interface IMacroManager {
    create: (request: IMacroCreationRequest) => Promise<IRequestResult>;
    updateSetting: (setting: IMacroSetting) => Promise<IRequestResult>;
    clone: (request: IMacroCloneRequest) => Promise<IRequestResult>;
    delete: (request: IMacroDeletionRequest) => Promise<IRequestResult>;
    rename: (request: IMacroRenameRequest) => Promise<IRequestResult>;
    list: () => Promise<Macro[]>;
    find: (request: IFindMacroRequest) => Promise<Macro>;
    write: (request: IWriteRequest) => Promise<boolean>;
    read: (file: IFileInfo) => Promise<IMacroFileContent>;
}

export interface IMacroSetting {
    id: string;
    name: string;
    category: string;
    files: IMacroFileSetting[];
}

export interface IMacroFileSetting {
    id: string;
    name: string;
    type: ExecutionType;
}

export type ExecutionType =
    "UNKNOWN"
    | "ENTRY"
    | "EVENT_MACRO_ENDED"
    | "EVENT_KEY_PRESSED"
    | "EVENT_KEY_RELEASED"
    | "EVENT_MOUSE_MOVED"
    | "EVENT_TRIGGER_PRESSED"
    | "EVENT_TRIGGER_RELEASED";

export interface IMacroFileContent {
    name: string;
    json: string;
    javascriptCode: string;
}

export class Macro {

    get name(): string {
        return this.setting.name;
    }

    constructor(public setting: IMacroSetting) {
    }

    listFiles(): MacroFile[] {
        const files: MacroFile[] = [];
        for (const file of this.setting.files) {
            files.push(new MacroFile(this, file));
        }
        return files;
    }
}

export class MacroFile {
    constructor(public macro: Macro, public fileSetting: IMacroFileSetting) {

    }

    async read(): Promise<IMacroFileContent> {
        const file = await host.macroManager.read({
            macroName: this.macro.setting.name,
            fileName: this.fileSetting.name
        });
        return file;
    }

    async write(json: string, javascriptCode: string) {
        await host.macroManager.write({
            macroName: this.macro.setting.name,
            fileName: this.fileSetting.name,
            json: json,
            javascript: javascriptCode
        })
    }
}

class HostObjectsPseudo implements IHostObjects {

    constructor(private macroStorage: LocalMacroStorage = new LocalMacroStorage()) {
    }

    pathUtils: IPathUtils = {
        // @ts-ignore
        isValidPathChars: async (text: string) => {
            return true;
        },
    }

    macroManager: IMacroManager = {
        create: async (request: IMacroCreationRequest) => {
            return await this.macroStorage.create(request);
        },
        updateSetting: async (macroSetting: IMacroSetting) => {
            return await this.macroStorage.updateSetting(macroSetting);
        },
        clone: async (request: IMacroCloneRequest) => {
            return await this.macroStorage.clone(request);
        },
        delete: async (request: IMacroDeletionRequest) => {
            return await this.macroStorage.delete(request);
        },
        rename: async (request: IMacroRenameRequest) => {
            return await this.macroStorage.rename(request);
        },
        list: async () => {
            return this.macroStorage.settings.map(setting => new Macro(setting));
        },
        write: async (request: IWriteRequest) => {
            return await this.macroStorage.write(request);
        },
        find: async (request: IFindMacroRequest) => {
            const setting = await this.macroStorage.find(request);
            if (!setting) {
                throw new Error("マクロが見つかりませんでした");
            }
            return new Macro(setting);
        },
        read: async (file: IFileInfo): Promise<IMacroFileContent> => {
            return await this.macroStorage.read(file);
        }
    }
}

export interface ILocalMacroFileContent {
    path: string;
    json: string;
    javascriptCode: string;
}

class LocalMacroStorage {
    settings: IMacroSetting[] = [];
    fileContents: ILocalMacroFileContent[] = [];

    constructor() {
        this.load();
    }

    private load() {
        const settings = localStorage.getItem("settings");
        if (settings) {
            this.settings = JSON.parse(settings);
        }

        const fileContents = localStorage.getItem("fileContents");
        if (fileContents) {
            this.fileContents = JSON.parse(fileContents);
        }
    }

    save() {
        localStorage.setItem("settings", JSON.stringify(this.settings));
        localStorage.setItem("fileContents", JSON.stringify(this.fileContents));
    }

    noProblem(): IRequestResult {
        return {
            hasError: false,
            errorMessage: "",
            json: ""
        }
    }

    private createPath(macroName: string, fileName: string) {
        return macroName + "/" + fileName;
    }

    async create(request: IMacroCreationRequest): Promise<IRequestResult> {
        this.settings.push({
            name: request.macroName,
            id: crypto.randomUUID(),
            category: "",
            files: [
                {
                    id: crypto.randomUUID(),
                    name: "main",
                    type: "ENTRY"
                }
            ]
        });
        this.fileContents.push({
            javascriptCode: "",
            json: "[]",
            path: this.createPath(request.macroName, "main")
        })
        this.save();
        return this.noProblem();
    }

    async find(request: IFindMacroRequest): Promise<IMacroSetting | undefined> {
        return this.settings.find(setting => setting.name === request.macroName);
    }

    async updateSetting(setting: IMacroSetting): Promise<IRequestResult> {
        const index = this.settings.findIndex(macroSetting => macroSetting.id === setting.id);
        if (index > -1) {
            this.settings[index] = setting;
            this.save();
        }
        return this.noProblem();
    }

    async clone(request: IMacroCloneRequest): Promise<IRequestResult> {
        const index = this.settings.findIndex(macroSetting => macroSetting.name === request.sourceMacroName);
        if (index > -1) {
            const setting = JSON.parse(JSON.stringify(this.settings[index]));
            this.settings.push(setting);
            this.save();
        }
        return this.noProblem();
    }

    async delete(request: IMacroDeletionRequest): Promise<IRequestResult> {
        this.settings = this.settings.filter(macroSetting => macroSetting.name !== request.macroName);
        this.save();
        return this.noProblem();
    }

    async rename(request: IMacroRenameRequest): Promise<IRequestResult> {
        const index = this.settings.findIndex(macroSetting => macroSetting.name === request.sourceMacroName);
        if (index > -1) {
            this.settings[index].name = request.newMacroName;
            this.save();
        }
        return this.noProblem();
    }

    async write(request: IWriteRequest) {
        const file = this.findFile(request.macroName, request.fileName);
        file.javascriptCode = request.javascript;
        file.json = request.json;
        this.save();
        return true;
    }

    async read(request: IFileInfo): Promise<IMacroFileContent> {
        const file = this.findFile(request.macroName, request.fileName);
        return {
            name: request.fileName,
            javascriptCode: file.javascriptCode,
            json: file.json
        }
    }

    private findFile(macroName: string, fileName: string): ILocalMacroFileContent {
        const path = this.createPath(macroName, fileName);
        const macroSetting = this.settings.find(setting => setting.name === macroName);
        if (macroSetting) {
            const file = this.fileContents.find(file => file.path === path);
            if (file) {
                return file;
            }
        }
        return {
            path,
            javascriptCode: "",
            json: "[]"
        };
    }
}


const obj = getHostObjects();
export const host: IHostObjects = (obj ? new HostObjects(obj) : new HostObjectsPseudo());