import { TreeItem, TreeItemCollapsibleState, ThemeIcon } from 'vscode';
import { Test, TestType } from '../types';
import IconPathBuilder from '../lib/icon-path-builder';

export default class TestTreeItem extends TreeItem {
	readonly item: Test;
	private items: TestTreeItem[] | undefined;

	constructor(test: Test) {
		super(test.name, TreeItemCollapsibleState.None);
		this.item = test;
	}

	get id(): string {
		return String(this.item.id);
	}

	get tooltip(): string {
		return `<${this.isTest ? 'test' : 'describe'}> ${this.item.name}`;
	}

	get contextValue(): string {
		return 'test';
	}

	get iconPath(): ThemeIcon {
		return {
			dark: IconPathBuilder.build('lab-dark.svg'),
			light: IconPathBuilder.build('lab-light.svg')
		};
	}

	get isTest(): boolean {
		return this.item.type === TestType.TEST;
	}

	get parentID(): string {
		return String(this.item.parent);
	}

	set children(items: TestTreeItem[]) {
		this.items = items;
		!!this.items.length && (this.collapsibleState = TreeItemCollapsibleState.Expanded);
	}

	get children(): TestTreeItem[] | undefined {
		return this.items;
	}
}
