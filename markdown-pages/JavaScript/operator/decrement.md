---
title: Decrement Operator
created: 2021-06-22T22:46:03.548Z
modified: 2021-06-22T22:46:03.548Z
tags: [postfix, prefix, decrement, operator, --]
---

## Postfix Decrement

```js
let x = 1;
const y = x--;

console.assert(x === 0);
console.assert(y === 1);
```

## Prefix Decrement

```js
let x = 1;
const y = --x;

console.assert(x === 0);
console.assert(y === 0);
```