import { Event, EventEmitter, TreeDataProvider, TreeItem, window } from 'vscode';
import { Extension } from '../types';
import TestTreeItem from './test-tree-item';
import { asTree } from '../lib/test-utils';

export default class TestsTreeDataProvider implements TreeDataProvider<TestTreeItem> {
	private items: TestTreeItem[];

	private onDidChangeTreeDataEventEmitter: EventEmitter<TestTreeItem | undefined> = new EventEmitter<TestTreeItem | undefined>();
	readonly onDidChangeTreeData: Event<TestTreeItem | undefined> = this.onDidChangeTreeDataEventEmitter.event;

	constructor(private readonly extension: Extension) {
		this.refresh();
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
}
