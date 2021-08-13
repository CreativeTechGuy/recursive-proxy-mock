import type { ProxyPath, ProxyStack } from "~/proxyTypes";
import { getProxyStackIdMap } from "~/utils/getProxyStackIdMap";

export function getCurrentPath(proxyStack: ProxyStack, parent: number): ProxyPath {
    const proxyStackMap = getProxyStackIdMap(proxyStack);
    const path: ProxyPath = [];
    if (parent === 0) {
        return path;
    }
    const parentItem = proxyStackMap[parent];
    path.push(...parentItem.pathKey);
    path.unshift(...getCurrentPath(proxyStack, parentItem.parent));
    return path;
}
