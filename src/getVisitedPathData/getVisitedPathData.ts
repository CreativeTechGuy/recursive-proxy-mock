import { isRecursiveProxyMock } from "~/isRecursiveProxyMock";
import type { ProxyData, ProxyPath, ProxyStackItem } from "~/proxyTypes";
import { doPathsMatch } from "~/utils/doPathsMatch";
import { getCurrentPath } from "~/utils/getCurrentPath";
import { getProxyStack } from "~/utils/getProxyStack";

/**
 * @param proxy - the root proxy object returned from {@link recursiveProxyMock}
 * @param path - {@link ProxyPath}
 * @returns Array of {@link ProxyData} with one entry for each time the path was visited ono the proxy object, or `null` if never accessed.
 */
export function getVisitedPathData(proxy: unknown, path: ProxyPath): ProxyData[] | null {
    if (!isRecursiveProxyMock(proxy)) {
        console.warn("Must pass an object created with `recursiveProxyMock()`. Instead received:", proxy);
        return null;
    }
    const proxyStack = getProxyStack(proxy);
    // These match the last element of the stackItem's pathKey only. Narrow down the search space
    const possibleItems: ProxyStackItem[] = [];
    for (const stackItem of proxyStack) {
        const key = stackItem.pathKey;
        if (key[key.length - 1] === path[path.length - 1]) {
            possibleItems.push(stackItem);
        }
    }
    if (possibleItems.length === 0) {
        return null;
    }
    const visitedPathItems: ProxyStackItem[] = [];
    for (const possibleItem of possibleItems) {
        const possibleItemPath = [...getCurrentPath(proxyStack, possibleItem.parent), ...possibleItem.pathKey];
        if (doPathsMatch(possibleItemPath, path)) {
            visitedPathItems.push(possibleItem);
        }
    }
    if (visitedPathItems.length === 0) {
        return null;
    }
    return visitedPathItems;
}
