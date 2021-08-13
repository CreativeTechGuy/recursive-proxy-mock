import type { ProxyOverrideConfig, ProxyPath } from "~/proxyTypes";
import { doPathsMatch } from "~/utils/doPathsMatch";

export function hasOverrideConfig(overrideConfigs: ProxyOverrideConfig[], currentPath: ProxyPath): boolean {
    return overrideConfigs.some((config) => {
        return doPathsMatch(config.path, currentPath);
    });
}
