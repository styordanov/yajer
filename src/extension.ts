import { ExtensionContext, window, workspace } from 'vscode';
import Document from './documents/document';
import Decorator from './decorators/decorator';
import HoverProvider from './hovers/hover-provider';
import { Extension, Commands } from './types';
import TerminalProvider from './terminals/terminal-provider';
import RunCommand from './commands/run-command';
import DebugCommand from './commands/debug-command';

export function activate(context: ExtensionContext) {
	const editor = window.activeTextEditor;
	const document = new Document(editor && editor.document);
	const terminal = new TerminalProvider();

	const extension: Extension = { context, document, editor, terminal, commands: {} };

	extension.commands[Commands.RUN_TEST] = new RunCommand(extension);
	extension.commands[Commands.DEBUG_TEST] = new DebugCommand(extension);

	const decorator = new Decorator(extension);
	const hoverProvider = new HoverProvider(extension);

	decorator.update();
	hoverProvider.register();

	window.onDidChangeActiveTextEditor(
		editor => {
			extension.editor = editor;
			extension.document = new Document(editor.document);
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
			}
		},
		null,
		context.subscriptions
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
