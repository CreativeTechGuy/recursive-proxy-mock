/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { hasPathBeenCalledWith } from "./hasPathBeenCalledWith";
import { ProxySymbol } from "~/ProxySymbol";
import { recursiveProxyMock } from "~/recursiveProxyMock";

describe("hasPathBeenCalledWith", () => {
    test("returns false and console.warn when argument isn't a proxy mock", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        expect(hasPathBeenCalledWith(null, [], [])).toStrictEqual(false);
        expect(consoleWarnSpy).toHaveBeenCalled();
    });

    test("returns false and console.warn when path doesn't contain APPLY or CONSTRUCT", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        expect(hasPathBeenCalledWith(recursiveProxyMock(), [], [])).toStrictEqual(false);
        expect(consoleWarnSpy).toHaveBeenCalledWith(
            "The path must end with `ProxySymbol.APPLY` or `ProxySymbol.CONSTRUCT`"
        );
    });

    test("returns true if any calls matches", () => {
        const proxy = recursiveProxyMock();
        proxy.a.b("a", 12, false);
        proxy.a.b(5, true);
        expect(hasPathBeenCalledWith(proxy, ["a", "b", ProxySymbol.APPLY], ["a", 12, false])).toStrictEqual(true);
    });

    test("returns false if no calls match", () => {
        const proxy = recursiveProxyMock();
        proxy.a.b("a", 12, false);
        proxy.a.b(5, true);
        expect(hasPathBeenCalledWith(proxy, ["a", "b", ProxySymbol.APPLY], [12])).toStrictEqual(false);
    });

    test("returns true if any constructor calls matches", () => {
        const proxy = recursiveProxyMock();
        new proxy.a.b("a", 12, false);
        new proxy.a.b(5, true);
        expect(hasPathBeenCalledWith(proxy, ["a", "b", ProxySymbol.CONSTRUCT], ["a", 12, false])).toStrictEqual(true);
    });

    test("returns false if no constructor calls match", () => {
        const proxy = recursiveProxyMock();
        new proxy.a.b("a", 12, false);
        new proxy.a.b(5, true);
        expect(hasPathBeenCalledWith(proxy, ["a", "b", ProxySymbol.CONSTRUCT], [12])).toStrictEqual(false);
    });

    test("returns false if constructor was unused", () => {
        const proxy = recursiveProxyMock();
        expect(hasPathBeenCalledWith(proxy, ["a", ProxySymbol.APPLY], [12])).toStrictEqual(false);
    });
});
