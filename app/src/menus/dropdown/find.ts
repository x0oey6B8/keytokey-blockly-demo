
import { IDropDownMenuItem } from "../../models/dropdown";
import { useBlocklyStore } from "../../stores/blocklyStore";
import { useCommandPaletteStore } from "../../stores/commandPaletteStore";
import * as BlocklyMenus from "../commands/blockly"

export class FindEntryProcedureBlockMenuItem implements IDropDownMenuItem {
    header = "「ここから実行」ブロックを探す";
    subHeader = "find";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        blocklyStore.getCurrentWorkspaceSession()?.centerToEntryBlock();
    };
}

export class FindBlockByIdMenuItem implements IDropDownMenuItem {
    header = "IDからブロックを探す";
    subHeader = "find";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        const workspaceSession = blocklyStore.getCurrentWorkspaceSession()
        if (workspaceSession) {
            const blocks = workspaceSession.getAllBlocks();
            if (blocks) {
                const commandItems = blocks.map(block => new BlocklyMenus.FindBlockCommandItem(block));
                const commandOptions = new BlocklyMenus.FindBlockCommandOptioins();
                commandOptions.commandItems = commandItems;
                const commandStore = useCommandPaletteStore();
                commandStore.open(commandOptions);
            }
        }
    };
}

export class FindProcedureBlockFromListMenuItem implements IDropDownMenuItem {
    header = "関数を一覧から探す";
    subHeader = "find";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        const blocks = blocklyStore.getCurrentWorkspaceSession()?.getProcedureBlocksByName();
        if (blocks) {
            const commandOptions = new BlocklyMenus.FindProcedureBlockFromListCommandOptions();
            commandOptions.commandItems = blocks.map(data => new BlocklyMenus.FindProcedureBlockCommandItem(data.block, data.name));
            const commandStore = useCommandPaletteStore();
            commandStore.open(commandOptions);
        }
    };
}

export class ReplayMenuItem implements IDropDownMenuItem {
    header = "フォーカス";
    subHeader = "find";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();
        const workspaceSession = blocklyStore.getCurrentWorkspaceSession()
        if (workspaceSession) {
            const blocks = workspaceSession.getAllBlocks();
            let i = 0;
            const id = window.setInterval(() => {
                if (i > blocks.length) {
                    console.log(id);
                    window.clearInterval(id);
                }
                workspaceSession.centerTo(blocks[i++]);
            }, 50)
        }
    };
}