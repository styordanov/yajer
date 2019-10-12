import * as vscode from 'vscode';
import Document from './lib/document';

interface Extension {
	editor: vscode.TextEditor;
}

const extension: Extension = {
	editor: vscode.window.activeTextEditor
};

const updateDecorations = () => {
	const lines = Document.getLines(extension.editor.document);
	const tests = Document.getTests(extension.editor.document);
	console.log(lines, tests);
};

const triggerUpdateDecorations = (timeout: NodeJS.Timer | undefined) => {
	timeout && clearTimeout(timeout);
	timeout = setTimeout(updateDecorations, 500);
};

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "yajer" is now active!');

	let timeout: NodeJS.Timer | undefined = undefined;
	extension.editor && triggerUpdateDecorations(timeout);

	vscode.window.onDidChangeActiveTextEditor(
		editor => {
			extension.editor = editor;
			if (editor) {
				triggerUpdateDecorations(timeout);
			}
		},
		null,
		context.subscriptions
	);

	vscode.workspace.onDidChangeTextDocument(
		event => {
			if (extension.editor && event.document === extension.editor.document) {
				triggerUpdateDecorations(timeout);
			}
		},
		null,
		context.subscriptions
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
