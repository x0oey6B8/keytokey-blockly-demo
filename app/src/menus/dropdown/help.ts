import { IDropDownMenuItem } from "../../models/dropdown";
import { useAppStore } from "../../stores/appStore";

export class ShowUsage implements IDropDownMenuItem {
    header = "使用方法";
    subHeader = "help";
    condition = () => true;
    clicked = () => {
        const appStore = useAppStore();
        appStore.openDropdownMenus();
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