import { isRecursiveProxyMock } from "~/isRecursiveProxyMock";
import type { ProxyData } from "~/proxyTypes";
import { getProxyStack } from "~/utils/getProxyStack";

/**
 * @param proxy - the root proxy object returned from {@link recursiveProxyMock}
 * @returns Array of {@link ProxyData} with one entry for every interaction on the proxy object
 */
export function listAllProxyOperations(proxy: unknown): ProxyData[] {
    if (!isRecursiveProxyMock(proxy)) {
        console.warn("Must pass an object created with `recursiveProxyMock()`. Instead received:", proxy);
        return [];
    }
    return getProxyStack(proxy);
}