import { FileType } from "../hosts/macroManager";

export interface IFileTemplate {
    header: string;
    subHeader: string;
    type: FileType;
    javascript: string;
    json: string;
}

export interface IFileTempalteGroup {
    name: string,
    templates: IFileTemplate[];
}