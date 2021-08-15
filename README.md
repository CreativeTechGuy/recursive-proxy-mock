# recursive-proxy-mock

[![npm](https://badgen.net/npm/v/recursive-proxy-mock)](https://www.npmjs.com/package/recursive-proxy-mock) [![license MIT](https://badgen.net/npm/license/recursive-proxy-mock)](https://github.com/CreativeTechGuy/recursive-proxy-mock/blob/main/LICENSE) [![npm type definitions](https://badgen.net/npm/types/recursive-proxy-mock)](https://www.npmjs.com/package/recursive-proxy-mock) [![npm](https://badgen.net/npm/dm/recursive-proxy-mock)](https://www.npmjs.com/package/recursive-proxy-mock) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Create a proxy which can mock any object, function, class, etc. with infinite depth and combinations.

## Table of Contents

-   [About](#about)
-   [Installation & Importing](#installation--importing)
-   [Examples](#examples)
    -   [Use the mock to do literally anything](#use-the-mock-to-do-literally-anything)
    -   [Override the default proxy behavior with custom values](#override-the-default-proxy-behavior-with-custom-values)
    -   [Inspect what was done to the mock](#inspect-what-was-done-to-the-mock)
    -   [Store and replay all operations](#store-and-replay-all-operations)
-   [API Documentation](#api-documentation)
    -   [`recursiveProxyMock([overrides]) => Proxy`](#recursiveproxymockoverrides--proxy)
        -   [TypeScript Support](#typescript-support)
    -   [`ProxySymbol`](#proxysymbol)
    -   [`hasPathBeenVisited(proxy, path) => boolean`](#haspathbeenvisitedproxy-path--boolean)
    -   [`hasPathBeenCalledWith(proxy, path, args) => boolean`](#haspathbeencalledwithproxy-path-args--boolean)
    -   [`getVisitedPathData(proxy, path) => ProxyData[] | null`](#getvisitedpathdataproxy-path--proxydata--null)
    -   [`replayMock(proxy, target)`](#replaymockproxy-target)
        -   [ProxyData](#proxydata)
    -   [`listAllProxyOperations(proxy) => ProxyData[]`](#listallproxyoperationsproxy--proxydata)
    -   [ProxyPath](#proxypath)
    -   [Caveats](#caveats)
-   [More examples](#more-examples)
    -   [Mock HTML5 Canvas in JSDOM](#mock-html5-canvas-in-jsdom)
    -   [Mock an entire library](#mock-an-entire-library)
    -   [Mock complex objects](#mock-complex-objects)
-   [Browser/Node Support](#browsernode-support)
-   [Performance & Size](#performance--size)

## About

Have you ever wanted to mock something that has lots of nested properties and functions? You don't need all of those to be implemented. You just want them to exist so the code doesn't crash. This is the solution.

Recursive Proxy Mock is a [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) that can handle literally anything. This is best explained with examples. Read on!

## Installation & Importing

```sh
npm install --save-dev recursive-proxy-mock
```

```js
import { recursiveProxyMock } from "recursive-proxy-mock";
```

```js
const { recursiveProxyMock } = require("recursive-proxy-mock");
```

## Examples

### Use the mock to do literally anything

```ts
import { recursiveProxyMock } from "recursive-proxy-mock";

const mock = recursiveProxyMock();

// Access any properties on the mock object
mock.a.b.c;

// Call any functions
mock.d().test();

// Set any properties
mock.person.name = "Jason";

// Construct any classes
new mock.MyClass();

// Or do any combination
const value = mock.getThing("yes", 42);
value.something.else = true;
value.something.else().and.now().val = "WOW";
```

### Override the default proxy behavior with custom values

```ts
import { recursiveProxyMock, ProxySymbol } from "recursive-proxy-mock";

const mock = recursiveProxyMock([
    {
        path: ["person", "name"],
        value: "Jason",
    },
    {
        path: ["person", "greet", ProxySymbol.APPLY],
        value: (name) => {
            console.log(`Hi ${name}`);
        },
    },
    {
        path: ["a", "b", "c", ProxySymbol.CONSTRUCT, "d", ProxySymbol.APPLY, "e", "f"],
        value: 123,
    },
]);

// Normal behavior is still preserved
mock.anything.else.something.value().exists;

// When an override path is matched, that value is used instead
console.log(mock.person.name); // "Jason"

// An override will "bail out" from the mock
console.log(mock.person.name.length); // 5

// You can override any of the Proxy traps (eg: function calls, constructor, etc)
mock.person.greet("Phil"); // "Hi Phil"

// You can infinitely chain overrides to access deep properties
console.log(new mock.a.b.c().d().e.f); // 123
```

### Inspect what was done to the mock

```ts
import { recursiveProxyMock, hasPathBeenVisited, ProxySymbol } from "recursive-proxy-mock";

const mock = recursiveProxyMock();

mock.a.b.c("hi", true, 7);

// Check if a path has ever been accessed on a mock object
if (hasPathBeenVisited(mock, ["a", "b", "c", ProxySymbol.APPLY])) {
    console.log("Yes it has!");
}

// Get the details about every time a path was visited on a mock object
const pathData = getVisitedPathData(mock, ["a", "b", "c", ProxySymbol.APPLY]);
/*
    pathData = [
        {
            args: ["hi", true, 7],
            ...etc
        }
    ]
*/

// Check specifically for call arguments
if (hasPathBeenCalledWith(mock, ["a", "b", "c", ProxySymbol.APPLY], ["hi", true, 7])) {
    console.log("Yup!");
}
```

### Store and replay all operations

```ts
import { recursiveProxyMock, replayProxy } from "recursive-proxy-mock";

const mock = recursiveProxyMock();

// Queue up operations on a mock
mock.metrics.pageLoad(Date.now());
mock.users.addUser("name");

// Sometime later once the module is loaded
replayProxy(mock, apiModule);
```

## API Documentation

### `recursiveProxyMock([overrides]) => Proxy`

Main function to create the recursive proxy mock object.

-   `overrides` - _\[optional]_ - an array of objects that contain `path` and `value`.
    -   `path` - see the [ProxyPath section](#proxypath) for more details.
    -   `value` - the value to return instead of another recursive proxy. This needs to match the type of the path. So if your path ends in `ProxySymbol.APPLY` this value must be a function which will be called with whatever arguments the proxy was called with.

See [Example Above](#override-the-default-proxy-behavior-with-custom-values) for more details.

#### TypeScript Support

This function takes one generic type which will be the return type of the proxy. This is not required and the return value will be `any` by default.

```ts
type MyObject = {
    name: string;
    details: {
        value: number;
    };
};

// TypeScript thinks that the mock has the shape of `MyObject`
const myObjectMock = recursiveProxyMock<MyObject>();
```

### `ProxySymbol`

Object containing a [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) for each of the [Proxy Handler functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions). All handlers are supported and have the same name as the Proxy handler function but in `UPPER_CASE`. The only exception is `GET` which is the default when no symbol is specified. All property access on an object is a `GET` by default.

See the [Proxy Handler functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions) documentation for a list of all methods, names, and when they are each used.

These symbols are used to construct paths for the following functions:

-   `recursiveProxyMock` - the `path` property of the override object
-   `hasPathBeenVisited` - the `path` argument to check if that has ever been visited
-   `getVisitedPathData` - the `path` argument to query path data for all visits to that path

### `hasPathBeenVisited(proxy, path) => boolean`

Function to check if a certain path was ever visited. Useful in conjunction with test assertions.

-   `proxy` - the root proxy object that was returned from `recursiveProxyMock`
-   `path` - see the [ProxyPath section](#proxypath) for more details.
-   Returns: `true` if the specified path has ever been visited on the proxy object, `false` if not.

### `hasPathBeenCalledWith(proxy, path, args) => boolean`

Function to check if a certain path was ever called (as a function or class constructor). Useful in conjunction with test assertions. Very similar to `hasPathBeenVisited` but specific for method calls and designed to be easier to use than parsing `getVisitedPathData` yourself.

-   `proxy` - the root proxy object that was returned from `recursiveProxyMock`
-   `path` - see the [ProxyPath section](#proxypath) for more details. The path must end in `ProxySymbol.APPLY` or `ProxySymbol.CONSTRUCT`.
-   `args` - an array of arguments that should have been passed to the specified path
-   Returns: `true` if the specified path has ever been called on the proxy object, `false` if not.

### `getVisitedPathData(proxy, path) => ProxyData[] | null`

Function to get details about every time a path was visited. Useful in conjunction with test assertions to get the number of visits, arguments passed, etc.

-   `proxy` - the root proxy object that was returned from `recursiveProxyMock`
-   `path` - see the [ProxyPath section](#proxypath) for more details.

### `replayMock(proxy, target)`

Replay every operation performed on a proxy mock object onto a target object. This can effectively let you time travel to queue up any actions and replay them as many times as you would like. Every property accessor, every function call, etc will be replayed onto the target.

-   `proxy` - the root proxy object that was returned from `recursiveProxyMock`

-   `target` - any object/function/class etc which will be operated on in the same way that the `proxy` object was.

-   Returns: Array of `ProxyData` objects, one for each time the path was visited on the proxy object. `null` if it was never visited.

#### ProxyData

A `ProxyData` object contains any relevant details about the operation. For example `SET` will contain the name of the `prop` that was assigned to and the `value` that was assigned to it. Or `CONSTRUCT` will contain the array of `args` that were passed to the constructor.

-   `APPLY`, `CONSTRUCT`:
    -   `args` - array of arguments that were passed to the function or constructor
-   `DELETE_PROPERTY`, `GET_OWN_PROPERTY_DESCRIPTOR`, `HAS`, `GET` (default):
    -   `prop` - the name of the property which was accessed/operated on
-   `SET`:
    -   `prop` - the name of the property which was accessed/operated on
    -   `value` - value that was assigned to the `prop`
-   `DEFINE_PROPERTY`:
    -   `prop` - the name of the property which was accessed/operated on
    -   `descriptor` - the descriptor object that was passed to the `Object.defineProperty` call. [Descriptor documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#description).
-   All other handlers:
    -   No useful additional information is available

### `listAllProxyOperations(proxy) => ProxyData[]`

A debug function which lists the raw "proxy stack" of every operation that was performed on the mock. This is an array of [ProxyData](#proxydata) objects which have metadata that is used to power all of the other functions. For example, every object has a `parent` property which contains a number. This number will be the same as some other object's `self` property. Using those two values you can construct a tree containing every path that was accessed on the object.

This is exposed primarily for debugging or curiosity and shouldn't be relied on. If you find yourself needing to use the data here, [create an Issue](https://github.com/CreativeTechGuy/recursive-proxy-mock/issues/new/choose) explaining your use-case and we may add a function to support that directly.

-   `proxy` - the root proxy object that was returned from `recursiveProxyMock`
-   Returns: Array of [ProxyData](#proxydata) objects for every operation that was performed on the mock.

### ProxyPath

Whenever a method accepts a `path` it is an array of properties and symbols to define a request path on the mock object. (See [ProxySymbol](#proxysymbol) for more details.)

-   Examples:
    -   `mock.test.abc` => `["test", "abc"]`
    -   `mock.test.abc()` => `["test", "abc", ProxySymbol.APPLY]`
    -   `mock.a()().b = 7` => `["a", ProxySymbol.APPLY, ProxySymbol.APPLY, "b", ProxySymbol.SET]`
    -   `delete mock.prop` => `["prop", ProxySymbol.DELETE_PROPERTY]`
    -   `new mock.obj.Car` => `["obj", "Car", ProxySymbol.CONSTRUCT]`

### Caveats

-   You cannot override `ProxySymbol.IS_EXTENSIBLE`, `ProxySymbol.PREVENT_EXTENSIONS`, or `ProxySymbol.GET_PROTOTYPE_OF`. Their values are fixed as they must always match the proxy target.

## More examples

### Mock HTML5 Canvas in JSDOM

JSDOM doesn't implement the Canvas element so if you are testing code that is drawing on a canvas, it'll crash as soon as it tries to interact with the canvas context. You can use `recursiveProxyMock` to mock every method/property on the context for both 2d and WebGL. None of them will do anything, but the code will no longer crash and you can assert that the required functions were called.

```ts
import { recursiveProxyMock } from "recursive-proxy-mock";

global.HTMLCanvasElement.prototype.getContext = recursiveProxyMock();

const canvas = document.createElement("canvas");
const context = canvas.getContext("webgl"); // JSDOM doesn't implement this
context.clear(context.COLOR_BUFFER_BIT); // This would normally crash
```

### Mock an entire library

```ts
import { recursiveProxyMock } from "recursive-proxy-mock";

const $ = recursiveProxyMock();

$("div").append("<p>Content</p>").css("color", "blue").click();
```

### Mock complex objects

```ts
import { recursiveProxyMock, ProxySymbol, hasPathBeenVisited } from "recursive-proxy-mock";

function logoutHandler(req, res) {
    req.session.destroy(() => {
        res.redirect("/");
    });
}

const req = recursiveProxyMock([
    {
        path: ["session", "destroy", ProxySymbol.APPLY],
        value: (callback) => {
            callback();
        },
    },
]);
const res = recursiveProxyMock();
logoutHandler(req, res);

// Assert that res.redirect() has been called
expect(hasPathBeenVisited(res, ["redirect", ProxySymbol.APPLY])).toStrictEqual(true);
```

## Browser/Node Support

Out of the box we support all modern browsers and any currently maintained version of Node. Unfortunately Proxy cannot be polyfilled, so supporting a browser like Internet Explorer is completely out of the question.

## Performance & Size

It's important to note that Proxies are far slower than most alternatives. We wouldn't recommend to use this for performance-critical code. The library is heavily tree-shakable so the average bundle size will be just a few KBs.
