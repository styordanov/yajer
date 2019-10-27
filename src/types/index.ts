import { Range, ExtensionContext, TextEditor } from 'vscode';
import Document from '../documents/document';
import TerminalProvider from '../terminals/terminal-provider';
import Command from '../commands/command';

export enum TestType {
	TEST = 'test',
	DESCRIBE = 'describe'
}
export interface Test {
	name: string;
	range: Range;
	type: TestType;
	parent: number;
}

export interface TestParent {
	[name: string]: number;
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

export interface CommandArgs {
	file: string;
	test?: string;
	forceConfig?: boolean;
}

export interface CommandConfigs {
	[key: string]: string;
}

export interface CommandMarkdown {
	title: string;
	description?: string;
}

export enum Commands {
	RUN_TEST = 'yajer.run.test',
	DEBUG_TEST = 'yajer.debug.test'
}

export interface IconPath {
	dark: string;
	light: string;
}
