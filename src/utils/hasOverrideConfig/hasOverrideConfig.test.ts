import { hasOverrideConfig } from "./hasOverrideConfig";
import { ProxySymbol } from "~/ProxySymbol";
import type { ProxyOverrideConfig } from "~/proxyTypes";

const overrideConfig: ProxyOverrideConfig[] = [
    {
        path: ["b", "a"],
        value: true,
    },
    {
        path: ["a", "b", ProxySymbol.APPLY],
        value: (): number => {
            return 2;
        },
    },
];

describe("hasOverrideConfig", () => {
    test("returns true if any override paths match", () => {
        expect(hasOverrideConfig(overrideConfig, ["b", "a"])).toStrictEqual(true);
        expect(hasOverrideConfig(overrideConfig, ["a", "b", ProxySymbol.APPLY])).toStrictEqual(true);
    });

    test("returns false if override paths don't match", () => {
        expect(hasOverrideConfig(overrideConfig, ["b", "a", "c"])).toStrictEqual(false);
        expect(hasOverrideConfig(overrideConfig, ["a", "b", ProxySymbol.SET])).toStrictEqual(false);
    });
});
