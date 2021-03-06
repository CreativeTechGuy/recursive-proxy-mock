import { isRecursiveProxyMock } from "~/isRecursiveProxyMock";
import type { ProxyData } from "~/proxyTypes";
import { NOT_MOCK_WARN_MESSAGE } from "~/utils/constants";
import { developmentLog } from "~/utils/developmentLog";
import { getProxyStack } from "~/utils/getProxyStack";

/**
 * @param proxy - the root proxy object returned from {@link recursiveProxyMock}
 * @returns Array of {@link ProxyData} with one entry for every interaction on the proxy object
 */
export function listAllProxyOperations(proxy: unknown): ProxyData[] {
    if (!isRecursiveProxyMock(proxy)) {
        developmentLog(NOT_MOCK_WARN_MESSAGE, proxy);
        return [];
    }
    return getProxyStack(proxy);
}
