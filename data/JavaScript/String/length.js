const myString = "this is a string";

console.assert(myString.length.constructor === Number);
console.assert(myString.length === 16);

console.log(myString.length);
