/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { listAllPaths } from "./listAllPaths";
import { ProxySymbol } from "~/ProxySymbol";
import { recursiveProxyMock } from "~/recursiveProxyMock";

describe("listAllPaths", () => {
    test("returns all paths and sub-paths", () => {
        const mock = recursiveProxyMock();
        mock.a.b.c;
        mock.a = 12;
        mock.a.test();
        expect(listAllPaths(mock)).toStrictEqual([
            ["a"],
            ["a", "b"],
            ["a", "b", "c"],
            ["a", ProxySymbol.SET],
            ["a"],
            ["a", "test"],
            ["a", "test", ProxySymbol.APPLY],
        ]);
    });
});
