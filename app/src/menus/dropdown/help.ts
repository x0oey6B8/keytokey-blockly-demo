import { host } from "../../hosts/host";
import { CommandItem, CommandPaletteOptions } from "../../models/commandPalette";
import { IDropDownMenuItem } from "../../models/dropdown";
import { useAppStore } from "../../stores/appStore";
import { useCommandPaletteStore } from "../../stores/commandPaletteStore";

export class ShowUsage implements IDropDownMenuItem {
    header = "ブロックマクロについて";
    subHeader = "help";
    condition = () => true;
    clicked = () => {
        host.utils.openInBrowser("https://github.com/x0oey6B8/KeyToKey-Web/wiki/ブロックマクロ");
    };
}

export class ShowShortcutList implements IDropDownMenuItem {
    header = "ショートカット一覧";
    subHeader = "help";
    condition = () => true;
    clicked = () => {
        const appStore = useAppStore();
        appStore.shortcutPage.isShowing = true;
    };
}

export class OpenLatestAppPage implements IDropDownMenuItem {
    header = "最新のアプリページを開く";
    subHeader = "help";
    condition = () => true;
    clicked = async () => {
        await fetch("https://api.github.com/repos/x0oey6B8/keytokey-blockly-demo/commits?per_page=1&page=1")
            .then(res => res.json())
            .then(json => {
                const commitId = json[0].sha.substring(0, 7);
                const url = `https://x0oey6b8.github.io/keytokey-blockly-demo/root/index.html?version=${commitId}`
                window.location.href = url;
            });
    }
}

export class OpenUrl implements IDropDownMenuItem {
    header = "URLを開く";
    subHeader = "help";
    condition = () => true;
    clicked = async () => {
        const currentUrl = window.location.href;
        const options = new CommandPaletteOptions({
            text: currentUrl,
            hint: "URL",
            filtering: false,
            closeAuto: true,
            commandItems: [
                new CommandItem({
                    header: "URLを開く",
                    callback: (args) => {
                        window.location.href = args.text;
                    }
                })
            ]
        });
        const store = useCommandPaletteStore();
        store.open(options);
    }
}