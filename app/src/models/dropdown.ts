import { CommandItem, CommandPaletteOptions, ICommandItem, Label, Separator } from "./commandPalette";

export interface IDropDownMenuItem {
    header: string,
    condition: () => boolean,
    clicked: () => void
}

export interface IAppDropDownMenu {
    header: string;
    menuItems: IDropDownMenuItem[]
}

export class DropDownCommandPaletteOptions extends CommandPaletteOptions {
    constructor(appMenus: IAppDropDownMenu[], converter: IDropDownMenuToCommandItems) {
        super();
        this.commandItems.push(...converter.convert(appMenus));
    }
}

export interface IDropDownMenuToCommandItems {
    convert(appMenus: IAppDropDownMenu[]): ICommandItem[];
}

export class DropDownMenuToCommandItems implements IDropDownMenuToCommandItems {
    convert(appMenus: IAppDropDownMenu[]): ICommandItem[] {
        const commandItems: ICommandItem[] = []
        for (const menu of appMenus) {
            commandItems.push(new Label({ header: menu.header, groupTag: menu.header }));
            commandItems.push(new Separator({ groupTag: menu.header }));
            for (const menuItem of menu.menuItems) {
                commandItems.push(new CommandItem({
                    groupTag: menu.header,
                    header: menuItem.header,
                    callback: () => menuItem.clicked(),
                }))
            }
        }
        return commandItems;
    }
}