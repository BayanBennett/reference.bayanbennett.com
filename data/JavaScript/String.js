const doubleQuoteString = "this is a double quote string";
const singleQuoteString = "this is a single quote string";
const backtickString = `this is a backtick string`;

const areAllStrings = [
  doubleQuoteString,
  singleQuoteString,
  backtickString,
].every(({ constructor }) => constructor === String);

console.assert(areAllStrings);

console.log(doubleQuoteString, singleQuoteString, backtickString);
