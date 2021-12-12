/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { resetMock } from "./resetMock";
import { recursiveProxyMock } from "~/recursiveProxyMock";
import { getProxyStack } from "~/utils/getProxyStack";

describe("resetMock", () => {
    test("console.warn when argument isn't a proxy mock", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        resetMock(null);
        expect(consoleWarnSpy).toHaveBeenCalled();
    });

    test("returns from ProxyStack symbol property", () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const mock = recursiveProxyMock();
        mock.a.b.c = 10;
        expect(getProxyStack(mock)).toHaveLength(3);
        resetMock(mock);
        expect(getProxyStack(mock)).toHaveLength(0);
        mock.c = 5;
        expect(getProxyStack(mock)).toHaveLength(1);
    });
});
