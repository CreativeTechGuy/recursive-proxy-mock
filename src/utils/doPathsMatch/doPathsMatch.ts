import type { ProxyPath } from "~/proxyTypes";
import { doArraysMatch } from "~/utils/doArraysMatch";

export function doPathsMatch(pathA: ProxyPath, pathB: ProxyPath): boolean {
    return doArraysMatch(pathA, pathB);
}
