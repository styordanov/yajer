import * as upath from 'upath';
import * as glob from 'glob';
import { readFileSync } from 'fs';
import { workspace } from 'vscode';
import { URL } from 'url';

export default class Jest {
	private static configs: string[] = [];
	private static WIN_PATH = './node_modules/jest/bin/jest.js';
	private static UNIX_PATH = './node_modules/.bin/jest';

	private static getWorkspaceFolderPath(): string {
		const [workspaceFolder] = workspace.workspaceFolders;
		return workspaceFolder ? workspaceFolder.uri.fsPath : './';
	}

	static getConfigsPackageJSON(): string[] {
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

	static getConfigs(forceReconfigure: boolean = false): string[] {
		const jestConfig: string = workspace.getConfiguration().get('yajer.jestConfig');
		if (jestConfig) {
			return [jestConfig];
		}

		const defaultPatterns = ['jest.config.js', 'jest.config.json'];
		const configPatterns: string = workspace.getConfiguration().get('yajer.jestConfigPatterns');
		const patterns = [...defaultPatterns, ...configPatterns.split(',')].filter(Boolean).map(p => `*${p.trim()}`);

		const pattern = `+(${patterns.join('|')})`;
		const options = { matchBase: true, nodir: true, ignore: 'node_modules/**', cwd: Jest.getWorkspaceFolderPath() };

		if (Jest.configs.length === 0 || forceReconfigure) {
			Jest.configs = glob.sync(pattern, options);
		}
		return Jest.configs;
	}

	static getExecutable(): string {
		const jestPath = process.platform.includes('win32') ? Jest.WIN_PATH : Jest.UNIX_PATH;
		return upath.join(Jest.getWorkspaceFolderPath(), jestPath);
	}

	static getCommand(): string {
		return workspace.getConfiguration().get('yajer.jestCommand') || `node ${Jest.getExecutable()}`;
	}
}
