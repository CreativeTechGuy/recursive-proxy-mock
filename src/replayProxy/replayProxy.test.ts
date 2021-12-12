/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { replayProxy } from "./replayProxy";
import { hasPathBeenVisited } from "~/hasPathBeenVisited";
import { ProxySymbol } from "~/ProxySymbol";
import { recursiveProxyMock } from "~/recursiveProxyMock";

describe("replayProxy", () => {
    test("console.warn when argument isn't a proxy mock", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        replayProxy(null, []);
        expect(consoleWarnSpy).toHaveBeenCalled();
    });

    test("example: store and replay operations", () => {
        const greeter = jest.fn();
        class TestClass {
            public e(name: string): void {
                greeter(`Hi ${name}`);
            }
        }
        const target = {
            a: {
                b: function (): { c: TestClass } {
                    return {
                        c: new TestClass(),
                    };
                },
            },
        };
        const proxy = recursiveProxyMock<typeof target>();
        proxy.a.b().c.e("Jason");
        replayProxy(proxy, target);
        expect(greeter).toHaveBeenCalledWith("Hi Jason");
    });

    test("replay: apply", () => {
        const target = jest.fn();
        const proxy = recursiveProxyMock();
        proxy("potato");
        replayProxy(proxy, target);
        expect(target).toHaveBeenCalledWith("potato");
    });

    test("replay: construct", () => {
        const greeter = jest.fn();
        class TestClass {
            public e(name: string): void {
                greeter(`Hi ${name}`);
            }
        }
        const proxy = recursiveProxyMock<typeof TestClass>();
        new proxy().e("test");
        replayProxy(proxy, TestClass);
        expect(greeter).toHaveBeenCalledWith("Hi test");
    });

    test("replay: defineProperty", () => {
        const obj: Record<string, Record<string, number>> = {};
        const proxy = recursiveProxyMock<typeof obj>();
        Object.defineProperty(proxy, "k", {
            value: {},
            enumerable: true,
            configurable: true,
            writable: true,
        });
        Object.defineProperty(proxy.k, "number", {
            value: 100,
            enumerable: true,
            configurable: true,
            writable: true,
        });
        replayProxy(proxy, obj);
        expect(obj).toStrictEqual({
            k: {
                number: 100,
            },
        });
    });

    test("replay: deleteProperty", () => {
        type PartialObj = {
            num?: number;
            person: {
                name?: string;
            };
        };
        const obj: PartialObj = {
            num: 7,
            person: {
                name: "Joe",
            },
        };
        const proxy = recursiveProxyMock<PartialObj>();
        delete proxy.num;
        delete proxy.person.name;
        replayProxy(proxy, obj);
        expect(obj).toStrictEqual({
            person: {},
        });
    });

    test("replay: get", () => {
        const getter = jest.fn();
        const obj = {
            a: {
                b: {
                    get c(): number {
                        getter();
                        return 7;
                    },
                },
            },
        };
        const proxy = recursiveProxyMock<typeof obj>();
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        proxy.a.b.c;
        replayProxy(proxy, obj);
        expect(getter).toHaveBeenCalled();
    });

    test("replay: getOwnPropertyDescriptor", () => {
        const obj = recursiveProxyMock<unknown>();
        const proxy = recursiveProxyMock<typeof obj>();
        Object.getOwnPropertyDescriptor(Object.getOwnPropertyDescriptor(proxy, "person")!.value, "name");
        replayProxy(proxy, obj);
        expect(
            hasPathBeenVisited(obj, [
                "person",
                ProxySymbol.GET_OWN_PROPERTY_DESCRIPTOR,
                "name",
                ProxySymbol.GET_OWN_PROPERTY_DESCRIPTOR,
            ])
        ).toBe(true);
    });

    test("replay: getPrototypeOf", () => {
        const obj = recursiveProxyMock<unknown>();
        const proxy = recursiveProxyMock<typeof obj>();
        Object.getPrototypeOf(proxy);
        replayProxy(proxy, obj);
        expect(hasPathBeenVisited(obj, [ProxySymbol.GET_PROTOTYPE_OF])).toBe(true);
    });

    test("replay: has", () => {
        const obj = recursiveProxyMock<Record<string, unknown>>();
        const proxy = recursiveProxyMock<typeof obj>();
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        "favorite" in proxy;
        replayProxy(proxy, obj);
        expect(hasPathBeenVisited(obj, ["favorite", ProxySymbol.HAS])).toBe(true);
    });

    test("replay: isExtensible", () => {
        const obj = recursiveProxyMock<unknown>();
        const proxy = recursiveProxyMock<typeof obj>();
        Object.isExtensible(proxy);
        replayProxy(proxy, obj);
        expect(hasPathBeenVisited(obj, [ProxySymbol.IS_EXTENSIBLE])).toBe(true);
    });

    test("replay: isOwnKeys", () => {
        const obj = recursiveProxyMock<Record<string, unknown>>();
        const proxy = recursiveProxyMock<typeof obj>();
        Object.keys(proxy);
        replayProxy(proxy, obj);
        expect(hasPathBeenVisited(obj, [ProxySymbol.OWN_KEYS])).toBe(true);
    });

    test("replay: preventExtensions", () => {
        const obj = recursiveProxyMock<Record<string, unknown>>();
        const proxy = recursiveProxyMock<typeof obj>();
        expect(() => {
            Object.preventExtensions(proxy);
        }).toThrow(TypeError);
        expect(() => {
            replayProxy(proxy, obj);
        }).toThrow(TypeError);
        expect(hasPathBeenVisited(obj, [ProxySymbol.PREVENT_EXTENSIONS])).toBe(true);
    });

    test("replay: set", () => {
        const obj = {
            num: 7,
            person: {
                name: "Joe",
            },
        };
        const proxy = recursiveProxyMock<typeof obj>();
        proxy.num = 10;
        proxy.person.name = "Bob";
        replayProxy(proxy, obj);
        expect(obj).toStrictEqual({
            num: 10,
            person: {
                name: "Bob",
            },
        });
    });

    test("replay: setPrototypeOf", () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        function target(): void {}
        const proxy = recursiveProxyMock<typeof target>();
        const prototype = {
            getName: jest.fn(),
        };
        Object.setPrototypeOf(proxy, prototype);
        replayProxy(proxy, target);
        expect(Object.getPrototypeOf(target)).toStrictEqual(prototype);
    });
});
