import { readdirSync } from "fs";
import { resolve } from "path";

type PageInput = { [key: string]: string };

const fileNameToKey = (fileName: string): string => {
    let key = fileName;
    const extensionIndex = key.indexOf(".");
    if (extensionIndex !== -1) {
        key = key.substring(0, extensionIndex);
    }
    return key.replace(/-/g, "");
};

export const getPageInput = (path: string): PageInput => {
    const pageFiles = readdirSync(path);
    const input: PageInput = {};
    for (const pageFile of pageFiles) {
        const key = fileNameToKey(pageFile);
        const pagePath = resolve(path, pageFile);
        input[key] = pagePath;
    }
    return input;
};
