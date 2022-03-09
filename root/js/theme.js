// テーマ
Blockly.Themes.Classic = Blockly.Theme.defineTheme('myStyle', {
    'base': Blockly.Themes.Classic,
    'componentStyles': {
        'workspaceBackgroundColour': '#1e1e1e',
        'toolboxBackgroundColour': '#2d2e30',
        'toolboxForegroundColour': '#fff',
        'flyoutBackgroundColour': '#34343490',
        'flyoutForegroundColour': '#ccc',
        'flyoutOpacity': 1,
        'scrollbarColour': '#43A047',
        'insertionMarkerColour': '#fff',
        'insertionMarkerOpacity': 0.3,
        'scrollbarOpacity': 0.6,
        'cursorColour': '#d0d0d0',
        'blackBackground': '#333'
    }
});
Blockly.HSV_SATURATION = 0.6; // ブロックの彩度
Blockly.HSV_VALUE = 0.66; // ブロックの明度