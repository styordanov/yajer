import { TextDocument, Position, CancellationToken, Hover, Range, languages, Disposable } from 'vscode';
import { Extension, Test } from './types';

export default class HoverProvider implements Disposable {
  private hoverDisposable: Disposable;

  constructor(private readonly extension: Extension) {}

  public dispose() {
    this.unregister();
  }

  private provideHover(document: TextDocument, position: Position, token: CancellationToken): Hover {
    const test: Test = this.extension.document.getTestOnLine(position.line);
    const range = document.validateRange(
      new Range(position.line, Number.MAX_SAFE_INTEGER, position.line, Number.MAX_SAFE_INTEGER)
    );
    return new Hover(test.name, range);
  }

  public register() {
    this.unregister();

    if (this.extension.editor === undefined) {
      return;
    }

    const subscriptions = [
      languages.registerHoverProvider(
        { pattern: this.extension.editor.document.uri.fsPath },
        {
          provideHover: this.provideHover.bind(this)
        }
      )
    ];
    this.hoverDisposable = Disposable.from(...subscriptions);
  }

  unregister() {
    this.hoverDisposable && this.hoverDisposable.dispose();
  }
}
