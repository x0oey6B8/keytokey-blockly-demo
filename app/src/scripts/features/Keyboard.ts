export interface IKeyboard {
    findKey(keyName: string): IKey;
}

export interface IKey {
    down(): void;
    up(): void;
    tap(): void;
}

export class Keyboard implements IKeyboard {
    findKey(keyName: string): IKey {
        console.log(keyName);
        throw new Error("Method not implemented.");
    }
}

export class Key implements IKey {
    down(): void {
        throw new Error("Method not implemented.");
    }
    up(): void {
        throw new Error("Method not implemented.");
    }
    tap(): void {
        throw new Error("Method not implemented.");
    }
}