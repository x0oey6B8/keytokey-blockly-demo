import { PromisifyFn, useDebounceFn } from "@vueuse/core";
import { fileTemplateGroups } from "../definitions/files/fileTemplates";
import { IRequestResult, hasHost, host } from "./host";
import { v4 as uuidv4 } from 'uuid';
import { useAppStore } from "../stores/appStore";

export class MacroManager implements IMacroManager {

    deboucedWrite: PromisifyFn<(request: IWriteRequest) => Promise<IRequestResult>> | undefined;

    constructor(private hostObjects: any) {
        this.deboucedWrite = useDebounceFn((request: IWriteRequest) => this.write(request), 1000);
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
        //console.log("write", request);
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

    deboucedWrite: PromisifyFn<(request: IWriteRequest) => Promise<IRequestResult>> | undefined;

    constructor(private macroStorage: LocalMacroStorage = new LocalMacroStorage()) {
        this.deboucedWrite = useDebounceFn((request: IWriteRequest) => this.write(request), 1000);
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
            parameters: [],
            id: uuidv4(),
            category: "",
            files: [
                {
                    id: uuidv4(),
                    name: request.fileName,
                    type: request.type
                }
            ],
            variable: {
                local: {
                    alwaysClear: true
                }
            },
            debug: {
                logger: {
                    enabled: false
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

    hasSetImplementationOnce = false;
    movingParameters: IMacroParameter[] = [];
    hasParameterChanged = false;
    debouncedApplySetting: PromisifyFn<() => void> | undefined = undefined;
    debouncedSetImplementation: PromisifyFn<(request: ISetImplementationCodeRequest) => Promise<void>> | undefined = undefined;

    get name(): string {
        return this.setting.name;
    }

    constructor(public setting: IMacroSetting) {
        this.debouncedApplySetting = useDebounceFn(() => this.applySetting(), 500);
        this.debouncedSetImplementation = useDebounceFn(async (request) => await this.setImplementation(request), 500);
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

    async setImplementation(request: ISetImplementationCodeRequest) {
        if (!this.hasSetImplementationOnce) {
            try {
                await host.macroManager.setImplementation(request);
                this.hasSetImplementationOnce = true;
            } catch (error) {

            }
        }
    }

    compareParameters(parameterNames: string[]): IParameterComparisonResult {
        const parameters = this.setting.parameters;
        let changedCount = 0;
        // パラメーターの数が異なる場合
        if (parameterNames.length != parameters.length) {
            // 新しいパラメーターの数が設定より多かった場合は追加されたとみなす
            if (parameterNames.length > parameters.length) {
                // 追加された数
                changedCount = parameterNames.length - parameters.length;
                // setting.parametersに無い名前の位置を探す
                const index = parameterNames.findIndex(name => !parameters.some(p => p.name == name));
                const addedNames = parameterNames.slice(index, index + changedCount);
                // 前回削除したパラメーターと一致するかどうか
                let moved = false;
                // 追加されたパラメーターの数と削除されたパラメーターの数が同じ場合
                if (changedCount === this.movingParameters.length) {
                    // 削除されたパラメーターの名前を配列で取得
                    const previousParamNames = this.movingParameters.map(p => p.name);
                    // 追加された名前が削除された名前とすべて一致しているかどうか
                    moved = addedNames.every(name => previousParamNames.includes(name));
                }
                return {
                    reason: "ADDED",
                    hasChanged: true,
                    changedCount,
                    index,
                    multipleChanged: false,
                    moved
                }
                // 新しいパラメターの数が設定より少なかった場合は削除されたとみなす
            } else if (parameterNames.length < parameters.length) {
                changedCount = parameters.length - parameterNames.length;
                // 新しいパラメーターの数と設定の数との差が2以上ある場合は複数削除されたものとみなす
                // UIにおいて複数接続されているブロックのうち、途中にあるブロックをドラッグした場合、
                // その後ろに続くブロック（末尾まで）がくっついてくるため複数のブロックを同時に削除することが可能
                // それ以外で複数削除することはできないため差が2以上の場合は特定の位置から末尾までが削除されたものと考えることができる
                if (changedCount >= 2) {
                    return {
                        reason: "REMOVED",
                        hasChanged: true,
                        multipleChanged: true,
                        index: parameterNames.length,
                        changedCount
                    }
                } else {
                    // 一つだけ削除された場合の処理；どのブロックが削除されたかを調べる
                    let index = 0;
                    for (; index < parameters.length; index++) {
                        // indexがparameterNames.lengthを超えた場合は最後のパラメーターが削除されたとみなす
                        if (index >= parameterNames.length) {
                            break;
                        }
                        const p1 = parameterNames[index];
                        const p2 = this.setting.parameters[index];
                        if (p1 != p2.name) {
                            break;
                        }
                    }
                    let deletedIndex = Math.max(0, index);
                    return {
                        reason: "REMOVED",
                        hasChanged: true,
                        changedCount: 1,
                        index: deletedIndex,
                        multipleChanged: false
                    }
                }
            }
            // パラメーターの数が同じ場合
        } else {
            // 追加／削除がなかった場合
            for (let index = 0; index < parameterNames.length; index++) {
                const p1 = parameterNames[index];
                const p2 = this.setting.parameters[index];
                // 名前が異なる場合
                if (p1 != p2.name) {
                    return {
                        reason: "RENAME",
                        hasChanged: true,
                        changedCount: 1,
                        index,
                        multipleChanged: false
                    }
                }
            }
        }
        // 変更が何もなかった場合
        return {
            reason: "NO_CHANGE",
            hasChanged: false,
            changedCount: 0,
            index: 0,
            multipleChanged: false,
        }
    }

    applyParameterChangedToSetting(parameterNames: string[], changedDetail: IParameterComparisonResult) {
        if (!changedDetail.hasChanged) {
            return;
        }
        const index = changedDetail.index;
        switch (changedDetail.reason) {
            case "ADDED":
                if (changedDetail.moved) {
                    this.setting.parameters.splice(index, 0, ...this.movingParameters);
                } else {
                    const params = parameterNames
                        .slice(index, index + changedDetail.changedCount)
                        .map(name => ({ name, valueType: "NUMBER", defaultValue: "0", description: `「${name}」の説明` } as IMacroParameter));
                    this.setting.parameters.splice(index, 0, ...params);
                }
                this.movingParameters = [];
                break;
            case "REMOVED":
                const removedParameters = this.setting.parameters.splice(index, changedDetail.changedCount);
                this.movingParameters = removedParameters;
                break;
            case "RENAME":
                this.setting.parameters[index].name = parameterNames[index];
                break;
        }

        if (this.debouncedApplySetting) {
            this.debouncedApplySetting();
        }
    }

    setParameters(parameterNames: string[]): boolean {
        const result = this.compareParameters(parameterNames);
        //console.log("[param]", "changed details", result);
        if (result.hasChanged) {
            this.hasParameterChanged = true;
            this.applyParameterChangedToSetting(parameterNames, result);
            return true; // changed
        }
        return false; // not changed
    }
}

export interface IParameterComparisonResult {
    hasChanged: boolean;
    reason: ParameterChangedReason;
    index: number;
    multipleChanged: boolean;
    changedCount: number;
    moved?: boolean;
}

export type ParameterChangedReason = "NO_CHANGE" | "ADDED" | "REMOVED" | "RENAME"

export class MacroFile {

    canWrite: boolean = false;

    deboucedWrite: PromisifyFn<(json: string, javascript: string) => Promise<void> | undefined>;


    constructor(public macro: Macro, public setting: IMacroFileSetting) {
        this.deboucedWrite = useDebounceFn((json: string, javascript: string) => this.write(json, javascript), 1000);
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
            console.log("cannot write");
            return;
        }

        await host.macroManager.write({
            macroName: this.macro.setting.name,
            fileName: this.setting.name,
            type: this.setting.type,
            json: json,
            javascript: javascriptCode,
        })
        const appStore = useAppStore();
        this.macro.setImplementation({
            macroName: this.macro.setting.name,
            code: appStore.implementation
        });
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
    deboucedWrite: PromisifyFn<(request: IWriteRequest) => Promise<IRequestResult>> | undefined;
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
    macroName: string;
}

export interface IMacroParameter {
    name: string;
    valueType: string;
    defaultValue: string;
    description: string;
}

export type ValueType = "NUMBER" | "STRING" | "BOOLEAN" | "KEYS" | "ANY";

export class ValueTypeToName {
    static convert(valueType: ValueType) {
        switch (valueType) {
            case "NUMBER": return "数値";
            case "STRING": return "文字列";
            case "BOOLEAN": return "真理値";
            case "KEYS": return "キー／マウス";
            case "ANY":
            default:
                return "任意";
        }
    }
}

export class ValueTypeToDefaultValue {
    static convert(valueType: ValueType) {
        switch (valueType) {
            case "NUMBER": return "0";
            case "STRING": return "\"文字列\"";
            case "BOOLEAN": return "False";
            case "KEYS": return "Keys.A";
            case "ANY":
            default:
                return "0";
        }
    }
}


export interface IMacroSetting {
    id: string;
    name: string;
    preload: boolean;
    parameters: IMacroParameter[];
    category: string;
    files: IMacroFileSetting[];
    variable: IVariableSetting;
    debug: IDebugSetting;
}

export interface IDebugSetting {
    logger: IDebugLogger;
}

export interface IDebugLogger {
    enabled: boolean;
}

export interface IVariableSetting {
    local: ILocalVariableSetting;
}

export interface ILocalVariableSetting {
    alwaysClear: boolean;
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
    | "EVENT_KEY_STATE_CHANGED"
    | "EVENT_MOUSE_MOVED"
    | "EVENT_TRIGGER_PRESSED"
    | "EVENT_TRIGGER_RELEASED"
    | "EVENT_CONTROLLER_STATE_CHANGED";

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
            case "EVENT_KEY_PRESSED": return "key_pressed"
            case "EVENT_KEY_RELEASED": return "key_released"
            case "EVENT_KEY_STATE_CHANGED": return "key_state_changed"
            case "EVENT_MOUSE_MOVED": return "mouse_moved"
            case "EVENT_TRIGGER_PRESSED": return "trigger_pressed"
            case "EVENT_TRIGGER_RELEASED": return "trigger_released"
            case "EVENT_CONTROLLER_STATE_CHANGED": return "controller_state_changed"
            default:
                return "";
        }
    }
}