import { pathArraysToTree } from ".";

test("works", () => {
  const pathArrays = [
    ["a"],
    ["a", "b"],
    ["a", "b", "c"],
    ["a", "b", "d"],
    ["a", "e", "f"],
  ];
  const expected = {
    page: true,
    children: {
      a: {
        page: true,
        children: {
          b: {
            page: true,
            children: {
              c: { page: true, children: {} },
              d: { page: true, children: {} },
            },
          },
          e: {
            page: false,
            children: {
              f: { page: true, children: {} },
            },
          },
        },
      },
    },
  };
  const result = pathArraysToTree(pathArrays);
  expect(result).toEqual(expected);
});
