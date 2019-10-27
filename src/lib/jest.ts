import * as upath from 'upath';
import { readFileSync } from 'fs';
import { workspace } from 'vscode';
import { URL } from 'url';

export default class Jest {
	private static WIN_PATH = './node_modules/jest/bin/jest.js';
	private static UNIX_PATH = './node_modules/.bin/jest';

	private static getWorkspaceFolderPath(): string {
		const [workspaceFolder] = workspace.workspaceFolders;
		return workspaceFolder ? workspaceFolder.uri.fsPath : './';
	}

	static getConfigs(): string[] {
		const CONFIG_REGEX = /jest.+--config=([a-z0-9\/.]+)/i;

		const packageJSON = upath.join(Jest.getWorkspaceFolderPath(), 'package.json');
		const contents = readFileSync(new URL(`file://${packageJSON}`), 'utf8');

		const configs = contents.split('\n').reduce((configs, textLine) => {
			const matches = CONFIG_REGEX.exec(textLine);
			matches && configs.push(matches[1]);
			return configs;
		}, []);

		return [...new Set(configs)];
	}

	static getExecutable(): string {
		const jestPath = process.platform.includes('win32') ? Jest.WIN_PATH : Jest.UNIX_PATH;
		return upath.join(Jest.getWorkspaceFolderPath(), jestPath);
	}
}
