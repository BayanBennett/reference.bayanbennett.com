---
title: Void Operator
created: 2021-07-09T21:12:36.328Z
modified: 2021-07-09T21:12:36.328Z
tags: [unary, void, operator]
---

The `void` operator takes any expression and returns `undefined`.

```js
console.assert(typeof void {} === "undefined");
console.assert(void "" === undefined)
```

> **👎 Not Recommended**: Use of the `void` operator is rare, and it may be confusing.

## `void 0`

Because `undefined` is not a reserved word, it is possible that there is already a variable called `undefined` in scope. Sometimes you will see `void 0` in transpiled or minified code. This is just a shortcut that is used to guarantee the value of `undefined` is actually `undefined`.

```js
const undefined = "not really undefined anymore";

console.assert(typeof undefined === "string");
console.assert(typeof void 0 === "undefined");
console.assert(void 0 !== undefined)
```

