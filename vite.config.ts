import { resolve } from "path";
import { defineConfig } from "vite";
import { getPageInput } from "./scripts/buildPages";

const projectPages = getPageInput("./src/projects");
const aboutPages = getPageInput("./src/about");
const contactPages = getPageInput("./src/contact");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    root: "src",
    publicDir: resolve(__dirname, "public"),
    build: {
        outDir: resolve(__dirname, "docs"),
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                ...projectPages,
                ...aboutPages,
                ...contactPages,
            },
        },
    },
});
