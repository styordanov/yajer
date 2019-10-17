import { Range, ExtensionContext, TextEditor } from 'vscode';
import Document from '../documents/document';

export interface Test {
  name: string;
  range: Range;
}

export interface Extension {
  context: ExtensionContext;
  document: Document;
  editor: TextEditor;
}

export interface RunCommandArgs {
  file: string;
  test?: string;
  config?: string;
}

export interface RunCommandMarkdownArgs {
  title: string;
  description?: string;
}

export enum Commands {
  RUN_FILE = 'yajer.run.file',
  RUN_TEST = 'yajer.run.test'
}
