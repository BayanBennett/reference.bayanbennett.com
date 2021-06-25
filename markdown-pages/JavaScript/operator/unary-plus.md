---
title: Unary Plus Operator
created: 2021-06-25T23:24:17.675Z
modified: 2021-06-25T23:24:17.675Z
tags: [unary, plus, operator, +]
---

Unary `+` converts operand to `Number`

```js
console.assert(+"1" === 1);
console.assert(1 + "1" === "11");
console.assert("1" + 1 === "11");
```
> **👎 Not Recommended**: use `parseInt`