/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { hasPathBeenVisited } from "./hasPathBeenVisited";
import { recursiveProxyMock } from "~/recursiveProxyMock";

describe("hasPathBeenVisited", () => {
    test("returns false and console.warn when argument isn't a proxy mock", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        expect(hasPathBeenVisited(null, [])).toBe(false);
        expect(consoleWarnSpy).toHaveBeenCalled();
    });

    test("returns true if at least one path matches", () => {
        const proxy = recursiveProxyMock();
        proxy.a.b.c;
        proxy.a;
        expect(hasPathBeenVisited(proxy, ["a", "b"])).toBe(true);
    });

    test("returns false if no paths match", () => {
        const proxy = recursiveProxyMock();
        proxy.a.b.c;
        proxy.a;
        expect(hasPathBeenVisited(proxy, ["b", "c"])).toBe(false);
    });

    test("returns false when passed a sub-mock object", () => {
        const proxy = recursiveProxyMock();
        const b = proxy.a.b;
        b.c.d;
        expect(hasPathBeenVisited(b, ["c", "d"])).toBe(false);
        expect(hasPathBeenVisited(proxy, ["a", "b", "c", "d"])).toBe(true);
    });
});
