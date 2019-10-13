import { Range, ExtensionContext, TextEditor } from 'vscode';
import Document from './document';

export interface Test {
  name: string;
  range: Range;
}

export interface Extension {
  context: ExtensionContext;
  document: Document;
  editor: TextEditor;
}
