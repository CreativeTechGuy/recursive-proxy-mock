/* eslint-disable @typescript-eslint/ban-types */
import { ProxyStackSymbol, ProxySymbol } from "~/ProxySymbol";
import type { ProxyOverrideConfig, ProxyStack, ProxyTarget } from "~/proxyTypes";
import { findOverrideConfig } from "~/utils/findOverrideConfig";
import { getCurrentPath } from "~/utils/getCurrentPath";
import { getNextId } from "~/utils/getNextId";
import { hasOverrideConfig } from "~/utils/hasOverrideConfig";

type ConstructorType = new (...args: unknown[]) => Record<string, unknown>;
type FunctionType = (...args: unknown[]) => unknown;

/**
 * Create a proxy which can mock any object, function, class, etc. with infinite depth and combinations.
 *
 * @param overrides - Array of {@link ProxyOverrideConfig} objects which will be used to override the behavior of the proxy when certain paths are visited.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function recursiveProxyMock<T = any>(overrides: ProxyOverrideConfig[] = []): T {
    return recursiveProxyRecurse(overrides, [], 0);
}

function recursiveProxyRecurse(overrides: ProxyOverrideConfig[], stack: ProxyStack, parentId: number): ProxyTarget {
    // istanbul ignore next - the instance function will never actually be called.
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const recursiveProxyInstance = function () {} as ProxyTarget;
    const currentPath = getCurrentPath(stack, parentId);
    return new Proxy(recursiveProxyInstance, {
        apply: (target, thisArg, argumentsList): unknown => {
            const next = getNextId();
            const pathKey = [ProxySymbol.APPLY];
            stack.push({
                name: "apply",
                pathKey: pathKey,
                args: argumentsList,
                parent: parentId,
                self: next,
            });
            const override = findOverrideConfig(overrides, [...currentPath, ...pathKey]) as FunctionType | undefined;
            if (typeof override !== "undefined") {
                return override(...argumentsList);
            }
            return recursiveProxyRecurse(overrides, stack, next);
        },
        construct: (target, args): InstanceType<ConstructorType> => {
            const next = getNextId();
            const pathKey = [ProxySymbol.CONSTRUCT];
            stack.push({
                name: "construct",
                pathKey: pathKey,
                args: args,
                parent: parentId,
                self: next,
            });
            const override = findOverrideConfig(overrides, [...currentPath, ...pathKey]) as ConstructorType | undefined;
            if (typeof override !== "undefined") {
                return new override(...args);
            }
            return recursiveProxyRecurse(overrides, stack, next);
        },
        defineProperty: (target, prop, descriptor): boolean => {
            const pathKey = [prop, ProxySymbol.DEFINE_PROPERTY];
            stack.push({
                name: "defineProperty",
                pathKey: pathKey,
                prop: prop,
                descriptor: descriptor,
                parent: parentId,
            });
            const override = findOverrideConfig(overrides, [...currentPath, ...pathKey]) as boolean | undefined;
            if (typeof override !== "undefined") {
                return override;
            }
            return true;
        },
        deleteProperty: (target, prop): boolean => {
            const pathKey = [prop, ProxySymbol.DELETE_PROPERTY];
            stack.push({
                name: "deleteProperty",
                pathKey: pathKey,
                prop: prop,
                parent: parentId,
            });
            const override = findOverrideConfig(overrides, [...currentPath, ...pathKey]) as boolean | undefined;
            if (typeof override !== "undefined") {
                return override;
            }
            return true;
        },
        get: (target, prop): unknown => {
            if (prop === ProxyStackSymbol) {
                return stack;
            }
            const pathKey = [prop];
            const next = getNextId();
            stack.push({
                name: "get",
                pathKey: pathKey,
                prop: prop,
                parent: parentId,
                self: next,
            });
            const override = findOverrideConfig(overrides, [...currentPath, ...pathKey]);
            if (prop === Symbol.toPrimitive) {
                return (): number | string => {
                    if (typeof override !== "undefined") {
                        return override as number | string;
                    }
                    return "";
                };
            }
            if (typeof override !== "undefined") {
                return override;
            }
            return recursiveProxyRecurse(overrides, stack, next);
        },
        getOwnPropertyDescriptor: (target, prop): PropertyDescriptor | undefined => {
            const next = getNextId();
            const pathKey = [prop, ProxySymbol.GET_OWN_PROPERTY_DESCRIPTOR];
            stack.push({
                name: "getOwnPropertyDescriptor",
                pathKey: pathKey,
                prop: prop,
                parent: parentId,
                self: next,
            });
            if (hasOverrideConfig(overrides, [...currentPath, ...pathKey])) {
                return findOverrideConfig(overrides, [...currentPath, ...pathKey]) as PropertyDescriptor | undefined;
            }
            if (typeof prop === "string" && ["arguments", "caller", "prototype"].includes(prop)) {
                return Reflect.getOwnPropertyDescriptor(target, prop);
            }
            return {
                configurable: true,
                enumerable: true,
                writable: true,
                value: recursiveProxyRecurse(overrides, stack, next),
            };
        },
        getPrototypeOf: (): object | null => {
            const next = getNextId();
            const pathKey = [ProxySymbol.GET_PROTOTYPE_OF];
            stack.push({
                name: "getPrototypeOf",
                pathKey: pathKey,
                parent: parentId,
                self: next,
            });
            return null;
        },
        has: (target, prop): boolean => {
            const pathKey = [prop, ProxySymbol.HAS];
            stack.push({
                name: "has",
                pathKey: pathKey,
                parent: parentId,
                prop: prop,
            });
            const override = findOverrideConfig(overrides, [...currentPath, ...pathKey]) as boolean | undefined;
            if (typeof override !== "undefined") {
                return override;
            }
            return true;
        },
        isExtensible: (): boolean => {
            const pathKey = [ProxySymbol.IS_EXTENSIBLE];
            stack.push({
                name: "isExtensible",
                pathKey: pathKey,
                parent: parentId,
            });
            return true;
        },
        ownKeys: (): (string | symbol)[] => {
            const pathKey = [ProxySymbol.OWN_KEYS];
            stack.push({
                name: "ownKeys",
                pathKey: pathKey,
                parent: parentId,
            });
            const override = findOverrideConfig(overrides, [...currentPath, ...pathKey]) as
                | (string | symbol)[]
                | undefined;
            const defaultOwnKeys = ["arguments", "caller", "prototype"];
            if (typeof override !== "undefined") {
                return [...override, ...defaultOwnKeys];
            }
            return defaultOwnKeys;
        },
        preventExtensions: (): boolean => {
            const pathKey = [ProxySymbol.PREVENT_EXTENSIONS];
            stack.push({
                name: "preventExtensions",
                pathKey: pathKey,
                parent: parentId,
            });
            return false;
        },
        set: (target, prop, value): boolean => {
            const pathKey = [prop, ProxySymbol.SET];
            stack.push({
                name: "set",
                pathKey: pathKey,
                prop: prop,
                value: value,
                parent: parentId,
            });
            const override = findOverrideConfig(overrides, [...currentPath, ...pathKey]) as boolean | undefined;
            if (typeof override !== "undefined") {
                return override;
            }
            return true;
        },
        setPrototypeOf: (target, prototype): boolean => {
            const pathKey = [ProxySymbol.SET_PROTOTYPE_OF];
            stack.push({
                name: "setPrototypeOf",
                pathKey: pathKey,
                prototype: prototype,
                parent: parentId,
            });
            const override = findOverrideConfig(overrides, [...currentPath, ...pathKey]) as boolean | undefined;
            if (typeof override !== "undefined") {
                return override;
            }
            return true;
        },
    });
}
