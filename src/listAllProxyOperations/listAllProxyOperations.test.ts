import { listAllProxyOperations } from "./listAllProxyOperations";
import { recursiveProxyMock } from "~/recursiveProxyMock";
import * as GetProxyStackModule from "~/utils/getProxyStack/getProxyStack";

describe("listAllProxyOperations", () => {
    test("returns empty array and console.warn when argument isn't a proxy mock", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        expect(listAllProxyOperations(null)).toStrictEqual([]);
        expect(consoleWarnSpy).toHaveBeenCalled();
    });

    test("calls getProxyStack on mock", () => {
        const proxy = recursiveProxyMock<unknown>();
        const getProxyStackSpy = jest.spyOn(GetProxyStackModule, "getProxyStack");
        listAllProxyOperations(proxy);
        expect(getProxyStackSpy).toHaveBeenCalledWith(proxy);
    });
});
