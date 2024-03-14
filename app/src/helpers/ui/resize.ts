import { useBlocklyStore } from "../../stores/blocklyStore";

export function resize() {
    // Blocklyのワークスペースの高さを計算
    const topRow = document.getElementById("top-row") as HTMLElement;
    const height = topRow.clientHeight;
    const blocklyDiv = document.getElementById('blocklyDiv') as HTMLElement;
    const blocklySpace = document.getElementById('blockly-space') as HTMLElement;
    blocklySpace.style.height = (window.innerHeight - height - 1) + 'px';
    blocklyDiv.style.height = (window.innerHeight - height - 1) + 'px';
    const blockly = useBlocklyStore();
    blockly.getCurrentWorkspaceSession()?.resizeWorkspaceSvg();

    // タブのmax-widthを計算（タブ横にあるボタンをタブの真横に配置するため）
    const tabSideContent = document.getElementById("tab-side-content");
    const menus = document.getElementById("menus");
    const tabs = document.getElementById("tabs");
    if (tabSideContent && menus && tabs) {
        const newSize = `${topRow.clientWidth - (tabSideContent.clientWidth + menus.clientWidth)}px`;
        tabs.style.maxWidth = newSize;
    }
}