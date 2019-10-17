import { DecorationOptions, TextEditorDecorationType, Uri, window } from 'vscode';
import { Extension } from '../types';

export default class Decorator {
  private timeout: NodeJS.Timer;
  private decorations: DecorationOptions[] = [];
  public static decorationType: TextEditorDecorationType = window.createTextEditorDecorationType({
    after: { margin: '0 0 0 1rem' }
  });

  constructor(private readonly extension: Extension) {}

  private getDecorations() {
    const contentIconPath = Uri.file(this.extension.context.asAbsolutePath('media/lab.svg').replace(/\\/g, '/'));

    const tests = this.extension.document.getTests();
    this.decorations = tests.map(({ range }) => ({
      range,
      renderOptions: { after: { contentIconPath } }
    }));
    return this.decorations;
  }

  private setDecorations() {
    this.extension.editor && this.extension.editor.setDecorations(Decorator.decorationType, this.getDecorations());
  }

  public update() {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(this.setDecorations.bind(this), 500);
  }
}
