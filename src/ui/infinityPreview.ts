import * as vscode from "vscode";
import { Disposable } from "./disposable";
import factory from "../models/factory";
import * as path from "path";

type PreviewState = "Disposed" | "Visible" | "Active";

export class InfinityPreview extends Disposable {
  private _previewState: PreviewState = "Visible";

  constructor(
    private readonly extensionRoot: vscode.Uri,
    private readonly resource: vscode.Uri,
    private readonly webviewEditor: vscode.WebviewPanel,
  ) {
    super();
    const resourceRoot = resource.with({
      path: path.dirname(resource.path.trim()),
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
    this.setWebviewContents();
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

  private setWebviewContents(): void {
    const webview = this.webviewEditor.webview;
    const cspSource = webview.cspSource;
    const docPath = webview.asWebviewUri(this.resource);

    let html: string = `<!DOCTYPE html>
    <html dir="ltr" mozdisallowselectionprint>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; connect-src ${cspSource}; script-src 'unsafe-inline' ${cspSource}; style-src 'unsafe-inline' ${cspSource}; img-src blob: data: ${cspSource};">
    <title>Infinity viewer</title>
    </head>
    <h1>Infinity Viewer</h1>`;
    this.webviewEditor.webview.html = html;
    const obj = factory(docPath.path);
    const json = JSON.stringify(obj, null, 2);
    this.webviewEditor.webview.html += `<div><pre>${json}<div><pre>`;
  }
}
