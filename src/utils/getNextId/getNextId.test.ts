import { getNextId } from "./getNextId";

describe("getNextId", () => {
    test("returns a new id each time", () => {
        expect(getNextId()).not.toStrictEqual(getNextId());
    });

    test("does not return 0", async () => {
        jest.resetModules();
        expect((await import("./getNextId")).getNextId()).toBeGreaterThan(0);
    });
});
