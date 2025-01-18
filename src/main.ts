import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

interface FunctionNode {
  name: string;
  start: {
    line: number;
    index: number;
    column: number;
  };
  end: {
    line: number;
    index: number;
    column: number;
  };
}

export function getFunctionNode(
  code: string,
  index: number
): FunctionNode | undefined {
  let functionNode;

  const ast = parse(code);
  traverse(ast, {
    FunctionDeclaration(path) {
      const { node } = path;
      if (index >= node.start! && index <= node.end!) {
        console.log(node);

        const { id, loc } = node;
        functionNode = {
          name: id?.name,
          start: loc?.start,
          end: loc?.end,
        };
      }
    },
  });

  return functionNode;
}
