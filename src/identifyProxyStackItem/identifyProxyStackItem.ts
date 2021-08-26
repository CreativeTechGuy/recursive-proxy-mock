import { ProxySymbol } from "~/ProxySymbol";
import type {
    ApplyProxyItem,
    ConstructProxyItem,
    DefinePropertyProxyItem,
    DeletePropertyProxyItem,
    GetOwnPropertyDescriptorProxyItem,
    GetPrototypeOfProxyItem,
    GetProxyItem,
    HasProxyItem,
    IsExtensibleProxyItem,
    OwnKeysProxyItem,
    PreventExtensionsProxyItem,
    ProxyStackItem,
    SetPrototypeOfProxyItem,
    SetProxyItem,
} from "~/proxyTypes";

export function isApply(stackItem: ProxyStackItem): stackItem is ApplyProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.APPLY);
}

export function isConstruct(stackItem: ProxyStackItem): stackItem is ConstructProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.CONSTRUCT);
}

export function isDefineProperty(stackItem: ProxyStackItem): stackItem is DefinePropertyProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.DEFINE_PROPERTY);
}

export function isDeleteProperty(stackItem: ProxyStackItem): stackItem is DeletePropertyProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.DELETE_PROPERTY);
}

export function isGet(stackItem: ProxyStackItem): stackItem is GetProxyItem {
    if (stackItem.pathKey.length === 1 && typeof stackItem.pathKey[0] === "string") {
        return true;
    }
    return !(
        isApply(stackItem) ||
        isConstruct(stackItem) ||
        isDefineProperty(stackItem) ||
        isDeleteProperty(stackItem) ||
        isGetOwnPropertyDescriptor(stackItem) ||
        isGetPrototypeOf(stackItem) ||
        isHas(stackItem) ||
        isIsExtensible(stackItem) ||
        isOwnKeys(stackItem) ||
        isPreventExtensions(stackItem) ||
        isSet(stackItem) ||
        isSetPrototypeOf(stackItem)
    );
}

export function isGetOwnPropertyDescriptor(stackItem: ProxyStackItem): stackItem is GetOwnPropertyDescriptorProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.GET_OWN_PROPERTY_DESCRIPTOR);
}

export function isGetPrototypeOf(stackItem: ProxyStackItem): stackItem is GetPrototypeOfProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.GET_PROTOTYPE_OF);
}

export function isHas(stackItem: ProxyStackItem): stackItem is HasProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.HAS);
}

export function isIsExtensible(stackItem: ProxyStackItem): stackItem is IsExtensibleProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.IS_EXTENSIBLE);
}

export function isOwnKeys(stackItem: ProxyStackItem): stackItem is OwnKeysProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.OWN_KEYS);
}

export function isPreventExtensions(stackItem: ProxyStackItem): stackItem is PreventExtensionsProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.PREVENT_EXTENSIONS);
}

export function isSet(stackItem: ProxyStackItem): stackItem is SetProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.SET);
}

export function isSetPrototypeOf(stackItem: ProxyStackItem): stackItem is SetPrototypeOfProxyItem {
    return stackItem.pathKey.includes(ProxySymbol.SET_PROTOTYPE_OF);
}
