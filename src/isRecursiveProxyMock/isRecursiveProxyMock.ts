import type { ProxyTarget } from "~/proxyTypes";
import { getProxyStack } from "~/utils/getProxyStack";

export function isRecursiveProxyMock(proxy: unknown): proxy is ProxyTarget {
    if (typeof proxy !== "function") {
        return false;
    }
    if (Array.isArray(getProxyStack(proxy as ProxyTarget))) {
        return true;
    }
    return false;
}
