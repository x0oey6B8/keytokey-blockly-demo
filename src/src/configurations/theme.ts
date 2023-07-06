import Blockly from "blockly";
import { BlockColors } from "./blockColors";

export function defineTheme() {
    const theme = Blockly.Theme.defineTheme("myStyle", {
        name: "myStyle",
        base: Blockly.Themes.Classic,
        fontStyle: {
            'family': 'Noto Sans JP',
            'weight': '500',
            'size': 12,
        },
        componentStyles: {
            workspaceBackgroundColour: "#212121",
            toolboxBackgroundColour: "#101010",
            toolboxForegroundColour: "#C7C7C7",
            flyoutBackgroundColour: "#2d2e30",
            flyoutForegroundColour: "#ccc",
            flyoutOpacity: 0.9,
            scrollbarColour: "#43A047",
            insertionMarkerColour: "#fff",
            insertionMarkerOpacity: 0.3,
            scrollbarOpacity: 0.6,
            cursorColour: "#d0d0d0",
        },
        categoryStyles: {
            'logic_category': {
                colour: BlockColors.Logic,
            },
            'procedure_category': {
                colour: BlockColors.Procedure,
            },
            'text_category': {
                colour: BlockColors.Text,
            },
            'math_category': {
                colour: BlockColors.Math,
            },
            // 'variable_category': {
            //     colour: BlockColors.Action
            // }
        },
        blockStyles: {
            'logic_blocks': {
                'colourPrimary': BlockColors.Logic,
                'colourSecondary': BlockColors.Logic,
            },
            'procedure_blocks': {
                'colourPrimary': BlockColors.Procedure,
                'colourSecondary': BlockColors.Procedure,
            },
            'text_blocks': {
                'colourPrimary': BlockColors.Text,
                'colourSecondary': BlockColors.Text,
            },
            'math_blocks': {
                'colourPrimary': BlockColors.Math,
                'colourSecondary': BlockColors.Math,
            },
            // 'variable_blocks': {
            //     'colourPrimary': BlockColors.Action,
            //     'colourSecondary': BlockColors.Action,
            // },
            'キーボード／マウス': {
                'colourPrimary': '#01579b',
                'colourSecondary': '#01579b',
            },
        },

    });
    return theme;
}
