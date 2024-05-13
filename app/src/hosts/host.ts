import { IDebug, Debug, DebugPseudo } from "./debug";
import { IInputListener, InputListener, InputListenerPseudo } from "./listener";
import { IMacroManager, MacroManager, MacroManagerPseudo } from "./macroManager";
import { IPathUtils, PathUtils, PathUtilsPseudo } from "./pathUtils";
import { IProfile, Profile, ProfilePseudo } from "./profile";
import { TemplateMatchingSettings, ITemplateMatchingSettings, DummyTemplateMatchingSettings } from "./templateMatchingSettings";
import { IUtils, Utils, UtilsPseudo } from "./utils";

export function getHostObjects() {
    // @ts-ignore
    const hostObjects = (chrome?.webview?.hostObjects as any);
    return hostObjects;
}

export function hasHost() {
    const hostObjects = getHostObjects();
    return hostObjects != null && hostObjects != undefined;
}

export interface IHostObjects {
    utils: IUtils;
    pathUtils: IPathUtils;
    macroManager: IMacroManager;
    templateMatchingSettings: ITemplateMatchingSettings;
    profile: IProfile;
    debug: IDebug;
    listener: IInputListener;
}

export interface IRequestResult {
    hasError: boolean;
    errorMessage: string;
    json: string;
}

export class HostObjects implements IHostObjects {
    constructor(private hostObjects: any) {
        this.utils = new Utils(this.hostObjects);
        this.macroManager = new MacroManager(this.hostObjects);
        this.profile = new Profile(this.hostObjects);
        this.pathUtils = new PathUtils(this.hostObjects);
        this.templateMatchingSettings = new TemplateMatchingSettings(this.hostObjects);
        this.debug = new Debug(this.hostObjects);
        this.listener = new InputListener(this.hostObjects);
    }
    utils: IUtils;
    listener: IInputListener;
    debug: IDebug;
    pathUtils: IPathUtils;
    macroManager: IMacroManager;
    templateMatchingSettings: ITemplateMatchingSettings;
    profile: IProfile;
}

export class HostObjectsPseudo implements IHostObjects {
    utils = new UtilsPseudo();
    listener = new InputListenerPseudo();
    debug = new DebugPseudo();
    profile = new ProfilePseudo();
    macroManager = new MacroManagerPseudo();
    pathUtils = new PathUtilsPseudo()
    templateMatchingSettings = new DummyTemplateMatchingSettings();
}


const obj = getHostObjects();
export const host: IHostObjects = obj ? new HostObjects(obj) : new HostObjectsPseudo();