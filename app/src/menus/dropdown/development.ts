import { IDropDownMenuItem } from "../../models/dropdown";
import { useBlocklyStore } from "../../stores/blocklyStore";
import { useCommandPaletteStore } from "../../stores/commandPaletteStore";
import * as BlocklyMenus from "../commands/blockly"

export class TestMenuItem implements IDropDownMenuItem {
    header = "テスト";
    subHeader = "dev";
    condition = () => true;
    clicked = () => {
        const blocklyStore = useBlocklyStore();

    };
}