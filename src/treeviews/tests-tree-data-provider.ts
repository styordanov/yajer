import { Event, EventEmitter, TreeDataProvider, commands, window } from 'vscode';
import { Extension, ContextCommands, Commands, CommandArgs } from '../types';
import TestTreeItem from './test-tree-item';
import { asTree } from '../lib/test-utils';

export default class TestsTreeDataProvider implements TreeDataProvider<TestTreeItem> {
	private items: TestTreeItem[] = [];
	private subscriptions: { dispose: Function }[] = [];

	private onDidChangeTreeDataEventEmitter: EventEmitter<TestTreeItem | undefined> = new EventEmitter<TestTreeItem | undefined>();
	readonly onDidChangeTreeData: Event<TestTreeItem | undefined> = this.onDidChangeTreeDataEventEmitter.event;

	constructor(private readonly extension: Extension) {
		this.refresh();
		this.subscribe();
	}

	refresh(): void {
		this.onDidChangeTreeDataEventEmitter.fire();
		this.items = asTree(this.extension.document.getTests().map(test => new TestTreeItem(test)));
		commands.executeCommand('setContext', 'hasTestsInView', !!this.items.length);
		this.subscribe();
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
		this.unsubscribe();
		this.subscribeOne(ContextCommands.CONFIG_FILE, Commands.CONFIG_FILE, {});
		this.subscribeOne(ContextCommands.RUN_TEST, Commands.RUN_TEST, {});
		this.subscribeOne(ContextCommands.RUN_FILE, Commands.RUN_TEST, { context: null });
		this.subscribeOne(ContextCommands.OPEN_TEST, Commands.OPEN_TEST, {});
		this.subscribeOne(ContextCommands.DEBUG_FILE, Commands.DEBUG_FILE, {});
	}

	private subscribeOne(contextCommand: ContextCommands, command: Commands, params: Object) {
		const editor = this.extension.editor;
		const ecommands = this.extension.commands;
		const subscriptions = this.extension.context.subscriptions;

		const args = { file: editor && editor.document.fileName, ...params };
		const disposable = commands.registerCommand(contextCommand, (context = this) => ecommands[command].execute({ ...args, context }));

		subscriptions.push(disposable);
		this.subscriptions.push(disposable);
	}

	private unsubscribe() {
		this.subscriptions.forEach(subscription => subscription.dispose());
	}
}
