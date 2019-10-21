import { Range, ExtensionContext, TextEditor } from 'vscode';
import Document from '../documents/document';
import TerminalProvider from '../terminals/terminal-provider';
import Command from '../commands/command';

export interface Test {
	name: string;
	range: Range;
}

export interface Extension {
	commands: ExtensionCommands;
	context: ExtensionContext;
	document: Document;
	editor: TextEditor;
	terminal: TerminalProvider;
}

export interface ExtensionCommands {
	[key: string]: Command;
}

export interface RunCommandArgs {
	file: string;
	test?: string;
	forceConfig?: boolean;
}

export interface RunCommandConfigs {
	[key: string]: string;
}

export interface RunCommandMarkdown {
	title: string;
	description?: string;
}

export enum Commands {
	RUN_TEST = 'yajer.run.test'
}
