import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

    let basePath = "/";
    if (mode === "production") {
        basePath = "/keytokey-blockly-demo/root/";
    }

    return {
        plugins: [
            vue(),
            // mediaフォルダをビルド後のフォルダに含める
            viteStaticCopy({
                targets: [
                    {
                        src: 'media/*',
                        dest: 'media'
                    }
                ]
            })
        ],
        server: {
            host: true
        },
        base: basePath,
        build: {
            outDir: "../root"
        }
    }
})