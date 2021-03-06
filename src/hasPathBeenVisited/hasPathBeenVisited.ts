import { isRecursiveProxyMock } from "~/isRecursiveProxyMock";
import type { ProxyPath } from "~/proxyTypes";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in JSDoc
import { recursiveProxyMock } from "~/recursiveProxyMock";
import { NOT_MOCK_WARN_MESSAGE } from "~/utils/constants";
import { developmentLog } from "~/utils/developmentLog";
import { doPathsMatch } from "~/utils/doPathsMatch";
import { listAllPaths } from "~/utils/listAllPaths";

/**
 * @param proxy - the root proxy object returned from {@link recursiveProxyMock}
 * @param path - {@link ProxyPath}
 * @returns `true` if path has ever been visited on proxy object, `false` if not
 */
export function hasPathBeenVisited(proxy: unknown, path: ProxyPath): boolean {
    if (!isRecursiveProxyMock(proxy)) {
        developmentLog(NOT_MOCK_WARN_MESSAGE, proxy);
        return false;
    }
    const allPaths = listAllPaths(proxy);
    return allPaths.some((checkPath) => {
        return doPathsMatch(checkPath, path);
    });
}
