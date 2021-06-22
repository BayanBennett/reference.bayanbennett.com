---
title: String
created: 2021-06-08T18:43:36.362Z
modified: 2021-06-22T22:31:47.262Z
tags: [String]
---

```js
const doubleQuoteString = "this is a double quote string";
const singleQuoteString = 'this is a single quote string';
const backtickString = `this is a backtick string`;

const areAllStrings = [
  doubleQuoteString,
  singleQuoteString,
  backtickString,
].every(({ constructor }) => constructor === String);

console.assert(areAllStrings);

console.log(doubleQuoteString, singleQuoteString, backtickString);
```

## Template Strings

```js
const x = 1;
const y = `the value of x is ${x}`;

console.assert(y === "the value of x is 1");
```
