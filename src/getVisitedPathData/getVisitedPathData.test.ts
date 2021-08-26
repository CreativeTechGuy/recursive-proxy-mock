/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { getVisitedPathData as GetVisitedPathDataType } from "./getVisitedPathData";
import { ProxySymbol } from "~/ProxySymbol";
import type { SetProxyItem } from "~/proxyTypes";
import type { recursiveProxyMock as RecursiveProxyMockType } from "~/recursiveProxyMock";

describe("getVisitedPathData", () => {
    let getVisitedPathData: typeof GetVisitedPathDataType;
    let recursiveProxyMock: typeof RecursiveProxyMockType;
    beforeEach(async () => {
        jest.resetModules();
        getVisitedPathData = (await import("./getVisitedPathData")).getVisitedPathData;
        recursiveProxyMock = (await import("~/recursiveProxyMock")).recursiveProxyMock;
    });

    test("returns null and console.warn when argument isn't a proxy mock", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        expect(getVisitedPathData(null, [])).toBeNull();
        expect(consoleWarnSpy).toHaveBeenCalled();
    });

    test("returns array of all path data for each match", () => {
        const proxy = recursiveProxyMock();
        proxy.a.b.c;
        proxy.a;
        proxy.a.b.d = 7;
        expect(getVisitedPathData(proxy, ["a", "b"])).toStrictEqual([
            {
                name: "get",
                parent: 1,
                pathKey: ["b"],
                prop: "b",
                self: 2,
            },
            {
                name: "get",
                parent: 5,
                pathKey: ["b"],
                prop: "b",
                self: 6,
            },
        ]);
    });

    test("returns array of all path data for each match with symbols", () => {
        const proxy = recursiveProxyMock();
        proxy.a;
        proxy.a.b().c = "val";
        proxy.a.b.d = 7;
        expect(getVisitedPathData(proxy, ["a", "b", ProxySymbol.APPLY, "c", ProxySymbol.SET])).toStrictEqual([
            {
                name: "set",
                parent: 4,
                pathKey: ["c", ProxySymbol.SET],
                prop: "c",
                value: "val",
            },
        ]);
    });

    test("returns null if no paths match", () => {
        const proxy = recursiveProxyMock();
        proxy.a.b.c;
        proxy.a;
        expect(getVisitedPathData(proxy, ["b", "c"])).toBeNull();
        expect(getVisitedPathData(proxy, ["none"])).toBeNull();
    });

    test("types: generic defines return type", () => {
        const proxy = recursiveProxyMock();
        proxy.a = 7;
        expect(getVisitedPathData<SetProxyItem>(proxy, ["a", ProxySymbol.SET])?.[0].value).toStrictEqual(7);
    });
});
