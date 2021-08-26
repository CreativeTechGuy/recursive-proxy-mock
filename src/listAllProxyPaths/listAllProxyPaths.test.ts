import { listAllProxyPaths } from "./listAllProxyPaths";
import { recursiveProxyMock } from "~/recursiveProxyMock";
import * as ListAllPathsModule from "~/utils/listAllPaths/listAllPaths";

describe("listAllProxyPaths", () => {
    test("returns empty array and console.warn when argument isn't a proxy mock", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        expect(listAllProxyPaths(null)).toStrictEqual([]);
        expect(consoleWarnSpy).toHaveBeenCalled();
    });

    test("calls listAllPaths on mock", () => {
        const proxy = recursiveProxyMock<unknown>();
        const listAllPathsSpy = jest.spyOn(ListAllPathsModule, "listAllPaths");
        listAllProxyPaths(proxy);
        expect(listAllPathsSpy).toHaveBeenCalledWith(proxy);
    });
});
