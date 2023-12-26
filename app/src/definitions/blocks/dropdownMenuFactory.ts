import { BlockColors } from "../../configurations/blockColors";
import { OutputType } from "./outputType";
import Blockly, { Block } from "blockly";

export interface IDropDownMenuItem {
    displayText: string;
    key: string;
    outputType: OutputType;
    tooltip: string;
}

export interface IDropDownMenu {
    fieldKey: string;
    menuItems: Blockly.MenuGenerator;
    fieldDropdown: Blockly.FieldDropdown;
    changeDisplay: ((p: Blockly.Events.Abstract) => void);
}

export interface IDropDownMenuFactory {
    create(block: Block, dropdownMenuKey: string, menuItems: IDropDownMenuItem[]): IDropDownMenu;
}

export class DropDownMenuFactory implements IDropDownMenuFactory {

    static Default = new DropDownMenuFactory();

    create(block: Block, dropdownMenuKey: string, menuItems: IDropDownMenuItem[]): IDropDownMenu {
        const menus: Blockly.MenuGenerator = menuItems.map(item => [item.displayText, item.key]);
        // @ts-ignore
        const changeDisplay = (e: Blockly.Events.Abstract) => {
            // switch (e.type) {
            //     case "drag":
            //     case "move":
            //     case "selected":
            //     case "create":
            //     case "toolbox_item_select":
            //         return;
            // }
            const dropdownValue = block.getFieldValue(dropdownMenuKey);
            const menuItem = menuItems.find(menuItem => menuItem.key === dropdownValue);
            if (menuItem) {
                block.setOutput(true, menuItem.outputType);
                block.setTooltip(menuItem.tooltip);
                switch (menuItem.outputType) {
                    case OutputType.Number:
                        block.setColour(BlockColors.Math);
                        break;
                    case OutputType.String:
                        block.setColour(BlockColors.Text);
                        break;
                    case OutputType.Boolean:
                        block.setColour(BlockColors.Logic);
                        break;
                    case OutputType.Keys:
                    case OutputType.ControllerButtons:
                    case OutputType.Direction:
                        block.setColour(BlockColors.Action);
                        break;
                    case OutputType.Point:
                        block.setColour(BlockColors.Point);
                        break;
                    case OutputType.Size:
                        block.setColour(BlockColors.Size);
                        break;
                }
            }
        };
        return {
            fieldKey: dropdownMenuKey,
            menuItems: menus,
            fieldDropdown: new Blockly.FieldDropdown(menus),
            changeDisplay
        };
    }
}