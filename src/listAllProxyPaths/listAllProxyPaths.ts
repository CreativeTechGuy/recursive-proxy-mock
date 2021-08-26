import { isRecursiveProxyMock } from "~/isRecursiveProxyMock";
import type { ProxyPath } from "~/proxyTypes";
import { NOT_MOCK_WARN_MESSAGE } from "~/utils/constants";
import { developmentLog } from "~/utils/developmentLog";
import { listAllPaths } from "~/utils/listAllPaths";

/**
 * @param proxy - the root proxy object returned from {@link recursiveProxyMock}
 * @returns Array of {@link ProxyPath} arrays with one entry for every path or sub-path that was visited
 */
export function listAllProxyPaths(proxy: unknown): ProxyPath[] {
    if (!isRecursiveProxyMock(proxy)) {
        developmentLog(NOT_MOCK_WARN_MESSAGE, proxy);
        return [];
    }
    return listAllPaths(proxy);
}
