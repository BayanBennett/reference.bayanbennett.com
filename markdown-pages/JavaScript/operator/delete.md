---
title: Delete Operator
created: 2021-07-09T19:26:19.629Z
modified: 2021-07-09T19:26:19.629Z
tags: [unary, delete, operator]
---

```js
const x = { a: 1, b: 2, c: 3 };

delete x.b;
const isCDeleted = delete x.c;

console.assert(x.a === 1);
console.assert(typeof x.b === "undefined");
console.assert(typeof x.c === "undefined");
console.assert(isCDeleted === true)

console.log(x);
```

## Protecting from Deletion

```js
const x = Object.freeze({ a: 1, b: 2, c: 3 });

const isCDeleted = delete x.c;

console.assert(x.c === 3);
console.assert(isCDeleted === false);

console.log(x);
```