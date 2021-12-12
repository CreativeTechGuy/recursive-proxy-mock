// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in JSDoc
import type { ProxySymbol } from "~/ProxySymbol";

export type ApplyProxyItem = {
    name: "apply";
    pathKey: ProxyPath;
    args: unknown[];
    parent: number;
    self: number;
};

export type ConstructProxyItem = {
    name: "construct";
    pathKey: ProxyPath;
    args: unknown[];
    parent: number;
    self: number;
};

export type DefinePropertyProxyItem = {
    name: "defineProperty";
    pathKey: ProxyPath;
    prop: string | symbol;
    descriptor: PropertyDescriptor;
    parent: number;
};

export type DeletePropertyProxyItem = {
    name: "deleteProperty";
    pathKey: ProxyPath;
    prop: string | symbol;
    parent: number;
};

export type GetProxyItem = {
    name: "get";
    pathKey: ProxyPath;
    prop: string | symbol;
    parent: number;
    self: number;
};

export type GetOwnPropertyDescriptorProxyItem = {
    name: "getOwnPropertyDescriptor";
    pathKey: ProxyPath;
    prop: string | symbol;
    parent: number;
    self: number;
};

export type GetPrototypeOfProxyItem = {
    name: "getPrototypeOf";
    pathKey: ProxyPath;
    parent: number;
    self: number;
};

export type HasProxyItem = {
    name: "has";
    pathKey: ProxyPath;
    prop: string | symbol;
    parent: number;
};

export type IsExtensibleProxyItem = {
    name: "isExtensible";
    pathKey: ProxyPath;
    parent: number;
};

export type OwnKeysProxyItem = {
    name: "ownKeys";
    pathKey: ProxyPath;
    parent: number;
};

export type PreventExtensionsProxyItem = {
    name: "preventExtensions";
    pathKey: ProxyPath;
    parent: number;
};

export type SetProxyItem = {
    name: "set";
    pathKey: ProxyPath;
    prop: string | symbol;
    value: unknown;
    parent: number;
};

export type SetPrototypeOfProxyItem = {
    name: "setPrototypeOf";
    pathKey: ProxyPath;
    prototype: object | null;
    parent: number;
};

export type ProxyTarget = {
    (): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & Record<string | number | symbol, any>;

export type ProxyStack = ProxyStackItem[];
export type ProxyData = ProxyStackItem;

export type ProxyStackIdMap = Record<number, ProxyPathItem>;

export type ProxyOverrideConfig = {
    /**
     * @see {@link ProxyPath}
     */
    path: ProxyPath;
    /**
     * Value to be returned instead of another recursive proxy mock
     */
    value: unknown;
};

/**
 * Array of properties and {@link ProxySymbol}s which defines a request path on the mock object.
 *
 * @see {@link https://github.com/CreativeTechGuy/recursive-proxy-mock#ProxyPath}
 * @example
 * ```
 * // Function call
 * mock.test.abc()
 * // Equivalent request path array
 * ["test", "abc", ProxySymbol.APPLY]
 * ```
 */
export type ProxyPath = (string | symbol)[];

export type ProxyCallableItem = ConstructProxyItem | ApplyProxyItem;

export type ProxyPathItem =
    | GetProxyItem
    | ProxyCallableItem
    | GetOwnPropertyDescriptorProxyItem
    | GetPrototypeOfProxyItem;

export type ProxyStackItem =
    | ProxyPathItem
    | DefinePropertyProxyItem
    | DeletePropertyProxyItem
    | HasProxyItem
    | IsExtensibleProxyItem
    | OwnKeysProxyItem
    | PreventExtensionsProxyItem
    | SetProxyItem
    | SetPrototypeOfProxyItem;
