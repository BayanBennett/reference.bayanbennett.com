---
title: Logical NOT Operator
created: 2021-06-17T03:29:08.835Z
modified: 2021-06-17T03:29:08.835Z
tags: [unary, logical, not, operator, "!"]
---

> **📝 Note**: this is different from the [_Bitwise NOT_](/JavaScript/operator/bitwise-NOT) operator.

```js
const x = true;
const y = !x;

console.assert(y === false);

console.log({ x, y });
```

## What is `!!`?

It is a way of coercing a value into a boolean value.

```js
const x = "non empty strings are truthy";
const y = "";

console.assert(!!x === true);
console.assert(!!y === false);
```
