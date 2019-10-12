import { ExtensionContext, window, workspace } from 'vscode';
import Decorator from './lib/decorator';

export function activate(context: ExtensionContext) {
  console.log('Congratulations, your extension "yajer" is now active!');

  const decorator = new Decorator(window.activeTextEditor);
  decorator.triggerUpdateDecorations();

  window.onDidChangeActiveTextEditor(
    editor => {
      decorator.setEditor(editor);
      decorator.triggerUpdateDecorations();
    },
    null,
    context.subscriptions
  );

  workspace.onDidChangeTextDocument(
    event => {
      if (decorator.getEditor() && event.document === decorator.getEditor().document) {
        decorator.triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
