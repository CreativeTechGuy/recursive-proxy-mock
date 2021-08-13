/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Object containing a Symbol for each of the Proxy handler functions. Used to construct a ProxyPath.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions} for a list of Proxy handler names
 */
export const ProxySymbol = {
    APPLY: Symbol("apply"),
    CONSTRUCT: Symbol("construct"),
    DEFINE_PROPERTY: Symbol("defineProperty"),
    DELETE_PROPERTY: Symbol("deleteProperty"),
    GET_OWN_PROPERTY_DESCRIPTOR: Symbol("getOwnPropertyDescriptor"),
    GET_PROTOTYPE_OF: Symbol("getPrototypeOf"),
    HAS: Symbol("has"),
    IS_EXTENSIBLE: Symbol("isExtensible"),
    OWN_KEYS: Symbol("ownKeys"),
    PREVENT_EXTENSIONS: Symbol("preventExtensions"),
    SET: Symbol("set"),
    SET_PROTOTYPE_OF: Symbol("setPrototypeOf"),
} as const;

export const ProxyStackSymbol = Symbol("proxyStack");
