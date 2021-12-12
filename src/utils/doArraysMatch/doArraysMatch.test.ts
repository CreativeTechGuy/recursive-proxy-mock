import { doArraysMatch } from "./doArraysMatch";

describe("doArraysMatch", () => {
    test("returns false when array lengths don't match", () => {
        expect(doArraysMatch([], ["a"])).toBe(false);
        expect(doArraysMatch(["a", "b"], ["a"])).toBe(false);
    });

    test("returns false if elements don't match", () => {
        expect(doArraysMatch(["a", "b"], ["b", "a"])).toBe(false);
    });

    test("returns true when all elements match", () => {
        const symbol = Symbol("test");
        expect(doArraysMatch(["a", symbol, "b"], ["a", symbol, "b"])).toBe(true);
    });
});
