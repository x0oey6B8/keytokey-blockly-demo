import * as monaco from "monaco-editor/esm/vs/editor/editor.api"

export function remeasureFontsWhenItsReady() {
    // カスタムフォントを使用する場合はフォントの再測定を行う必要あり
    // https://github.com/microsoft/monaco-editor/issues/2430
    // https://stackoverflow.com/a/64991499
    document.fonts.ready.then(() => {
        monaco.editor.remeasureFonts();
    });
}