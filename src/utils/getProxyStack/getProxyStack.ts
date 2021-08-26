import { ProxyStackSymbol } from "~/ProxySymbol";
import type { ProxyStack, ProxyTarget } from "~/proxyTypes";

export function getProxyStack(proxy: ProxyTarget): ProxyStack {
    // TODO: Remove index type cast once TS 4.4 is released
    return proxy[ProxyStackSymbol as unknown as string] as ProxyStack;
}
