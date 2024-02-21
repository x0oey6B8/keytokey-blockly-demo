import { IHistory, IHistorySession } from "../../hosts/debug";
import { CommandItem, CommandPaletteOptions } from "../../models/commandPalette";
import { useBlocklyStore } from "../../stores/blocklyStore";
import { wait } from "../../utilities/wait";

export class SessionSelectionCommandOptions extends CommandPaletteOptions {
    constructor(history: IHistory) {
        super();
        this.commandItems = history.sessions.reverse().map(session => new SessionSelectionCommandItem(session));
        this.hint = "再生したい履歴を選択してください";
    }
}

class SessionSelectionCommandItem extends CommandItem {
    constructor(session: IHistorySession) {
        super();
        const date = new Date(session.creationTime);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ms = date.getMilliseconds();
        this.header = `[${session.loggedBlockIds.length}]${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}.${ms}`;
        this.callback = async () => {
            const blocklyStore = useBlocklyStore();
            const workspaceSession = blocklyStore.getCurrentWorkspaceSession();
            if (workspaceSession) {
                for (const id of session.loggedBlockIds.reverse()) {
                    const block = workspaceSession.workspaceSvg.getBlockById(id);
                    if (block) {
                        workspaceSession.centerTo(block);
                    }
                    await wait(750);
                }
            }
        }
    }
}