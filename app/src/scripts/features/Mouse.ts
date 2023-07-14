export interface IMouse {
    setOrigin(point: IPoint): void;
    moveTo(point: IPoint): void;
    moveRelative(delta: IDelta): void;
}

export interface IPoint {
    x: number;
    y: number;
}

export interface IDelta extends IPoint {
}

export class Mouse implements IMouse {
    setOrigin(point: IPoint): void {
        throw new Error("Method not implemented.");
    }
    moveTo(point: IPoint): void {
        throw new Error("Method not implemented.");
    }
    moveRelative(delta: IDelta): void {
        throw new Error("Method not implemented.");
    }
}