import { useBlocklyStore } from "../../stores/blocklyStore";

export function resize() {
    // Blocklyのワークスペースの高さを計算
    const firstRow = document.getElementById("first-row") as HTMLElement;
    const height = firstRow.clientHeight;
    const blocklyDiv = document.getElementById('blocklyDiv') as HTMLElement;
    blocklyDiv.style.height = (window.innerHeight - height - 1) + 'px';
    const blockly = useBlocklyStore();
    blockly.getCurrentWorkspaceSession()?.resizeWorkspaceSvg();

    // タブのmax-widthを計算（タブ横にあるボタンをタブの真横に配置するため）
    const rightContent = document.getElementById("first-row-right");
    const tabSideContent = document.getElementById("tab-side-content");
    const tabs = document.getElementById("tabs");
    if (rightContent && tabSideContent && tabs) {
        const size = `${(firstRow.clientWidth - rightContent.clientWidth - tabSideContent.clientWidth)}px`;
        tabs.style.maxWidth = size;
    }
}