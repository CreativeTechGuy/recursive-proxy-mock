import { doPathsMatch } from "./doPathsMatch";
import { ProxySymbol } from "~/ProxySymbol";

describe("doPathsMatch", () => {
    test("returns false when array lengths don't match", () => {
        expect(doPathsMatch([], ["a"])).toStrictEqual(false);
        expect(doPathsMatch(["a", "b"], ["a"])).toStrictEqual(false);
    });

    test("returns false if elements don't match", () => {
        expect(doPathsMatch(["a", "b"], ["b", "a"])).toStrictEqual(false);
    });

    test("returns true when all elements match", () => {
        const symbol = Symbol("test");
        expect(doPathsMatch(["a", symbol, "b"], ["a", symbol, "b"])).toStrictEqual(true);
    });

    test("warns if ProxySymbol.WILDCARD is at the end of a path", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        expect(doPathsMatch([], ["a", ProxySymbol.WILDCARD])).toStrictEqual(false);
        expect(consoleWarnSpy).toHaveBeenCalled();
    });

    test("accepts wildcard at the beginning of the path", () => {
        expect(doPathsMatch(["a", "b", ProxySymbol.APPLY, "c"], [ProxySymbol.WILDCARD, "c"])).toStrictEqual(true);
    });

    test("wildcard can match zero path segments", () => {
        expect(
            doPathsMatch(["a", "b", ProxySymbol.APPLY, "c"], ["a", "b", ProxySymbol.APPLY, ProxySymbol.WILDCARD, "c"])
        ).toStrictEqual(true);
    });

    test("accepts wildcard in the middle of the path", () => {
        expect(doPathsMatch(["a", "b", ProxySymbol.APPLY, "c"], ["a", ProxySymbol.WILDCARD, "c"])).toStrictEqual(true);
    });

    test("accepts multiple wildcards in the path", () => {
        expect(
            doPathsMatch(
                ["a", "b", ProxySymbol.APPLY, "c", ProxySymbol.CONSTRUCT, "d", "e", ProxySymbol.APPLY],
                ["a", ProxySymbol.WILDCARD, "c", ProxySymbol.WILDCARD, ProxySymbol.APPLY]
            )
        ).toStrictEqual(true);
    });

    test("wildcard support prefix match", () => {
        expect(doPathsMatch(["a", "b", ProxySymbol.APPLY, "c"], [ProxySymbol.WILDCARD, "c"])).toStrictEqual(true);
    });

    test("wildcard support prefix match of zero elements", () => {
        expect(doPathsMatch(["a"], [ProxySymbol.WILDCARD, "a"])).toStrictEqual(true);
    });

    test("wildcard returns false when none match", () => {
        expect(
            doPathsMatch(
                ["a", "b", ProxySymbol.APPLY, "c", ProxySymbol.CONSTRUCT, "d", "e", ProxySymbol.APPLY],
                [ProxySymbol.WILDCARD, "f"]
            )
        ).toStrictEqual(false);
    });
});
