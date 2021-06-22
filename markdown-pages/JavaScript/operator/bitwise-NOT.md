---
title: Bitwise NOT Operator
created: 2021-06-12T20:48:41.180Z
modified: 2021-06-17T03:29:08.835Z
video: spLMC-vxQIo
tags: [unary, bitwise, not, operator, "~"]
---
> **📝 Note**: this is different from the [_Logical NOT_](/JavaScript/operator/logical-NOT) operator.

```js
const x = ~~0b00000000000000000000000000000100;
const y = ~~0b11111111111111111111111111111011;

console.assert(y === ~x);

console.log({ x, y });
```

## What is `~~`?

It is a way of forcing the number to be treated as a signed binary integer. Another option would be to use `x >> 0`.

```js
const y0 = 0b11111111111111111111111111111011;
const y1 = ~~0b11111111111111111111111111111011;

console.assert(y0 !== y1);

console.log({ y0, y1 });
```

## Does not work with `Boolean`

```js
console.assert(true !== ~false);
console.assert(~true !== false);
console.log(`"~false" is actually ${~false}`);
console.log(`"~true" is actually ${~true}`);
```
