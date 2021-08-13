import { ProxyStackSymbol } from "~/ProxySymbol";
import type { ProxyStack, ProxyTarget } from "~/proxyTypes";

export function getProxyStack(proxy: ProxyTarget): ProxyStack {
    return proxy[ProxyStackSymbol] as ProxyStack;
}
