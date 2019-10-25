const crypto = require('crypto');
import { DebugConfiguration, debug } from 'vscode';
import { Commands, RunCommandArgs, Extension, RunCommandConfigs, RunCommandMarkdown } from '../types';
import Command from './command';
import ConfigQuickPick from '../quickpicks/config-quickpick';

export default class DebugCommand extends Command {
	static configs: RunCommandConfigs = {};

	constructor(protected readonly extension: Extension) {
		super(Commands.DEBUG_TEST);
	}

	getMarkdown(command: RunCommandMarkdown, args: RunCommandArgs): string {
		return `[\`${command.title}\`](${this.getMarkdownArgs(args)} "${command.description}")`;
	}

	private generateHash(message: string): string {
		return crypto
			.createHash('md5')
			.update(message)
			.digest('hex');
	}

	private async getConfig(file: string, forceConfig: boolean): Promise<string> {
		const hash = this.generateHash(file);
		if (forceConfig || !DebugCommand.configs[hash]) {
			DebugCommand.configs[hash] = await ConfigQuickPick.show();
		}
		return DebugCommand.configs[hash];
	}

	async execute(args: RunCommandArgs) {
		const { file, test, forceConfig } = args;
		const config = await this.getConfig(file, forceConfig);

		const debugConfiguration: DebugConfiguration = {
			console: 'integratedTerminal',
			internalConsoleOptions: 'neverOpen',
			name: 'Debug Jest Tests',
			program: 'jest',
			request: 'launch',
			type: 'node',
			args: ['--runInBand', file]
		};

		test && debugConfiguration.args.push(['-t', `"${test}"`]);
		test && debugConfiguration.args.push(['-c', `"${config}"`]);

		debug.startDebugging(undefined, debugConfiguration);
	}
}
