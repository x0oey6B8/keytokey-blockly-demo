import { CommandItem, CommandPaletteOptions } from "../models/commandPalette";
import { useCommandPaletteStore } from "../stores/commandPaletteStore";

export interface IUtils {
    openInBrowser(url: string): void;
}

export class Utils implements IUtils {

    constructor(private hostObject: any) {
    }

    openInBrowser = (url: string) => {
        const commandPalette = useCommandPaletteStore();
        commandPalette.open(new CommandPaletteOptions({
            hint: "外部ブラウザでページを開きます。よろしいですか？",
            commandItems: [
                new CommandItem({ header: "はい", callback: () => this.hostObject.utils.OpenLinkInBrowser(url) }),
                new CommandItem({ header: "いいえ", callback: () => commandPalette.close() }),
            ]
        }));
    }
}

export class UtilsPseudo implements IUtils {
    openInBrowser(url: string): void {
        window.open(url, "_blank");
    }
}