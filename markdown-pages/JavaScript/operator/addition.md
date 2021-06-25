---
title: Addition Operator
created: 2021-06-22T22:19:16.457Z
modified: 2021-06-25T23:14:55.902Z
tags: [addition, operator, +]
---
## Adds two numbers together

```js
const x = 1;
const y = 2;

console.assert(x + y === 3);
```

## Concatenates two strings together

```js
const x = "1";
const y = "2";

console.assert(x + y === "12");
```

> **👎 Not Recommended**: use `String.concat` or a [template string](/JavaScript/String#template-strings)

## Oddities

### Unary `+` converts operand to `Number`

```js
console.assert(+"1" === 1);
console.assert(1 + "1" === "11");
console.assert("1" + 1 === "11");
```
> **👎 Not Recommended**: use `parseInt`
