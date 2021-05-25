# Proxy

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