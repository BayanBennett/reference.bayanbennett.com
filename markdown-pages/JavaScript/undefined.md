---
title: undefined
created: 2021-06-08T18:43:36.362Z
modified: 2021-11-16T00:00:00.000Z
tags: [undefined]
---

```js
console.assert(typeof a === "undefined");

const b = {};

console.assert(b.c === undefined);
```

> 💡 **Tip**: Use `typeof` to determine if something is `undefined`. For example: changing the first assert to `a === undefined` would throw an error.

## `undefined` is not a reserved word

Unlike `null`, `undefined` is not a reserved word, so it could be used as a variable or a function argument. 

```js
const undefined = "defined";

console.assert(typeof undefined === "string");

const defined = (undefined) => {
  console.assert(typeof undefined === "object")
};

defined({})
```

> **👎 Not Recommended**: do not redefine `undefined`
