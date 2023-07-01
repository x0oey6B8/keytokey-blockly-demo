import Blockly from "blockly";

export function defineTheme() {
    const theme = Blockly.Theme.defineTheme("myStyle", {
        name: "myStyle",
        base: Blockly.Themes.Classic,
        fontStyle: {
            'family': 'Noto Sans JP',
            // 'family': 'IBM Plex Sans JP',
            'weight': '500',
            'size': 12,
        },
        componentStyles: {
            workspaceBackgroundColour: "#212121",
            // toolboxBackgroundColour: "#2d2e30",
            toolboxBackgroundColour: "#101010",
            toolboxForegroundColour: "#C7C7C7",
            // flyoutBackgroundColour: "#2d2e30",
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
                colour: '#01579b',
            }
        },
        blockStyles: {
            'logic_blocks': {
                'colourPrimary': '#01579b',
                'colourSecondary': '#01579b',
            },
            'キーボード／マウス': {
                'colourPrimary': '#01579b',
                'colourSecondary': '#01579b',
            },
        },

    });
    return theme;

    // Blockly.HSV_SATURATION = 0.6; // ブロックの彩度
    // Blockly.HSV_VALUE = 0.6; // ブロックの明度
}
