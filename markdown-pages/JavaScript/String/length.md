---
title: String length
created: 2021-06-08T18:43:36.362Z
modified: 2021-06-07T00:00:00.000Z
tags: [String, length]
---

```js
const myString = "this is a string";

console.assert(myString.length.constructor === Number);
console.assert(myString.length === 16);

console.log(myString.length);
```

## Notes

The `String` constructor has a property called `length` which is always equal to `1`. This is not the same as the length property of a string instance as shown above.

```js
console.assert(String.length === 1);
console.log(String.length)
```