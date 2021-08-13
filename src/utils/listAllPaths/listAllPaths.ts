import type { ProxyPath, ProxyTarget } from "~/proxyTypes";
import { getCurrentPath } from "~/utils/getCurrentPath";
import { getProxyStack } from "~/utils/getProxyStack";

export function listAllPaths(proxy: ProxyTarget): ProxyPath[] {
    const proxyStack = getProxyStack(proxy);
    const allPaths: ProxyPath[] = [];
    for (const stackItem of proxyStack) {
        allPaths.push([...getCurrentPath(proxyStack, stackItem.parent), ...stackItem.pathKey]);
    }
    return allPaths;
}
