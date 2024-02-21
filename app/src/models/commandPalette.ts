import { ICommandTextValidator } from "../stores/commandPaletteStore";
import { v4 as uuidv4 } from 'uuid';

export type ElementType = "COMMAND" | "SEPARATOR" | "LABEL";

export interface ICommandItem {
    id: string,
    header: string,
    subHeader?: string,
    elementType: ElementType,
    groupTag?: string,
    canShow?: boolean;
    isSelected?: boolean;
    updateCanShow?: (args: ICallbackArgs) => boolean,
    callback?: (args: ICallbackArgs) => void,
    onMouseLeave?: (commandItem: ICommandItem) => void;
    onMouseEnter?: (commandItem: ICommandItem) => void;
    onSelected?: (commandItem: ICommandItem) => void;
    onUnselected?: (commandItem: ICommandItem) => void;
}


export interface ICallbackArgs {
    text: string,
    setValidationResult: (result: ICommandTextValidationResult) => void
}

export interface ICommandTextValidationResult {
    isValid: boolean,
    validationMessage: string
}

export class CommandItem implements ICommandItem {
    readonly id: string = uuidv4();
    canShow: boolean = true;
    isSelected: boolean = false;
    header: string = "";
    subHeader?: string;
    elementType: ElementType = "COMMAND";
    groupTag?: string = "";
    callback?: (args: ICallbackArgs) => void;
    onMouseEnter?: (commandItem: ICommandItem) => void;
    onMouseLeave?: (commandItem: ICommandItem) => void;
    onSelected?: (commandItem: ICommandItem) => void;
    onUnselected?: (commandItem: ICommandItem) => void;
    updateCanShow?: ((args: ICallbackArgs) => boolean) | undefined;
    constructor(init?: Partial<CommandItem>) {
        Object.assign(this, init);
    }
}

export class Separator extends CommandItem {
    constructor(init?: Partial<Separator>) {
        super();
        this.elementType = "SEPARATOR";
        Object.assign(this, init);
    }
}

export class Label extends CommandItem {
    constructor(init?: Partial<Label>) {
        super();
        this.elementType = "LABEL";
        Object.assign(this, init);
    }
}

export interface ICommandPaletteOptions {
    lockModal: boolean;
    hint: string;
    text: string;
    filtering: boolean;
    commandItems: ICommandItem[];
    validator: ICommandTextValidator;
    closeAuto: boolean,
}

export class DefaultTextValidator implements ICommandTextValidator {
    validate = async (_: string) => {
        return {
            isValid: true,
            validationMessage: ""
        };
    }
}

export class CommandPaletteOptions implements ICommandPaletteOptions {
    lockModal = false;
    hint = "";
    text = "";
    filtering = true;
    commandItems: ICommandItem[] = [];
    closeAuto = true;
    validator: ICommandTextValidator;
    constructor(init?: Partial<CommandPaletteOptions>) {
        this.validator = new DefaultTextValidator();
        Object.assign(this, init);
    }
}