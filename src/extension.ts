import { ExtensionContext, window, workspace } from 'vscode';
import { Extension, Commands } from './types';
import Jest from './lib/jest';
import Document from './documents/document';
import Decorator from './decorators/decorator';
import HoverProvider from './hovers/hover-provider';
import TerminalProvider from './terminals/terminal-provider';
import RunCommand from './commands/run-command';
import DebugCommand from './commands/debug-command';
import ConfigCommand from './commands/config-command';
import TestsTreeDataProvider from './treeviews/tests-tree-data-provider';

export function activate(context: ExtensionContext) {
	const editor = window.activeTextEditor;
	const document = new Document(editor && editor.document);
	const terminal = new TerminalProvider();

	const extension: Extension = { context, document, editor, terminal, commands: {} };

	extension.commands[Commands.RUN_TEST] = new RunCommand(extension);
	extension.commands[Commands.DEBUG_TEST] = new DebugCommand(extension);
	extension.commands[Commands.CONFIG_TEST] = new ConfigCommand(extension);

	const decorator = new Decorator(extension);
	const hoverProvider = new HoverProvider(extension);
	const treeViewProvider = new TestsTreeDataProvider(extension);

	decorator.update();
	hoverProvider.register();
	treeViewProvider.register();

	Jest.getConfigs();

	window.onDidChangeActiveTextEditor(
		editor => {
			extension.editor = editor;
			extension.document = new Document(editor.document);
			decorator.update();
			hoverProvider.register();
			treeViewProvider.refresh();
		},
		null,
		context.subscriptions
	);

	workspace.onDidChangeTextDocument(
		event => {
			if (extension.editor && event.document === extension.editor.document) {
				decorator.update();
				treeViewProvider.refresh();
			}
		},
		null,
		context.subscriptions
	);

	workspace.onDidChangeConfiguration(event => {
		event.affectsConfiguration('yajer.jestConfigPatterns') && Jest.getConfigs(true);
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
