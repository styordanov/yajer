const crypto = require('crypto');
import { Commands, RunCommandArgs, Extension, RunCommandConfigs, RunCommandMarkdown } from '../types';
import Command from './command';
import ConfigQuickPick from '../quickpicks/config-quickpick';

export default class RunCommand extends Command {
	static configs: RunCommandConfigs = {};

	constructor(protected readonly extension: Extension) {
		super(Commands.RUN_TEST);
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
		if (forceConfig || !RunCommand.configs[hash]) {
			RunCommand.configs[hash] = await new ConfigQuickPick().show();
		}
		return RunCommand.configs[hash];
	}

	async execute(args: RunCommandArgs) {
		const { file, test, forceConfig } = args;
		const config = await this.getConfig(file, forceConfig);

		let command = `jest ${file}`;
		test && (command = `${command} -t "${test}"`);
		config && (command = `${command} -c "${config}"`);

		const terminal = await this.extension.terminal.get(true);
		terminal.sendText(command);
	}
}
