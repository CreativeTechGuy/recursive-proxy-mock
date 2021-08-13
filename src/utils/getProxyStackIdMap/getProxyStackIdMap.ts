import type { ProxyStack, ProxyStackIdMap } from "~/proxyTypes";

export function getProxyStackIdMap(proxyStack: ProxyStack): ProxyStackIdMap {
    const map: ProxyStackIdMap = {};
    for (const item of proxyStack) {
        if ("self" in item) {
            map[item.self] = item;
        }
    }
    return map;
}
