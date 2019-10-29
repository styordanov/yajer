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
	forceConfig?: boolean;
	context?: TestTreeItem;
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

export enum ContextCommands {
	RUN_TEST_LAST_CONFIG = 'yajer.run.test.last.config',
	RUN_TEST_FORCE_CONFIG = 'yajer.run.test.force.config',
	RUN_FILE_LAST_CONFIG = 'yajer.run.file.last.config',
	RUN_FILE_FORCE_CONFIG = 'yajer.run.file.force.config',
	DEBUG_TEST_LAST_CONFIG = 'yajer.debug.test.last.config',
	DEBUG_TEST_FORCE_CONFIG = 'yajer.debug.test.force.config'
}

export interface IconPath {
	dark: string;
	light: string;
}
