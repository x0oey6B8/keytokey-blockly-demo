
export interface IPathUtils {
    isValidPathChars: (text: string) => Promise<boolean>;
}

export class PathUtils implements IPathUtils {
    constructor(private hostObjects: any) {
    }

    isValidPathChars = async (text: string) => {
        return await this.hostObjects.pathUtils.IsValidPathChars(text);
    }
}

export class PathUtilsPseudo implements IPathUtils {
    // @ts-ignore
    isValidPathChars = async (text: string) => {
        return true;
    }
}