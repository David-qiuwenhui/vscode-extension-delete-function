// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getFunctionNode } from "./main";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "vscode-extension-delete-function" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "vscode-extension-delete-function.helloWorld",
    (params) => {
      vscode.window.showInformationMessage("heiheihei");

      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const code = editor?.document.getText();
      const index = editor?.document.offsetAt(editor.selection.active);
      const functionNode = getFunctionNode(code, index);
      if (!functionNode) {
        return;
      }

      // 删除字符
      // vscode ui
      editor.edit((editBuilder) => {
        editBuilder.delete(
          new vscode.Range(
            new vscode.Position(
              functionNode.start.line - 1,
              functionNode.start.column
            ),
            new vscode.Position(
              functionNode.end.line - 1,
              functionNode.end.column
            )
          )
        );
      });
    }
  );

  // 示例代码
  //   // The command has been defined in the package.json file
  //   // Now provide the implementation of the command with registerCommand
  //   // The commandId parameter must match the command field in package.json
  //   const disposable = vscode.commands.registerCommand(
  //     "vscode-extension-delete-function.helloWorld",
  //     () => {
  //       // The code you place here will be executed every time your command is executed
  //       // Display a message box to the user
  //       vscode.window.showInformationMessage(
  //         "Hello World123123 from vscode-extension-delete-function!"
  //       );
  //     }
  //   );

  //   context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
