import * as vscode from 'vscode';
import { InfinityPreview } from './infinityPreview';

export class InfinityProvider implements vscode.CustomReadonlyEditorProvider {
  public static readonly viewType = 'ie.preview';

  private readonly _previews = new Set<InfinityPreview>();
  private _activePreview: InfinityPreview | undefined;

  constructor(private readonly extensionRoot: vscode.Uri) {}

  public openCustomDocument(uri: vscode.Uri): vscode.CustomDocument {
    return { uri, dispose: (): void => {} };
  }

  public async resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewEditor: vscode.WebviewPanel
  ): Promise<void> {
    const preview = new InfinityPreview(
      this.extensionRoot,
      document.uri,
      webviewEditor
    );
    this._previews.add(preview);
    this.setActivePreview(preview);

    webviewEditor.onDidDispose(() => {
      preview.dispose();
      this._previews.delete(preview);
    });

    webviewEditor.onDidChangeViewState(() => {
      if (webviewEditor.active) {
        this.setActivePreview(preview);
      } else if (this._activePreview === preview && !webviewEditor.active) {
        this.setActivePreview(undefined);
      }
    });
  }

  public get activePreview(): InfinityPreview | undefined {
    return this._activePreview;
  }

  private setActivePreview(value: InfinityPreview | undefined): void {
    this._activePreview = value;
  }
}
