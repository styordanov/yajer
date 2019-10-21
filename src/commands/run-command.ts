const crypto = require('crypto');
import { Commands, RunCommandArgs, RunCommandMarkdownArgs, Extension, RunCommandConfigs } from '../types';
import Command from './command';
import ConfigQuickPick from '../quickpicks/config-quickpick';

export default abstract class RunCommand extends Command {
	static configs: RunCommandConfigs = {};
	protected markdownArgs: RunCommandMarkdownArgs;

	constructor(protected readonly command: Commands, protected readonly extension: Extension) {
		super(command);
	}

	getMarkdownArgs<RunCommandArgs>(args: RunCommandArgs): string {
		return super.getMarkdownArgs(args);
	}

	getMarkdown(args: RunCommandArgs): string {
		return `[${this.markdownArgs.title}](${this.getMarkdownArgs(args)} "${this.markdownArgs.description}")`;
	}

	private generateHash(message: string): string {
		return crypto
			.createHash('md5')
			.update(message)
			.digest('hex');
	}

	private async getConfig(file: string): Promise<string> {
		const hash = this.generateHash(file);
		!RunCommand.configs[hash] && (RunCommand.configs[hash] = await new ConfigQuickPick().show());
		return RunCommand.configs[hash];
	}

	async execute(args: RunCommandArgs) {
		const { file, test } = args;
		const config = await this.getConfig(file);

		let command = `jest ${file}`;
		test && (command = `${command} -t "${test}"`);
		config && (command = `${command} -c "${config}"`);

		const terminal = await this.extension.terminal.get(true);
		terminal.sendText(command);
	}
}
