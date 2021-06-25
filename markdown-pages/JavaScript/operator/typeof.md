---
title: Unary Typeof Operator
created: 2021-06-25T23:04:35.599Z
modified: 2021-06-25T23:04:35.599Z
tags: [unary, typeof, operator]
---

```js
console.assert(typeof undefined === "undefined");
console.assert(typeof null === "object");
console.assert(typeof true === "boolean");
console.assert(typeof 123 === "number");
console.assert(typeof "abc" === "string");
console.assert(typeof Symbol() === "symbol");
console.assert(typeof 123n === "bigint");
console.assert(typeof (() => {})  === "function");
console.assert(typeof {}  === "object");
```

## Oddities

### `null` is an `Object`

```js
console.assert(typeof null === "object");
```