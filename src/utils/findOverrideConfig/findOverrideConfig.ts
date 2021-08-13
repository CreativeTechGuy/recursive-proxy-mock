import type { ProxyOverrideConfig, ProxyPath } from "~/proxyTypes";
import { doPathsMatch } from "~/utils/doPathsMatch";

export function findOverrideConfig(
    overrideConfigs: ProxyOverrideConfig[],
    currentPath: ProxyPath
): undefined | unknown {
    return overrideConfigs.find((config) => {
        return doPathsMatch(config.path, currentPath);
    })?.value;
}
