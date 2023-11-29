import { getHostObjects } from "./host";

export interface ITemplateImage {
    Path: string;
    Width: number;
    Height: number;
}

export interface IBounds {
    Left: number;
    Top: number;
    Width: number;
    Height: number;
}

export interface ITemplateMatchingConfig {
    Identifier: string;
    Score: number;
    Process: string;
    TemplateImage: ITemplateImage;
    SearchBounds: IBounds;
}

export interface ITemplateMatchingSettings {
    listAll(): Promise<ITemplateMatchingConfig[]>;
    readImageAsBase64(identifier: string): Promise<string>;
}

export class TemplateMatchingSettings implements ITemplateMatchingSettings {

    constructor(private hostObject: any) {
        this.hostObject = getHostObjects();
    }

    async listAll(): Promise<ITemplateMatchingConfig[]> {
        const json = await this.hostObject.templateMatchingSettings.ListAll();
        const array: ITemplateMatchingConfig[] = JSON.parse(json);
        return array;
    }
    async readImageAsBase64(identifier: string): Promise<string> {
        const base64 = await this.hostObject.templateMatchingSettings.ReadImageAsBase64(identifier);
        return base64;
    }
}

export class DummyTemplateMatchingSettings implements ITemplateMatchingSettings {
    async listAll(): Promise<ITemplateMatchingConfig[]> {
        return [];
    }
    // @ts-ignore
    async readImageAsBase64(identifier: string): Promise<string> {
        return "";
    }
}