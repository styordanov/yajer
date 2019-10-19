import { URL } from 'url';
import { join } from 'path';
import { readFileSync } from 'fs';
import { workspace, window } from 'vscode';
import { Extension } from '../types';

export default class ConfigQuickPick {
	constructor(private readonly extension: Extension) {}

	private getWorkspaceFolderPath(): string {
		const [workspaceFolder] = workspace.workspaceFolders;
		return workspaceFolder ? workspaceFolder.uri.path : './';
	}

	private getConfigs(): string[] {
		const CONFIG_REGEX = /jest.+--config=([a-z0-9\/.]+)/i;

		const packageJSON = join(this.getWorkspaceFolderPath(), 'package.json');
		const contents = readFileSync(new URL(`file://${packageJSON}`), 'utf8');

		const configs = contents.split('\n').reduce((configs, textLine) => {
			const matches = CONFIG_REGEX.exec(textLine);
			matches && configs.push(matches[1]);
			return configs;
		}, []);

		return [...new Set(configs)];
	}

	show() {
		return window.showQuickPick(this.getConfigs());
	}
}
