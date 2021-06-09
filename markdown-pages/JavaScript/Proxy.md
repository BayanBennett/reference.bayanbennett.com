---
title: Proxy
created: 2021-06-08T18:43:36.362Z
modified: 2021-06-07T00:00:00.000Z
tags: [Proxy]
---

```js
const original = { a: 1, b: 2, c: 3 };
const handlers = {
    get: (target, prop) => {
        console.log(prop);
        return target[prop];
    }
}
const proxied = new Proxy(original, handlers);

console.log(original.a);
console.log(proxied.a);
```