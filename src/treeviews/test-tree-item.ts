import { TreeItem, TreeItemCollapsibleState, ThemeIcon } from 'vscode';
import { Test, IconPath, Commands, Extension } from '../types';

export default class TestTreeItem extends TreeItem {
	readonly test: Test;

	constructor(private readonly extension: Extension, test: Test) {
		super(test.name, TreeItemCollapsibleState.None);
		this.command = {
			command: Commands.RUN_TEST,
			title: '',
			arguments: [{ file: this.extension.editor.document.fileName, test: test.name }]
		};
		this.test = test;
	}

	get id(): string {
		return this.test.name;
	}

	get tooltip(): string {
		return `Run "${this.test.name}"`;
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
}
