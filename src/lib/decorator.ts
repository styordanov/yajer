import { DecorationOptions, TextEditor, TextEditorDecorationType, window } from 'vscode';
import Document from './document';

export default class Decorator {
  private timeout: NodeJS.Timer;
  private decorations: DecorationOptions[] = [];
  public static decorationType: TextEditorDecorationType = window.createTextEditorDecorationType({
    after: { margin: '0 0 0 1rem' }
  });

  constructor(private editor: TextEditor) {}

  public getEditor() {
    return this.editor;
  }

  public setEditor(editor: TextEditor) {
    this.editor = editor;
  }

  private getDecorations() {
    const tests = new Document(this.editor.document).getTests();
    this.decorations = tests.map(({ name, range }) => ({
      range,
      renderOptions: { after: { contentText: name, color: 'red' } }
    }));
    return this.decorations;
  }

  private updateDecorations() {
    this.editor && this.editor.setDecorations(Decorator.decorationType, this.getDecorations());
  }

  public triggerUpdateDecorations() {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(this.updateDecorations.bind(this), 500);
  }
}
