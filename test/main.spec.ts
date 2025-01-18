import { expect, test } from "vitest";
import { getFunctionNode } from "../src/main.ts";
test("function", () => {
  const code = `
    function getName() {
        return "name";
    }
    function getNameA() {
        return "name";
    }`;
  const index = 10;
  const functionNode = getFunctionNode(code, index);
  console.log("functionNode", functionNode);

  expect(functionNode).toEqual({
    name: "getName",
    start: {
      line: 2,
      column: 4,
      index: 5,
    },
    end: {
      line: 4,
      column: 5,
      index: 54,
    },
  });
});

test("arrow function expression", () => {
  const code = `
    const getName = () => "heiheihei"
    const setNameA = () => "heiheihei"
  `;
  const index = 10;
  const functionNode = getFunctionNode(code, index);

  expect(functionNode).toEqual({
    name: "getName",
    start: {
      line: 2,
      column: 4,
      index: 5,
    },
    end: {
      line: 2,
      column: 37,
      index: 38,
    },
  });
});
