import { Event, EventEmitter, TreeDataProvider, TreeItem, window } from 'vscode';
import { Extension } from '../types';
import TestTreeItem from './test-tree-item';

export default class TestsTreeDataProvider implements TreeDataProvider<TreeItem> {
	private testItems: TestTreeItem[];

	private onDidChangeTreeDataEventEmitter: EventEmitter<TreeItem | undefined> = new EventEmitter<TreeItem | undefined>();
	readonly onDidChangeTreeData: Event<TreeItem | undefined> = this.onDidChangeTreeDataEventEmitter.event;

	constructor(private readonly extension: Extension) {
		this.refresh();
	}

	refresh(): void {
		this.onDidChangeTreeDataEventEmitter.fire();
		this.testItems = this.extension.document.getTests().map(test => new TestTreeItem(this.extension, test));
	}

	getTreeItem(element: TestTreeItem): TestTreeItem {
		return element;
	}

	getChildren(element?: TestTreeItem): TestTreeItem[] {
		return element ? this.testItems : this.testItems;
	}

	register() {
		const view = window.createTreeView('yajer', { treeDataProvider: this, showCollapseAll: true });
		this.extension.context.subscriptions.push(view);
	}
}
