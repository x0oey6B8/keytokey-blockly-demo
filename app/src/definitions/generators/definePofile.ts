import { BlockCodeGenerator } from "./codeGenerator";

export class PROFILE_IS_ENABLED extends BlockCodeGenerator {
    name = "profile_is_enabled";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const value = this.getFieldValue(block, "VALUE");
        const prefix = value === "DISABLED" ? "!" : "";
        const code = `${prefix}profile.isEnabled`;
        return { code, order: "NONE" };
    }
}

export class PROFILE_CAN_WORK_ON_ACTIVE_WINDOW extends BlockCodeGenerator {
    name = "profile_can_work_on_active_window";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const value = this.getFieldValue(block, "VALUE");
        const prefix = value === "CANNOT" ? "!" : "";
        const code = `${prefix}profile.canWorkOnActiveWindow`;
        return { code, order: "NONE" };
    }
}

export class PROFILE_CAN_WORK extends BlockCodeGenerator {
    name = "profile_can_work";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const value = this.getFieldValue(block, "VALUE");
        const prefix = value === "CANNOT" ? "!" : "";
        const code = `${prefix}profile.canWork`;
        return { code, order: "NONE" };
    }
}

export class PROFILE_GET_NAME extends BlockCodeGenerator {
    name = "profile_get_name";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const value = this.getFieldValue(block, "VALUE");
        const prefix = value === "CANNOT" ? "!" : "";
        const code = `${prefix}profile.name`;
        return { code, order: "NONE" };
    }
}

export class CHANGE_PROFILE extends BlockCodeGenerator {
    name = "change_profile";
    // @ts-ignore
    generateCode(block: BlockSvg): GeneratedCode {
        const profileName = this.valueToCode(block, "NAME", "NONE");
        const code = `profile.changeTo(${profileName});\n`;
        return { code, order: "RAW" };
    }
}