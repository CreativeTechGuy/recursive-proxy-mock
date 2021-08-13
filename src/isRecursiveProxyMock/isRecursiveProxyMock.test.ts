import { isRecursiveProxyMock } from "~/isRecursiveProxyMock";
import { recursiveProxyMock } from "~/recursiveProxyMock";

describe("isRecursiveProxyMock", () => {
    test("returns false if not a function", () => {
        expect(isRecursiveProxyMock({})).toStrictEqual(false);
        expect(isRecursiveProxyMock([])).toStrictEqual(false);
        expect(isRecursiveProxyMock(123)).toStrictEqual(false);
    });

    test("returns false if fake proxy object", () => {
        function fakeProxy(): never[] {
            return [];
        }
        expect(isRecursiveProxyMock(fakeProxy)).toStrictEqual(false);
    });

    test("returns true if real proxy", () => {
        const mock = recursiveProxyMock<unknown>();
        expect(isRecursiveProxyMock(mock)).toStrictEqual(true);
    });
});
