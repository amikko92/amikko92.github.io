import { resolve } from "path";

type PageInput = { [key: string]: string };

export const fileNameToKey = (fileName: string): string => {
    let key = fileName;
    const extensionIndex = key.indexOf(".");
    if (extensionIndex !== -1) {
        key = key.substring(0, extensionIndex);
    }
    return key.replace(/-/g, "");
};

export const getPageInput = (pageFiles: string[]): PageInput => {
    const input: PageInput = {};
    for (const pageFile of pageFiles) {
        const key = fileNameToKey(pageFile);
        const path = resolve(__dirname, "../pages", pageFile);
        input[key] = path;
    }
    return input;
};
