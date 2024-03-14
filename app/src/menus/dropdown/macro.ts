import { IDropDownMenuItem } from "../../models/dropdown";
import { useAppStore } from "../../stores/appStore";

export class OpenMacroSetting implements IDropDownMenuItem {
    header = "設定";
    subHeader = "macro";
    condition = () => true;
    clicked = () => {
        const appStore = useAppStore();
        appStore.openMacroSetting();
    };
}

export class OpenAddFileToMacro implements IDropDownMenuItem {
    header = "イベントを追加";
    subHeader = "macro";
    condition = () => true;
    clicked = () => {
        const appStore = useAppStore();
        appStore.openMenuToAddFile();
    };
}

export class OpenMacroParameterEditor implements IDropDownMenuItem {
    header = "引数の設定";
    subHeader = "macro";
    condition = () => true;
    clicked = () => {
        const appStore = useAppStore();
        appStore.openParameterEditor();
    };
}