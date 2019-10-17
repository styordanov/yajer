import { ExtensionContext, window, workspace } from 'vscode';
import Document from './documents/document';
import Decorator from './decorators/decorator';
import HoverProvider from './hovers/hover-provider';
import { Extension } from './types';

export function activate(context: ExtensionContext) {
  const editor = window.activeTextEditor;
  const document = new Document(editor.document);

  const extension: Extension = { context, document, editor };

  const decorator = new Decorator(extension);
  const hoverProvider = new HoverProvider(extension);

  decorator.update();
  hoverProvider.register();

  window.onDidChangeActiveTextEditor(
    editor => {
      extension.editor = editor;
      decorator.update();
      hoverProvider.register();
    },
    null,
    context.subscriptions
  );

  workspace.onDidChangeTextDocument(
    event => {
      if (extension.editor && event.document === extension.editor.document) {
        decorator.update();
        hoverProvider.register();
      }
    },
    null,
    context.subscriptions
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
