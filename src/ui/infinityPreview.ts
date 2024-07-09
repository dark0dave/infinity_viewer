import * as path from "path";
import * as vscode from "vscode";
import { Disposable } from "./disposable";
import factory from "../models/factory";

type PreviewState = "Disposed" | "Visible" | "Active";

export class InfinityPreview extends Disposable {
  private _previewState: PreviewState = "Visible";

  async getFileData() {
    var uri = this._uri;
    return await vscode.workspace.fs.readFile(uri);
  }

  constructor(
    private readonly extensionRoot: vscode.Uri,
    private readonly resource: vscode.Uri,
    private readonly webviewEditor: vscode.WebviewPanel,
  ) {
    super();
    const resourceRoot = resource.with({
      path: resource.path.replace(/\/[^/]+?\.\w+$/, "/"),
    });

    webviewEditor.webview.options = {
      enableScripts: true,
      localResourceRoots: [resourceRoot, extensionRoot],
    };

    this._register(
      webviewEditor.webview.onDidReceiveMessage((message) => {
        switch (message.type) {
          case "reopen-as-text": {
            vscode.commands.executeCommand(
              "vscode.openWith",
              resource,
              "default",
              webviewEditor.viewColumn,
            );
            break;
          }
        }
      }),
    );

    this._register(
      webviewEditor.onDidChangeViewState(() => {
        this.update();
      }),
    );

    this._register(
      webviewEditor.onDidDispose(() => {
        this._previewState = "Disposed";
      }),
    );

    const watcher = this._register(
      vscode.workspace.createFileSystemWatcher(resource.fsPath),
    );
    this._register(
      watcher.onDidChange((e) => {
        if (e.toString() === this.resource.toString()) {
          this.reload();
        }
      }),
    );
    this._register(
      watcher.onDidDelete((e) => {
        if (e.toString() === this.resource.toString()) {
          this.webviewEditor.dispose();
        }
      }),
    );

    this.webviewEditor.webview.html = this.getWebviewContents();
    this.update();
  }

  private reload(): void {
    if (this._previewState !== "Disposed") {
      this.webviewEditor.webview.postMessage({ type: "reload" });
    }
  }

  private update(): void {
    if (this._previewState === "Disposed") {
      return;
    }

    if (this.webviewEditor.active) {
      this._previewState = "Active";
      return;
    }
    this._previewState = "Visible";
  }

  private getWebviewContents(): string {
    const webview = this.webviewEditor.webview;
    const docPath = webview.asWebviewUri(this.resource);
    const cspSource = webview.cspSource;
    const resolveAsUri = (...p: string[]): vscode.Uri => {
      const uri = vscode.Uri.file(path.join(this.extensionRoot.path, ...p));
      return webview.asWebviewUri(uri);
    };

    const json = factory(this.extensionRoot.path);
    const head = `<!DOCTYPE html>
    <html dir="ltr" mozdisallowselectionprint>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="google" content="notranslate">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; connect-src ${cspSource}; script-src 'unsafe-inline' ${cspSource}; style-src 'unsafe-inline' ${cspSource}; img-src blob: data: ${cspSource};">
    <title>PDF.js viewer</title>
    <link rel="resource" type="application/l10n" href="${resolveAsUri(
      "lib",
      "web",
      "locale",
      "locale.properties",
    )}">
    <link rel="stylesheet" href="${resolveAsUri("lib", "web", "viewer.css")}">
    <link rel="stylesheet" href="${resolveAsUri("lib", "pdf.css")}">
    <script src="${resolveAsUri("lib", "build", "pdf.js")}"></script>
    <script src="${resolveAsUri("lib", "build", "pdf.worker.js")}"></script>
    <script src="${resolveAsUri("lib", "web", "viewer.js")}"></script>
    <script src="${resolveAsUri("lib", "main.js")}"></script>
    </head>`;

    const body = "<pre>" + JSON.stringify(json, null, 2) + "</pre>";

    return head + body;
  }
}
