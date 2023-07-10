/// <reference types="vite/client" />

interface ImportMetaEnv {
    // readonly VITE_ENVIRONMENT_VARIABLE: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}