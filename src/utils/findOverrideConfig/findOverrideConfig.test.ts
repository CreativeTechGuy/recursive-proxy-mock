import { findOverrideConfig } from "./findOverrideConfig";
import { ProxySymbol } from "~/ProxySymbol";
import type { ProxyOverrideConfig } from "~/proxyTypes";

function applyValue(): number {
    return 2;
}

const overrideConfig: ProxyOverrideConfig[] = [
    {
        path: ["b", "a"],
        value: "ValueIsPotato",
    },
    {
        path: ["a", "b", ProxySymbol.APPLY],
        value: applyValue,
    },
    {
        path: ["b", "a"],
        value: "AnotherValue",
    },
];

describe("findOverrideConfig", () => {
    test("returns value for the first override path that matches", () => {
        expect(findOverrideConfig(overrideConfig, ["b", "a"])).toStrictEqual("ValueIsPotato");
        expect(findOverrideConfig(overrideConfig, ["a", "b", ProxySymbol.APPLY])).toStrictEqual(applyValue);
    });

    test("returns undefined if no override path matches", () => {
        expect(findOverrideConfig(overrideConfig, ["b", "a", "c"])).toBeUndefined();
        expect(findOverrideConfig(overrideConfig, ["a", "b", ProxySymbol.SET])).toBeUndefined();
    });
});
