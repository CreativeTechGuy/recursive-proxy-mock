/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getCurrentPath } from "./getCurrentPath";
import type { ProxyPathItem } from "~/proxyTypes";
import { recursiveProxyMock } from "~/recursiveProxyMock";
import { getProxyStack } from "~/utils/getProxyStack";

describe("getCurrentPath", () => {
    test("constructs path from proxyStack and current parent id", () => {
        const mock = recursiveProxyMock();
        mock.a.b.c;
        mock.a.c;
        const stack = getProxyStack(mock);
        const recentItem = (stack[stack.length - 1] as ProxyPathItem).self;
        expect(getCurrentPath(getProxyStack(mock), recentItem)).toStrictEqual(["a", "c"]);
    });
});
