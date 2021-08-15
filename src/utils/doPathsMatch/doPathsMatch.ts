import { developmentLog } from "../developmentLog";
import { ProxySymbol } from "~/ProxySymbol";
import type { ProxyPath } from "~/proxyTypes";

export function doPathsMatch(targetPath: ProxyPath, userPath: ProxyPath): boolean {
    if (targetPath.length !== userPath.length && !userPath.includes(ProxySymbol.WILDCARD)) {
        return false;
    }
    if (userPath[userPath.length - 1] === ProxySymbol.WILDCARD) {
        developmentLog("Do not include `ProxySymbol.WILDCARD` at the end of a path.");
        return false;
    }
    let targetPointer = 0;
    let userPointer = 0;
    while (targetPointer < targetPath.length && userPointer < userPath.length) {
        if (targetPath[targetPointer] === userPath[userPointer]) {
            targetPointer++;
            userPointer++;
        } else if (userPath[userPointer] === ProxySymbol.WILDCARD) {
            if (userPath[userPointer + 1] === targetPath[targetPointer]) {
                userPointer++;
            } else {
                targetPointer++;
            }
        } else {
            return false;
        }
    }
    if (targetPointer === targetPath.length && userPointer === userPath.length) {
        return true;
    }
    return false;
}
