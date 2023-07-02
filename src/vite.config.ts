import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

    let basePath = "/";
    if (mode === "production") {
        basePath = "/keytokey-blockly-demo/root/";
    }

    return {
        plugins: [vue()],
        base: basePath
    }
})