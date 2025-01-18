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
        // console.log(node);

        const { id, loc } = node;
        functionNode = {
          name: id?.name,
          start: loc?.start,
          end: loc?.end,
        };
      }
    },

    ArrowFunctionExpression(path) {
      const variableDeclarationPath = path.parentPath.parentPath;
      function getName() {
        return Object.keys(path.parentPath.getBindingIdentifiers())[0];
      }

      if (variableDeclarationPath?.isVariableDeclaration()) {
        if (
          index >= variableDeclarationPath?.node?.start! &&
          index <= variableDeclarationPath?.node?.end!
        ) {
          functionNode = {
            name: getName(),
            start: variableDeclarationPath.node.loc?.start,
            end: variableDeclarationPath.node.loc?.end,
          };
        }
      }

      getName();
    },
  });

  return functionNode;
}
