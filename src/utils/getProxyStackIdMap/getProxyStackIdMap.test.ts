import { getProxyStackIdMap } from "./getProxyStackIdMap";
import type { ProxyStack } from "~/proxyTypes";

describe("getProxyStackIdMap", () => {
    test("creates map with self as key", () => {
        const stack: ProxyStack = [
            {
                name: "getPrototypeOf",
                pathKey: [],
                self: 31,
                parent: 0,
            },
            {
                name: "apply",
                pathKey: [],
                args: [],
                self: 7,
                parent: 0,
            },
        ];
        expect(getProxyStackIdMap(stack)).toStrictEqual({
            "31": stack[0],
            "7": stack[1],
        });
    });

    test("skips stack items without self property", () => {
        const stack: ProxyStack = [
            {
                name: "getPrototypeOf",
                pathKey: [],
                self: 31,
                parent: 0,
            },
            {
                name: "set",
                pathKey: [],
                prop: "",
                value: "",
                parent: 0,
            },
            {
                name: "apply",
                pathKey: [],
                args: [],
                self: 7,
                parent: 0,
            },
        ];
        expect(getProxyStackIdMap(stack)).toStrictEqual({
            "31": stack[0],
            "7": stack[2],
        });
    });
});
