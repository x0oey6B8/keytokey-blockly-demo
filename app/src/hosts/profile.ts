export interface IProfile {
    getName: () => Promise<string>;
}

export class Profile implements IProfile {

    constructor(private hostObjects: any) {
    }

    getName = async () => {
        return this.hostObjects.profile.GetName();
    }
}

export class ProfilePseudo implements IProfile {
    getName = async () => {
        return "profile";
    }
}