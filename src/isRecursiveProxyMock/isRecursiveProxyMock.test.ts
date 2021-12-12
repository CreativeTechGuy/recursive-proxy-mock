import { isRecursiveProxyMock } from "~/isRecursiveProxyMock";
import { recursiveProxyMock } from "~/recursiveProxyMock";

describe("isRecursiveProxyMock", () => {
    test("returns false if not a function", () => {
        expect(isRecursiveProxyMock({})).toBe(false);
        expect(isRecursiveProxyMock([])).toBe(false);
        expect(isRecursiveProxyMock(123)).toBe(false);
    });

    test("returns false if fake proxy object", () => {
        function fakeProxy(): never[] {
            return [];
        }
        expect(isRecursiveProxyMock(fakeProxy)).toBe(false);
    });

    test("returns true if real proxy", () => {
        const mock = recursiveProxyMock<unknown>();
        expect(isRecursiveProxyMock(mock)).toBe(true);
    });
});
