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
		this.subscribeOne(ContextCommands.RUN_TEST_LAST_CONFIG, Commands.RUN_TEST, {});
		this.subscribeOne(ContextCommands.RUN_TEST_FORCE_CONFIG, Commands.RUN_TEST, { context: null });
		this.subscribeOne(ContextCommands.RUN_FILE_LAST_CONFIG, Commands.RUN_TEST, { forceConfig: true });
		this.subscribeOne(ContextCommands.RUN_FILE_FORCE_CONFIG, Commands.RUN_TEST, { context: null, forceConfig: true });
		this.subscribeOne(ContextCommands.DEBUG_TEST_LAST_CONFIG, Commands.DEBUG_TEST, {});
		this.subscribeOne(ContextCommands.DEBUG_TEST_FORCE_CONFIG, Commands.DEBUG_TEST, { forceConfig: true });
	}

	private subscribeOne(contextCommand: ContextCommands, command: Commands, params: Object) {
		const ecommands = this.extension.commands;
		const subscriptions = this.extension.context.subscriptions;

		const args = { file: this.extension.editor.document.fileName, ...params };
		subscriptions.push(commands.registerCommand(contextCommand, (context = this) => ecommands[command].execute({ ...args, context })));
	}
}
