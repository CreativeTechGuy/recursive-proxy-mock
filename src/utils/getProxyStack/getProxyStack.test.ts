import { getProxyStack } from "./getProxyStack";
import { recursiveProxyMock } from "~/recursiveProxyMock";

describe("getProxyStack", () => {
    test("returns from ProxyStack symbol property", () => {
        expect(getProxyStack(recursiveProxyMock())).toBeInstanceOf(Array);
    });
});
