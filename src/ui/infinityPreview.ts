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
      this.setWebviewContents();
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
    const obj = factory(this.resource.fsPath);
    const syntaxHighlight = (json: string | Record<string, any>): string => {
      if (typeof json != "string") {
        json = JSON.stringify(json, undefined, 4);
      }
      json = json
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
          let cls = "number";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "key";
            } else {
              cls = "string";
            }
          } else if (/true|false/.test(match)) {
            cls = "boolean";
          } else if (/null/.test(match)) {
            cls = "null";
          }
          return '<span class="' + cls + '">' + match + "</span>";
        },
      );
    };
    const display = syntaxHighlight(obj);

    const defaultFontSize: Number = Number(
      vscode.workspace.getConfiguration().get("default.font.size"),
    );

    const html: string = `<!DOCTYPE html>
    <html dir="ltr" mozdisallowselectionprint>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; connect-src ${cspSource}; script-src 'unsafe-inline' ${cspSource}; style-src 'unsafe-inline' ${cspSource}; img-src blob: data: ${cspSource};">
    <style>
      .pre {
        outline: 1px solid #ccc;
        padding: 5px;
        margin: 5px;
      }
      .string {
        color: green;
      }
      .number {
        color: darkorange;
      }
      .boolean {
        color: blue;
      }
      .null {
        color: magenta;
      }
      .key {
        color: white;
      }
      .panel {
        position: fixed;
        right: 0;
        top: 30%;
        display: flex;
        background: #34ebb1;
        color: black;
        width: 50px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      button {
        background: none;
        border: none;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.2s;
      }
    </style>
    <script>
      function increaseFont() {
        const content = document.getElementById("pre");
        content.style.fontSize = (parseInt(content.style.fontSize.replace("%", ""), 10) + 10) + "%";
        const value = document.getElementById("font-size");
        value.innerHTML = content.style.fontSize;
      }
      function decreaseFont() {
        const content = document.getElementById("pre");
        content.style.fontSize = (parseInt(content.style.fontSize.replace("%", ""), 10) - 10) + "%";
        const value = document.getElementById("font-size");
        value.innerHTML = content.style.fontSize;
      }
    </script>
    <title>Infinity viewer</title>
    </head>
    <div class="panel">
      <button onclick="increaseFont()">⬆</button>
      <span id="font-size">${defaultFontSize}%</span>
      <button onclick="decreaseFont()">⬇</button>
    </div>
    <h1>${path.basename(this.resource.path)}</h1>`;
    this.webviewEditor.webview.html = `${html}<div><pre id="pre" style="font-size:${defaultFontSize}%">${display}<div><pre>`;
  }
}
