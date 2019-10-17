import { Commands, RunCommandArgs, RunCommandMarkdownArgs } from '../types';
import Command from './command';

export default abstract class RunCommand extends Command {
	protected markdownArgs: RunCommandMarkdownArgs;

	constructor(protected readonly command: Commands) {
		super(command);
	}

	getMarkdownArgs<RunCommandArgs>(args: RunCommandArgs): string {
		return super.getMarkdownArgs(args);
	}

	getMarkdown(args: RunCommandArgs): string {
		return `[${this.markdownArgs.title}](${this.getMarkdownArgs(args)} "${this.markdownArgs.description}")`;
	}

	execute(...args: unknown[]) {
		console.log(args);
	}
}
