import { Commands, RunCommandArgs, RunCommandMarkdownArgs, Extension } from '../types';
import Command from './command';

export default abstract class RunCommand extends Command {
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

	async execute(args: RunCommandArgs) {
		await this.extension.terminal.get(true);
	}
}
