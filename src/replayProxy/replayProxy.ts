/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    isApply,
    isConstruct,
    isDefineProperty,
    isDeleteProperty,
    isGet,
    isGetOwnPropertyDescriptor,
    isGetPrototypeOf,
    isHas,
    isIsExtensible,
    isOwnKeys,
    isPreventExtensions,
    isSet,
    isSetPrototypeOf,
} from "~/identifyProxyStackItem";
import { isRecursiveProxyMock } from "~/isRecursiveProxyMock";
import { NOT_MOCK_WARN_MESSAGE } from "~/utils/constants";
import { developmentLog } from "~/utils/developmentLog";
import { getProxyStack } from "~/utils/getProxyStack";

/**
 * @param proxy - the root proxy object returned from {@link recursiveProxyMock}
 * @param target -  any object/function/class etc which will be operated on in the same way that the `proxy` object was
 */
export function replayProxy(proxy: unknown, target: unknown): void {
    if (!isRecursiveProxyMock(proxy)) {
        developmentLog(NOT_MOCK_WARN_MESSAGE, proxy);
        return;
    }
    const targetStateMap = new Map<number, any>();
    targetStateMap.set(0, target);
    const proxyStack = getProxyStack(proxy);
    for (const stackItem of proxyStack) {
        const parent = targetStateMap.get(stackItem.parent);
        let value: unknown;
        if (isApply(stackItem)) {
            value = parent(...stackItem.args);
        } else if (isConstruct(stackItem)) {
            value = new parent(...stackItem.args);
        } else if (isDefineProperty(stackItem)) {
            Object.defineProperty(parent, stackItem.prop, stackItem.descriptor);
        } else if (isDeleteProperty(stackItem)) {
            delete parent[stackItem.prop];
        } else if (isGet(stackItem)) {
            value = parent[stackItem.prop];
        } else if (isGetOwnPropertyDescriptor(stackItem)) {
            value = Object.getOwnPropertyDescriptor(parent, stackItem.prop)?.value;
        } else if (isGetPrototypeOf(stackItem)) {
            value = Object.getPrototypeOf(parent);
        } else if (isHas(stackItem)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            stackItem.prop in parent;
        } else if (isIsExtensible(stackItem)) {
            Object.isExtensible(parent);
        } else if (isOwnKeys(stackItem)) {
            Object.keys(parent);
        } else if (isPreventExtensions(stackItem)) {
            Object.preventExtensions(parent);
        } else if (isSet(stackItem)) {
            parent[stackItem.prop] = stackItem.value;
        } else {
            /* istanbul ignore else */
            if (isSetPrototypeOf(stackItem)) {
                Object.setPrototypeOf(parent, stackItem.prototype);
            }
        }
        if ("self" in stackItem) {
            targetStateMap.set(stackItem.self, value);
        }
    }
}
