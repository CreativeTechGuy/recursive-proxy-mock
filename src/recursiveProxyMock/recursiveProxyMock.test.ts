/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { JSDOM } from "jsdom";
import type { hasPathBeenVisited as HasPathBeenVisitedType } from "~/hasPathBeenVisited";
import { listAllProxyOperations } from "~/listAllProxyOperations";
import { ProxySymbol } from "~/ProxySymbol";
import type { recursiveProxyMock as RecursiveProxyMockType } from "~/recursiveProxyMock";

describe("recursiveProxyMock", () => {
    let recursiveProxyMock: typeof RecursiveProxyMockType;
    let hasPathBeenVisited: typeof HasPathBeenVisitedType;
    beforeEach(async () => {
        jest.resetModules();
        recursiveProxyMock = (await import("~/recursiveProxyMock")).recursiveProxyMock;
        hasPathBeenVisited = (await import("~/hasPathBeenVisited")).hasPathBeenVisited;
    });

    test("example: do literally anything", () => {
        const mock = recursiveProxyMock();
        expect(() => {
            mock.a.b.c;
            mock.d().test();
            mock.person.name = "Jason";
            new mock.MyClass();
            const value = mock.getThing("yes", 42);
            value.something.else = true;
            value.something.else().and.now().val = "WOW";
        }).not.toThrow();
    });

    test("example: HTML5 Canvas mock", () => {
        const mock = recursiveProxyMock();
        expect(() => {
            const {
                window: { document },
                window,
            } = new JSDOM();
            window.HTMLCanvasElement.prototype.getContext = mock;

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("webgl")!;
            context.clear(context.COLOR_BUFFER_BIT);
        }).not.toThrow();
        expect(hasPathBeenVisited(mock, [ProxySymbol.APPLY])).toStrictEqual(true);
        expect(hasPathBeenVisited(mock, [ProxySymbol.APPLY, "clear", ProxySymbol.APPLY])).toStrictEqual(true);
    });

    test("example: jQuery entire library mock", () => {
        const mock = recursiveProxyMock();
        expect(() => {
            const $ = mock;
            $("div").append("<p>Content</p>").css("color", "blue").click();
        }).not.toThrow();
        expect(hasPathBeenVisited(mock, [ProxySymbol.WILDCARD, "click", ProxySymbol.APPLY])).toStrictEqual(true);
    });

    test("example: complex object mock", () => {
        const resMock = recursiveProxyMock();
        const reqMock = recursiveProxyMock([
            {
                path: ["session", "destroy", ProxySymbol.APPLY],
                value: (callback: () => void): void => {
                    callback();
                },
            },
        ]);
        expect(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            function logoutHandler(req: any, res: any): void {
                req.session.destroy(() => {
                    res.redirect("/");
                });
            }
            logoutHandler(reqMock, resMock);
        }).not.toThrow();
        expect(hasPathBeenVisited(resMock, ["redirect", ProxySymbol.APPLY])).toStrictEqual(true);
    });

    test("supports math operations on primitive", () => {
        const mock = recursiveProxyMock();
        expect(() => {
            mock.test *= 10;
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            mock.a.b = mock.c.d.e + (2 * mock.a.b) / 2;
        }).not.toThrow();
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("supports spread as an array", () => {
        const mock = recursiveProxyMock();
        expect(() => {
            mock.spread = [...mock.should.spread];
        }).not.toThrow();
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: apply", () => {
        const fn = jest.fn(() => 7);
        const mock = recursiveProxyMock([
            {
                path: ["a", "b", ProxySymbol.APPLY],
                value: (): number => {
                    return fn();
                },
            },
        ]);
        expect(mock.a.b() * 2).toStrictEqual(14);
        expect(fn).toHaveBeenCalled();
        expect(() => {
            mock.c().d();
        }).not.toThrow();
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: construct", () => {
        const mock = recursiveProxyMock([
            {
                path: ["a", "b", ProxySymbol.CONSTRUCT],
                value: class OverrideClass {
                    private readonly multiplyBy: number;
                    public constructor(multiplyBy: number) {
                        this.multiplyBy = multiplyBy;
                    }
                    public getValue(): number {
                        return 7 * this.multiplyBy;
                    }
                },
            },
        ]);
        expect(new mock.a.b(2).getValue()).toStrictEqual(14);
        expect(() => {
            new new mock.c().d();
        }).not.toThrow();
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: defineProperty", () => {
        const mock = recursiveProxyMock([
            {
                path: ["a", "b", ProxySymbol.DEFINE_PROPERTY],
                value: false,
            },
        ]);
        expect(() => {
            Object.defineProperty(mock.a, "b", {
                value: 7,
            });
        }).toThrow(TypeError);
        expect(() => {
            Object.defineProperty(mock.a, "c", {
                value: "potato",
            });
        }).not.toThrow();
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: deleteProperty", () => {
        const mock = recursiveProxyMock([
            {
                path: ["a", "b", ProxySymbol.DELETE_PROPERTY],
                value: false,
            },
        ]);
        expect(() => {
            delete mock.a.b;
        }).toThrow(TypeError);
        expect(() => {
            delete mock.c.d;
        }).not.toThrow();
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: get", () => {
        const mock = recursiveProxyMock([
            {
                path: ["a", "b"],
                value: "potato",
            },
            {
                path: ["num", "val", Symbol.toPrimitive],
                value: 10,
            },
        ]);
        expect(mock.num.val * 2).toStrictEqual(20);
        expect(mock.a.b).toStrictEqual("potato");
        expect(mock.b.a).not.toBeInstanceOf(String);
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: getOwnPropertyDescriptor", () => {
        const mock = recursiveProxyMock([
            {
                path: ["a", "b", ProxySymbol.GET_OWN_PROPERTY_DESCRIPTOR],
                value: {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: 7,
                },
            },
        ]);
        expect(Object.getOwnPropertyDescriptor(mock.a, "b")).toStrictEqual({
            configurable: true,
            enumerable: false,
            writable: true,
            value: 7,
        });
        expect(() => {
            Object.getOwnPropertyDescriptor(mock.a, "c")!.value.d.e;
        }).not.toThrow();
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: getPrototypeOf", () => {
        const mock = recursiveProxyMock();
        expect(Object.getPrototypeOf(mock.b.c)).toBeNull();
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: has", () => {
        const mock = recursiveProxyMock([
            {
                path: ["a", "b", ProxySymbol.HAS],
                value: false,
            },
        ]);
        expect("b" in mock.a).toStrictEqual(false);
        expect("c" in mock.a).toStrictEqual(true);
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: isExtensible", () => {
        const mock = recursiveProxyMock();
        expect(Object.isExtensible(mock.a.b)).toStrictEqual(true);
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: ownKeys", () => {
        const mock = recursiveProxyMock([
            {
                path: ["a", "b", ProxySymbol.OWN_KEYS],
                value: ["po", "ta", "to"],
            },
            {
                path: ["a", "b", ProxySymbol.GET_PROTOTYPE_OF],
                value: null,
            },
        ]);
        expect(Object.keys(mock.a.b)).toStrictEqual(["po", "ta", "to"]);
        expect(Object.keys(mock.b.c)).toStrictEqual([]);
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: preventExtensions", () => {
        const mock = recursiveProxyMock();
        expect(() => {
            Object.preventExtensions(mock.a.b);
        }).toThrow(TypeError);
        expect(() => {
            Object.preventExtensions(mock.b.c);
        }).toThrow(TypeError);
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: set", () => {
        const mock = recursiveProxyMock([
            {
                path: ["a", "b", ProxySymbol.SET],
                value: false,
            },
        ]);
        expect(() => {
            mock.a.b = 7;
        }).toThrow(TypeError);
        expect(() => {
            mock.b.c = "potato";
        }).not.toThrow();
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });

    test("proxy trap: setPrototypeOf", () => {
        const mock = recursiveProxyMock([
            {
                path: ["a", "b", ProxySymbol.SET_PROTOTYPE_OF],
                value: false,
            },
        ]);
        expect(() => {
            Object.setPrototypeOf(mock.a.b, {
                protoValue: 7,
            });
        }).toThrow(TypeError);
        expect(() => {
            Object.setPrototypeOf(mock.b.c, {
                protoValue: "potato",
            });
        }).not.toThrow(TypeError);
        expect(listAllProxyOperations(mock)).toMatchSnapshot();
    });
});
