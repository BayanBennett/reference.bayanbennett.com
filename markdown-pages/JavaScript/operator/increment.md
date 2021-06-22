---
title: Increment Operator
created: 2021-06-22T22:34:19.141Z
modified: 2021-06-22T22:34:19.141Z
tags: [postfix, prefix, increment, operator, ++]
---

## Postfix Increment

```js
let x = 1;
const y = x++;

console.assert(x === 2);
console.assert(y === 1);
```

## Prefix Increment

```js
let x = 1;
const y = ++x;

console.assert(x === 2);
console.assert(y === 2);
```
