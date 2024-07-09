import * as vscode from "vscode";
import { InfinityProvider } from "./ui/infinityProvider";

const ie_types_supported = ["cre"];

export function activate(context: vscode.ExtensionContext) {
  const extensionRoot = vscode.Uri.file(context.extensionPath);
  // Register our custom editor provider
  const provider = new InfinityProvider(extensionRoot);

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      InfinityProvider.viewType,
      provider,
      {
        webviewOptions: {
          enableFindWidget: false,
          retainContextWhenHidden: true,
        },
      },
    ),
  );
}

export function deactivate() {}
