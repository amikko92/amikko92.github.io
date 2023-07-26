import { resolve } from "path";
import { defineConfig } from "vite";
import { readdirSync } from "fs";
import { getPageInput } from "./scripts/buildPages";

const pageFiles = readdirSync("./pages");
const pagesInput = getPageInput(pageFiles);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    build: {
        outDir: "./docs",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                ...pagesInput,
            },
        },
    },
});
