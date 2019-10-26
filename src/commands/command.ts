import * as crypto from 'crypto';
import { Disposable, commands } from 'vscode';
import { Commands, CommandConfigs, CommandMarkdown, CommandArgs } from '../types';
import ConfigQuickPick from '../quickpicks/config-quickpick';

export default abstract class Command implements Disposable {
	static configs: CommandConfigs = {};
	private disposable: Disposable;

	constructor(protected readonly command: Commands) {
		this.disposable = commands.registerCommand(command, (args: unknown) => this.execute(args), this);
	}

	private generateHash(message: string): string {
		return crypto
			.createHash('md5')
			.update(message)
			.digest('hex');
	}

	protected async getConfig(file: string, forceConfig: boolean): Promise<string> {
		const hash = this.generateHash(file);
		if (forceConfig || !Command.configs[hash]) {
			Command.configs[hash] = await ConfigQuickPick.show();
		}
		return Command.configs[hash];
	}

	dispose() {
		this.disposable && this.disposable.dispose();
	}

	getMarkdownArgs(args: CommandArgs): string {
		return `command:${this.command}?${encodeURIComponent(JSON.stringify(args))}`;
	}

	getMarkdown(command: CommandMarkdown, args: CommandArgs): string {
		return `[\`${command.title}\`](${this.getMarkdownArgs(args)} "${command.description}")`;
	}

	abstract execute(args: unknown): unknown;
}
