import { Event, EventEmitter, TreeDataProvider, commands, window } from 'vscode';
import { Extension, ContextCommands, Commands, CommandArgs } from '../types';
import TestTreeItem from './test-tree-item';
import { asTree } from '../lib/test-utils';

export default class TestsTreeDataProvider implements TreeDataProvider<TestTreeItem> {
	private items: TestTreeItem[];

	private onDidChangeTreeDataEventEmitter: EventEmitter<TestTreeItem | undefined> = new EventEmitter<TestTreeItem | undefined>();
	readonly onDidChangeTreeData: Event<TestTreeItem | undefined> = this.onDidChangeTreeDataEventEmitter.event;

	constructor(private readonly extension: Extension) {
		this.refresh();
		this.subscribe();
	}

	refresh(): void {
		this.onDidChangeTreeDataEventEmitter.fire();
		this.items = asTree(this.extension.document.getTests().map(test => new TestTreeItem(test)));
	}

	getTreeItem(element: TestTreeItem): TestTreeItem {
		return element;
	}

	getChildren(element?: TestTreeItem): TestTreeItem[] {
		return element ? element.children : this.items;
	}

	register() {
		const view = window.createTreeView('yajer', { treeDataProvider: this, showCollapseAll: true });
		this.extension.context.subscriptions.push(view);
	}

	subscribe() {
		const ecommands = this.extension.commands;
		const subscriptions = this.extension.context.subscriptions;

		subscriptions.push(commands.registerCommand(ContextCommands.RUN_TEST_LAST_CONFIG, ecommands[Commands.RUN_TEST].execute, this));
		subscriptions.push(commands.registerCommand(ContextCommands.RUN_TEST_FORCE_CONFIG, ecommands[Commands.RUN_TEST].execute, this));
		subscriptions.push(commands.registerCommand(ContextCommands.RUN_FILE_LAST_CONFIG, ecommands[Commands.RUN_TEST].execute, this));
		subscriptions.push(commands.registerCommand(ContextCommands.RUN_FILE_FORCE_CONFIG, ecommands[Commands.RUN_TEST].execute, this));
		subscriptions.push(commands.registerCommand(ContextCommands.DEBUG_TEST_LAST_CONFIG, ecommands[Commands.DEBUG_TEST].execute, this));
		subscriptions.push(commands.registerCommand(ContextCommands.DEBUG_TEST_FORCE_CONFIG, ecommands[Commands.DEBUG_TEST].execute, this));
	}
}
