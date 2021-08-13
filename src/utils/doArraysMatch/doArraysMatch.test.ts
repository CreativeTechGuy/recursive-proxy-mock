import { doArraysMatch } from "./doArraysMatch";

describe("doArraysMatch", () => {
    test("returns false when array lengths don't match", () => {
        expect(doArraysMatch([], ["a"])).toStrictEqual(false);
        expect(doArraysMatch(["a", "b"], ["a"])).toStrictEqual(false);
    });

    test("returns false if elements don't match", () => {
        expect(doArraysMatch(["a", "b"], ["b", "a"])).toStrictEqual(false);
    });

    test("returns true when all elements match", () => {
        const symbol = Symbol("test");
        expect(doArraysMatch(["a", symbol, "b"], ["a", symbol, "b"])).toStrictEqual(true);
    });
});
