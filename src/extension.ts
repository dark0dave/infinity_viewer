import * as vscode from "vscode";
import { InfinityProvider } from "./ui/infinityProvider";

export async function activate(context: vscode.ExtensionContext) {
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

export async function deactivate() {}
