import { ProxySymbol } from "./ProxySymbol";

describe("ProxySymbol", () => {
    test("all symbols are unique", () => {
        const values = Object.values(ProxySymbol);
        const uniqueValues = [...new Set(values)];
        expect(uniqueValues).toStrictEqual(values);
    });
});
