import { TreeItem, TreeItemCollapsibleState, ThemeIcon } from 'vscode';
import { Test, IconPath, TestType } from '../types';

export default class TestTreeItem extends TreeItem {
	readonly test: Test;

	constructor(test: Test) {
		super(test.name, TreeItemCollapsibleState.None);
		this.test = test;
	}

	get id(): string {
		return this.test.id.toString();
	}

	get tooltip(): string {
		return `<${this.isTest ? 'test' : 'describe'}> ${this.test.name}`;
	}

	get contextValue(): string {
		return 'test';
	}

	get iconPath(): ThemeIcon {
		return {
			dark: '', //IconPath.build('snippet-dark.svg'),
			light: '' //IconPath.build('snippet-light.svg')
		};
	}

	get isTest(): boolean {
		return this.test.type === TestType.TEST;
	}
}
