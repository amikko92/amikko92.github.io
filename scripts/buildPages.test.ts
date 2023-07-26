import { expect, describe, it } from "vitest";
import { fileNameToKey, getPageInput } from "./buildPages";

describe("fileNameToKey", () => {
    it("should strip dash and .html extension", () => {
        expect(fileNameToKey("hello-world.html")).toBe("helloworld");
    });

    it("should strip all dashes", () => {
        expect(fileNameToKey("foo-bar-baz.html")).toBe("foobarbaz");
    });

    it("should return same value", () => {
        expect(fileNameToKey("helloworld")).toBe("helloworld");
    });
});

describe("getpageInput", () => {
    it("should have key helloworld", () => {
        const pages = ["hello-world.html"];
        const input = getPageInput(pages);
        expect(Object.keys(input)[0]).toBe("helloworld");
    });

    it("should get one page", () => {
        const pages = ["hello-world.html"];
        const input = getPageInput(pages);
        expect(Object.keys(input).length).toBe(1);
    });

    it("should have path to page", () => {
        const pages = ["hello-world.html"];
        const input = getPageInput(pages);
        expect(input["helloworld"]).contain("/pages/hello-world.html");
    });
});
