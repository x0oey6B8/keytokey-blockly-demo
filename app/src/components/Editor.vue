<script lang="ts" setup>
import * as monaco from 'monaco-editor'
import { onMounted } from 'vue';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { useEditorStore } from '../stores/editorStore';
import { remeasureFontsWhenItsReady } from '../helpers/editor/remeasureFonts';

const store = useEditorStore();

onMounted(async () => {
    self.MonacoEnvironment = {
        getWorker(_, label) {
            if (label === 'json') {
                return new jsonWorker()
            }
            if (label === 'css' || label === 'scss' || label === 'less') {
                return new cssWorker()
            }
            if (label === 'html' || label === 'handlebars' || label === 'razor') {
                return new htmlWorker()
            }
            if (label === 'typescript' || label === 'javascript') {
                return new tsWorker()
            }
            return new editorWorker()
        },
        createTrustedTypesPolicy(policyName: string, policyOptions?: monaco.ITrustedTypePolicyOptions): undefined | monaco.ITrustedTypePolicy {
            const w = (window as any);
            if (typeof w.trustedTypes === 'undefined') {
                return undefined;
            }
            w.trustedTypes.createPolicy(policyName, policyOptions);
        }
    }

    const lang: any = monaco.languages.getLanguages().find(l => l.id === 'javascript');
    await new Promise((resolve) => lang.loader().then((module: any) => {
        // console.log(module.conf);
        console.log(module.language);
        //console.log((monaco as any)._themeService);
        const def: monaco.languages.IMonarchLanguage = module.language;
        def.tokenizer.root.unshift([/[_\w$]*\(/, 'function.name']);
        def.tokenizer.root.unshift([/(if|for|else)/, 'keyword.custom']);
        monaco.languages.setMonarchTokensProvider('javascript', def);
        monaco.editor.defineTheme('custom-theme', {
            base: 'vs-dark',
            inherit: true,
            colors: {
            },
            rules: [
                { token: "identifier", foreground: "#9cdcfe"},
                { token: 'function.name', foreground: 'ebe6b2' },
                { token: 'keyword.custom', foreground: '#c586c0' },
            ]
        });
        resolve(null);
    }));

    const container = document.getElementById('editor') as HTMLElement;
    const editor = monaco.editor.create(container, {
        model: monaco.editor.createModel(store.textValue, store.language),
        language: store.language,
        lineNumbers: "on",
        fontFamily: "Noto Sans Mono, Noto Sans JP",
        fontSize: 13,
        fontLigatures: true,
        letterSpacing: 0.1,
        lineHeight: 1.8,
        mouseWheelZoom: true,
        mouseWheelScrollSensitivity: 2,
        readOnly: false,
        roundedSelection: true,
        smoothScrolling: true,
        cursorSmoothCaretAnimation: 'on',
        scrollBeyondLastLine: true,
        hideCursorInOverviewRuler: true,
        wordWrap: 'bounded',
        wordWrapColumn: 200,
        wrappingIndent: "none",
        scrollbar: {
            vertical: 'hidden',
            verticalSliderSize: 0,
            verticalScrollbarSize: 0,
            verticalHasArrows: false,
        },
        theme: "custom-theme",
    })

    editor.onDidChangeModelContent(() => {
        const newValue = editor.getValue();
        store.textValue = newValue;
    });

    window.onresize = function () {
        editor.layout();
    };

    remeasureFontsWhenItsReady();

    const highlights = store.getHighlights();
    if (highlights.length > 0) {
        editor.createDecorationsCollection(highlights);
    }
})
</script>

<template>
    <div class="editor-entire">
        <div class="editor-container" :class="{ mtkf: store.willMakeInvalidIdentifierTextWhite }">
            <div id="editor" style="width: 99%; height: 99%; margin: auto;"></div>
        </div>
    </div>
</template>

<style>
.editor-entire {
    border-radius: 5px;
    padding: 5px;
    width: 100%;
    height: 100%;
    background-color: #3d3d3d;
    display: flex;
    align-items: center;
    justify-content: center;
}

.editor-container {
    background-color: #212121;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mtkf {
    color: #bdbebe !important;
}

.mtk12 {
    color: #bdbebe !important;
}

.editor-highlight-line {
    background: rgba(255, 255, 0, 0.1) !important;
}
</style>