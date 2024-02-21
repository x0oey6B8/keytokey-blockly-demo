import { fileTemplateGroups } from "../definitions/files/fileTemplates";
import { IRequestResult, hasHost, host } from "./host";
import { v4 as uuidv4 } from 'uuid';

export class MacroManager implements IMacroManager {

    constructor(private hostObjects: any) {
    }

    setImplementation = async (request: ISetImplementationCodeRequest) => {
        const json = await this.hostObjects.macroManager.SetImplementation(JSON.stringify(request));
        const result: IRequestResult = JSON.parse(json);
        return result;
    }

    create = async (request: IMacroCreationRequest) => {
        const json = await this.hostObjects.macroManager.Create(JSON.stringify(request));
        const result: IRequestResult = JSON.parse(json);
        return result;
    }

    updateSetting = async (macroSetting: IMacroSetting) => {
        const request: IMacroSettingUpdateRequest = { macroSetting }
        console.log(JSON.stringify(request));

        const json = await this.hostObjects.macroManager.UpdateMacroSetting(JSON.stringify(request));
        const result: IRequestResult = JSON.parse(json);
        return result;
    }

    clone = async (request: IMacroCloneRequest) => {
        const json = await this.hostObjects.macroManager.Clone(JSON.stringify(request));
        const result: IRequestResult = JSON.parse(json);
        return result;
    }

    delete = async (request: IMacroDeletionRequest) => {
        const json = await this.hostObjects.macroManager.Delete(JSON.stringify(request));
        const result: IRequestResult = await JSON.parse(json);
        return result;
    }

    getAssignCount = async (request: IGetAssignCountRequest) => {
        const json = await this.hostObjects.macroManager.GetAssignCount(JSON.stringify(request));
        const result: IRequestResult = await JSON.parse(json);
        const countResult: IGetAssignCountResult = JSON.parse(result.json);
        return countResult.count;
    }

    rename = async (request: IMacroRenameRequest) => {
        const json = await this.hostObjects.macroManager.Rename(JSON.stringify(request));
        const result: IRequestResult = JSON.parse(json);
        return result;
    }

    list = async () => {
        if (!hasHost()) {
            return [];
        }
        const json = await this.hostObjects.macroManager.List();
        const settings: IMacroSetting[] = JSON.parse(json);
        console.log(settings);
        return settings.map(setting => new Macro(setting));
    }

    addFile = async (request: IAddFileRequest) => {
        const json = await this.hostObjects.macroManager.AddFile(JSON.stringify(request));
        const result: IRequestResult = JSON.parse(json);
        return result;
    }

    removeFile = async (request: IRemoveFileRequest) => {
        const json = await this.hostObjects.macroManager.RemoveFile(JSON.stringify(request));
        const result: IRequestResult = JSON.parse(json);
        return result;
    }

    write = async (request: IWriteRequest) => {
        console.log("write", request);
        const json = await this.hostObjects.macroManager.WriteFile(JSON.stringify(request));
        const result: IRequestResult = JSON.parse(json);
        return result;
    }

    find = async (request: IFindMacroRequest) => {
        const json = await this.hostObjects.macroManager.Find(JSON.stringify(request));
        const setting: IMacroSetting = JSON.parse(json);
        return new Macro(setting);
    }

    read = async (file: IFileInfo): Promise<IMacroFileContent> => {
        console.log("read", file);
        const json = await this.hostObjects.macroManager.ReadFile(JSON.stringify(file));
        const result: IRequestResult = JSON.parse(json);
        const content: IMacroFileContent = JSON.parse(result.json);
        return content;
    }
}

export class MacroManagerPseudo implements IMacroManager {

    constructor(private macroStorage: LocalMacroStorage = new LocalMacroStorage()) {
    }

    create = async (request: IMacroCreationRequest) => {
        return await this.macroStorage.create(request);
    }

    updateSetting = async (macroSetting: IMacroSetting) => {
        return await this.macroStorage.updateSetting(macroSetting);
    }

    clone = async (request: IMacroCloneRequest) => {
        return await this.macroStorage.clone(request);
    }

    delete = async (request: IMacroDeletionRequest) => {
        return await this.macroStorage.delete(request);
    }

    // @ts-ignore
    getAssignCount = async (request: IGetAssignCountRequest) => {
        return 0;
    }

    rename = async (request: IMacroRenameRequest) => {
        return await this.macroStorage.rename(request);
    }

    list = async () => {
        return this.macroStorage.settings.map(setting => new Macro(setting));
    }

    find = async (request: IFindMacroRequest) => {
        const setting = await this.macroStorage.find(request);
        if (!setting) {
            throw new Error("マクロが見つかりませんでした");
        }
        return new Macro(setting);
    }

    addFile = async (request: IAddFileRequest) => {
        const hasError = await this.macroStorage.addFile(request);
        const result: IRequestResult = {
            hasError,
            errorMessage: "",
            json: ""
        };
        return result;
    }

    removeFile = async (request: IRemoveFileRequest) => {
        const hasError = await this.macroStorage.removeFile(request);
        const result: IRequestResult = {
            hasError,
            errorMessage: "",
            json: ""
        };
        return result;
    }

    read = async (file: IFileInfo): Promise<IMacroFileContent> => {
        const json = await this.macroStorage.read(file);
        return json;
    }

    write = async (request: IWriteRequest) => {
        const hasError = await this.macroStorage.write(request);
        const result: IRequestResult = {
            hasError,
            errorMessage: "",
            json: ""
        };
        return result;
    }

    setImplementation = async (): Promise<IRequestResult> => {
        const result: IRequestResult = {
            hasError: false,
            errorMessage: "",
            json: ""
        };
        return result;
    }
}

export class LocalMacroStorage {
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
            id: uuidv4(),
            category: "",
            files: [
                {
                    id: uuidv4(),
                    name: request.fileName,
                    type: request.type
                }
            ],
            debug: {
                logger: {
                    isEnabled: false
                }
            },
            preload: true
        });
        this.fileContents.push({
            javascriptCode: request.javascript,
            json: request.json,
            path: this.createPath(request.macroName, request.fileName)
        });
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
            // マクロ設定の複製
            const setting: IMacroSetting = JSON.parse(JSON.stringify(this.settings[index]));
            setting.name = request.newMacroName;
            setting.id = uuidv4();
            setting.files.forEach(file => file.id = uuidv4());
            this.settings.push(setting);

            // ファイル設定の複製
            const oldPrefix = request.sourceMacroName + "/";
            const contents = this.fileContents.filter(content => content.path.startsWith(oldPrefix));
            const newPrefix = request.newMacroName + "/";
            for (const content of contents) {
                const clonedContent: ILocalMacroFileContent = JSON.parse(JSON.stringify(content));
                clonedContent.path = clonedContent.path.replace(oldPrefix, newPrefix);
                this.fileContents.push(clonedContent);
            }
            this.save();
        }
        return this.noProblem();
    }

    async delete(request: IMacroDeletionRequest): Promise<IRequestResult> {
        this.settings = this.settings.filter(macroSetting => macroSetting.name !== request.macroName);
        this.fileContents = this.fileContents.filter(content => !content.path.startsWith(request.macroName));
        this.save();
        return this.noProblem();
    }

    async rename(request: IMacroRenameRequest): Promise<IRequestResult> {
        const setting = this.settings.find(macroSetting => macroSetting.name === request.sourceMacroName);
        if (setting) {
            setting.name = request.newMacroName;
            const oldPrefix = request.sourceMacroName + "/";
            const newPrefix = request.newMacroName + "/";
            const contents = this.fileContents.filter(content => content.path.startsWith(oldPrefix));
            for (const content of contents) {
                content.path = content.path.replace(oldPrefix, newPrefix);
            }
            this.save();
        }
        return this.noProblem();
    }

    async write(request: IWriteRequest) {
        console.log(request);
        const file = this.findFile(request.macroName, request.fileName);
        file.javascriptCode = request.javascript;
        file.json = request.json;
        this.save();
        return true;
    }

    async addFile(request: IAddFileRequest) {
        const macroName = request.macroName;
        const fileName = request.fileName;
        const macroSetting = await this.find({ macroName: macroName });
        if (macroSetting) {
            const filePath = this.createPath(macroName, fileName);
            const fileExists = this.fileExists(macroName, fileName);
            if (!fileExists) {
                this.fileContents.push({
                    javascriptCode: request.javascript,
                    json: request.json,
                    path: filePath
                });
            }
        }
        this.save();
        return false;
    }

    async removeFile(request: IRemoveFileRequest) {
        const macroName = request.macroName;
        const macroSetting = await this.find({ macroName: macroName });
        if (macroSetting) {
            const fileName = request.fileName;
            const filePath = this.createPath(macroName, fileName);
            const fileExists = this.fileExists(macroName, fileName);
            if (fileExists) {
                this.fileContents = this.fileContents.filter(content => content.path !== filePath);
                this.save();
            }
        }
        return true;
    }

    async read(request: IFileInfo): Promise<IMacroFileContent> {
        const result = this.findFile(request.macroName, request.fileName);
        return {
            name: request.fileName,
            javascriptCode: result.javascriptCode,
            json: result.json
        }
    }

    fileExists(macroName: string, fileName: string) {
        const filePath = this.createPath(macroName, fileName);
        const exists = this.fileContents.some(content => content.path.toLowerCase() === filePath.toLowerCase());
        return exists;
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

export interface ILocalMacroFileContent {
    path: string;
    json: string;
    javascriptCode: string;
}

export class Macro {

    get name(): string {
        return this.setting.name;
    }

    constructor(public setting: IMacroSetting) {
    }

    async delete() {
        return await host.macroManager.delete({
            macroName: this.setting.name,
        })
    }

    async renameTo(newName: string) {
        return await host.macroManager.rename({
            newMacroName: newName,
            sourceMacroName: this.setting.name
        })
    }

    listFiles(): MacroFile[] {
        const files: MacroFile[] = [];
        for (const file of this.setting.files) {
            files.push(new MacroFile(this, file));
        }
        return files;
    }

    async removeFile(file: MacroFile) {
        const request: IRemoveFileRequest = {
            fileName: file.setting.name,
            macroName: file.macro.setting.name,
            type: file.setting.type
        };
        const result = await host.macroManager.removeFile(request);
        if (!result.hasError) {
            return;
        }
        const i = this.setting.files.findIndex(f => f.id === file.setting.id);
        this.setting.files.splice(i, 1);
        this.applySetting();
    }

    fileExists(type: FileType): boolean {
        return this.setting.files.some(file => file.type === type);
    }

    async applySetting() {
        return await host.macroManager.updateSetting(this.setting);
    }
}

export class MacroFile {

    canWrite: boolean = false;

    constructor(public macro: Macro, public setting: IMacroFileSetting) {
    }

    async read(): Promise<IMacroFileContent> {
        const file = await host.macroManager.read({
            macroName: this.macro.setting.name,
            fileName: this.setting.name,
            type: this.setting.type
        });
        return file;
    }

    async write(json: string, javascriptCode: string) {

        if (!this.canWrite) {
            return;
        }

        await host.macroManager.write({
            macroName: this.macro.setting.name,
            fileName: this.setting.name,
            type: this.setting.type,
            json: json,
            javascript: javascriptCode,
        })
    }

    getDisplayName() {
        if (this.setting.type === "MAIN") {
            return this.macro.setting.name;
        }

        const template = fileTemplateGroups
            .map(group => group.templates)
            .reduce((total, current) => total.concat(current), [])
            .find(template => template.type === this.setting.type);

        if (template) {
            return template.header;
        }

        return this.setting.name;
    }
}

export interface IMacroManager {
    setImplementation: (request: ISetImplementationCodeRequest) => Promise<IRequestResult>;
    create: (request: IMacroCreationRequest) => Promise<IRequestResult>;
    updateSetting: (setting: IMacroSetting) => Promise<IRequestResult>;
    clone: (request: IMacroCloneRequest) => Promise<IRequestResult>;
    delete: (request: IMacroDeletionRequest) => Promise<IRequestResult>;
    getAssignCount: (request: IGetAssignCountRequest) => Promise<number>;
    rename: (request: IMacroRenameRequest) => Promise<IRequestResult>;
    list: () => Promise<Macro[]>;
    find: (request: IFindMacroRequest) => Promise<Macro>;
    addFile: (request: IAddFileRequest) => Promise<IRequestResult>;
    removeFile: (request: IRemoveFileRequest) => Promise<IRequestResult>
    write: (request: IWriteRequest) => Promise<IRequestResult>;
    read: (file: IFileInfo) => Promise<IMacroFileContent>;
}

export interface IMacroCreationRequest extends IWriteRequest {
}

export interface IMacroSettingUpdateRequest {
    macroSetting: IMacroSetting; // IMacroSetting
}

export interface IMacroDeletionRequest {
    macroName: string;
}

export interface IGetAssignCountRequest {
    macroName: string;
}

export interface IGetAssignCountResult {
    count: number;
}

export interface IMacroCloneRequest {
    newMacroName: string;
    sourceMacroName: string;
}

export interface IMacroRenameRequest {
    newMacroName: string;
    sourceMacroName: string;
}

export interface IAddFileRequest extends IWriteRequest {
}

export interface IRemoveFileRequest extends IFileInfo {
}

export interface IFindMacroRequest {
    macroName: string;
}

export interface IFileInfo {
    macroName: string;
    fileName: string;
    type: FileType;
}

export interface IWriteRequest extends IFileInfo {
    json: string;
    javascript: string;
}

export interface ISetImplementationCodeRequest {
    code: string;
}

export interface IMacroSetting {
    id: string;
    name: string;
    category: string;
    files: IMacroFileSetting[];
    debug: IDebugSetting;
    preload: boolean;
}

export interface IDebugSetting {
    logger: IDebugLogger;
}

export interface IDebugLogger {
    isEnabled: boolean;
}

export interface IMacroFileSetting {
    id: string;
    name: string;
    type: FileType;
}

export type FileType =
    "UNKNOWN"
    | "MAIN"
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

export class FileTypeToFileNameConverter {
    static convert = (fileType: FileType) => {
        switch (fileType) {
            case "MAIN": return "main"
            case "EVENT_MACRO_ENDED": return "end"
            case "EVENT_KEY_PRESSED": return "pressed"
            case "EVENT_KEY_RELEASED": return "released"
            case "EVENT_MOUSE_MOVED": return "mouse_moved"
            case "EVENT_TRIGGER_PRESSED": return "trigger_pressed"
            case "EVENT_TRIGGER_RELEASED": return "trigger_released"
            default:
                return "";
        }
    }
}