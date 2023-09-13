import { CommandItem, CommandPaletteOptions } from "../../models/commandPalette";
import { useBlocklyStore } from "../../stores/blocklyStore";
import { BlockSvg } from "blockly";

export class FindBlockCommandOptioins extends CommandPaletteOptions {
    hint: string = "ブロックIDを入力してください";
    constructor(init?: Partial<CommandPaletteOptions>) {
        super(init);
    }
}

export class FindBlockCommandItem extends CommandItem {
    constructor(block: BlockSvg) {
        super();
        this.header = block.id;
        this.subHeader = block.type;
        this.callback = () => {
            const blocklyStore = useBlocklyStore();
            const workspaceSession = blocklyStore.getCurrentWorkspaceSession()
            if (workspaceSession) {
                workspaceSession.centerTo(block);
                block.select();
            }
        }
    }
}

export class FindProcedureBlockFromListCommandOptions extends CommandPaletteOptions {
    hint: string = "";
    constructor(init?: Partial<CommandPaletteOptions>) {
        super(init);
    }
}

export class FindProcedureBlockCommandItem extends CommandItem {
    callback = async () => {
        const blocklyStore = useBlocklyStore();
        blocklyStore.getCurrentWorkspaceSession()?.centerTo(this.block);
    };
    constructor(private block: BlockSvg, name: string) {
        super();
        this.header = name;
        this.subHeader = block.id;
    }
}

