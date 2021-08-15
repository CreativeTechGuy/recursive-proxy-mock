import { getVisitedPathData } from "~/getVisitedPathData";
import { isRecursiveProxyMock } from "~/isRecursiveProxyMock";
import { ProxySymbol } from "~/ProxySymbol";
import type { ProxyCallableItem, ProxyPath } from "~/proxyTypes";
import { developmentLog } from "~/utils/developmentLog";
import { doArraysMatch } from "~/utils/doArraysMatch";

/**
 * @param proxy - the root proxy object returned from {@link recursiveProxyMock}
 * @param path - {@link ProxyPath} The path must end in `ProxySymbol.APPLY` or `ProxySymbol.CONSTRUCT`.
 * @param args - array of arguments that should have been passed to the specified path
 * @returns `true` if the specified path has ever been called on the proxy object, `false` if not
 */
export function hasPathBeenCalledWith(proxy: unknown, path: ProxyPath, args: unknown[]): boolean {
    if (!isRecursiveProxyMock(proxy)) {
        developmentLog("Must pass an object created with `recursiveProxyMock()`. Instead received:", proxy);
        return false;
    }
    if (![ProxySymbol.APPLY, ProxySymbol.CONSTRUCT].includes(path[path.length - 1] as symbol)) {
        developmentLog("The path must end with `ProxySymbol.APPLY` or `ProxySymbol.CONSTRUCT`");
        return false;
    }
    const visitedPathData = (getVisitedPathData(proxy, path) ?? []) as ProxyCallableItem[];
    for (const pathData of visitedPathData) {
        if (doArraysMatch(args, pathData.args)) {
            return true;
        }
    }
    return false;
}
