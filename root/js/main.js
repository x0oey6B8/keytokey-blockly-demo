
const isHostObjectNull = chrome?.webview?.hostObjects == null;

// ブロックとワークスペースのコンテキストメニュー
registerFirstContextMenuOptions();


/* Blocklyのワークスペース表示 */
var blocklyFlyout = document.getElementsByClassName("blocklyFlyout");
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject(blocklyDiv,
    {
        media: './node_modules/blockly/media/',
        toolbox: document.getElementById('toolbox'),
        renderer: 'zelos',
        collapse: true,
        comments: true,
        disable: true,
        maxBlocks: Infinity,
        trashcan: true,
        horizontalLayout: false,
        toolboxPosition: 'start',
        css: true,
        rtl: false,
        scrollbars: true,
        sounds: false,
        oneBasedIndex: true,
        grid: {
            spacing: 36,
            length: 2,
            colour: '#cccccc40',
            snap: true,
        },
        trashcan: true,
        zoom: {
            controls: true,
            wheel: false,
            startScale: 0.87,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2,
        },
        move: {
            drag: true,
            wheel: true
        },
        plugins: {
            // 'toolbox': ContinuousToolbox,
            // 'flyoutsVerticalToolbox': ContinuousFlyout,
            // 'metricsManager': ContinuousMetrics,
        },
    });

workspace.addChangeListener(() => {
    console.log("update")
});


/* ワークスペースのリサイズ*/
var onresize = function (e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

/* 各カテゴリに余白を追加 */
var elements = document.getElementsByClassName("blocklyTreeRow");
console.log(elements.length);
for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    element.style.paddingTop = isHostObjectNull ? "0px" : "3px";
    element.style.paddingBottom = isHostObjectNull ? "7px" : "3px";
    console.log(element.style);
}

load();

function createMainFunctionBlock() {
    let mainBlock = workspace.newBlock("main")
    mainBlock.initSvg()
    mainBlock.render()
    mainBlock.setDeletable(false)
    workspace.addTypedBlock(mainBlock)
}

function createCode() {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    if (code != "") {
        console.log(code);
        alert(code);
    }
}

function createXml() {
    var xmlDom = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    if (xmlText != "") {
        console.log(xmlText);
        chrome.webview.hostObjects.class.Save(xmlText);
        alert(code);
    }
    return xmlText;
}

function callHostObjectMethod() {

    thorwExceptionIfHostObjectIsNotExist();

    chrome.webview.hostObjects.class.MessageShow(JSON.stringify({
        test: false,
        id: 12
    }));
    chrome.webview.hostObjects.aaa.MessageShow(JSON.stringify({
        test: true,
        id: 2
    }));
}

function save() {
    var xml = createXml();
    chrome.webview.hostObjects.class.Save(xml);
}

async function load() {

    thorwExceptionIfHostObjectIsNotExist();

    try {
        // 値を返す場合はasync/awaitにする必要がある
        var xml = await chrome.webview.hostObjects.class.Load();
        let dom = Blockly.Xml.textToDom(xml)
        Blockly.Xml.domToWorkspace(dom, workspace)
        console.log(xml);
    } catch (error) {
        console.log(error);
    }
}

function thorwExceptionIfHostObjectIsNotExist() {
    if (isHostObjectNull) {
        throw new Error("Host object is null.");
    }
}
