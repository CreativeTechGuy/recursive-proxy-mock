import { isRecursiveProxyMock } from "~/isRecursiveProxyMock";
import { NOT_MOCK_WARN_MESSAGE } from "~/utils/constants";
import { developmentLog } from "~/utils/developmentLog";
import { getProxyStack } from "~/utils/getProxyStack";

/**
 * Resets the internal tracked proxy operations on the mock
 *
 * @param proxy - the root proxy object returned from {@link recursiveProxyMock}
 */
export function resetMock(proxy: unknown): void {
    if (!isRecursiveProxyMock(proxy)) {
        developmentLog(NOT_MOCK_WARN_MESSAGE, proxy);
        return;
    }
    const stack = getProxyStack(proxy);
    stack.splice(0, stack.length);
}
