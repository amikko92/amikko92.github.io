import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    build: {
        outDir: "./docs",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                gorillaKingdom: resolve(
                    __dirname,
                    "pages/gorilla-kingdom.html"
                ),
            },
        },
    },
});
