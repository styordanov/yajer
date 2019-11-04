import { Range, ExtensionContext, TextEditor } from 'vscode';
import Document from '../documents/document';
import TerminalProvider from '../terminals/terminal-provider';
import Command from '../commands/command';
import TestTreeItem from '../treeviews/test-tree-item';

export enum TestType {
	TEST = 'test',
	DESCRIBE = 'describe'
}
export interface Test {
	id: number | undefined;
	name: string;
	range: Range;
	type: TestType;
	parent?: number;
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
	context?: TestTreeItem;
}

export interface CommandMarkdown {
	title: string;
	description?: string;
}

export enum Commands {
	RUN_TEST = 'yajer.run.test',
	DEBUG_FILE = 'yajer.debug.file',
	CONFIG_FILE = 'yajer.config.file'
}

export enum ContextCommands {
	RUN_TEST = 'yajer.run.test.context',
	RUN_FILE = 'yajer.run.file.context',
	DEBUG_FILE = 'yajer.debug.file.context',
	CONFIG_FILE = 'yajer.config.reset.context'
}

export interface IconPath {
	dark: string;
	light: string;
}
