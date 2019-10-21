import { MarkdownString } from 'vscode';
import { Extension, RunCommandArgs, Commands, RunCommandMarkdown } from '../types';

export default class HoverMessage {
	constructor(private readonly extension: Extension) {}

	private getRunCommandMarkdown(command: RunCommandMarkdown, args: RunCommandArgs): MarkdownString {
		const runCommand = this.extension.commands[Commands.RUN_TEST];
		const markdown = new MarkdownString(runCommand.getMarkdown(command, args));
		markdown.isTrusted = true;
		return markdown;
	}

	private getRunTestMarkdown(args: RunCommandArgs): MarkdownString {
		return this.getRunCommandMarkdown({ title: 'Run Test', description: 'Run current test' }, args);
	}

	private getRunFileMarkdown(args: RunCommandArgs): MarkdownString {
		return this.getRunCommandMarkdown({ title: 'Run File', description: 'Run current file' }, { ...args, test: undefined });
	}

	private getRunTestConfigMarkdown(args: RunCommandArgs): MarkdownString {
		return this.getRunCommandMarkdown(
			{ title: 'Run Test *', description: 'Run current test with last known config' },
			{ ...args, forceConfig: true }
		);
	}

	private getRunFileConfigMarkdown(args: RunCommandArgs): MarkdownString {
		return this.getRunCommandMarkdown(
			{ title: 'Run File *', description: 'Run current file with last known config' },
			{ ...args, test: undefined, forceConfig: true }
		);
	}

	public getMessage(args: RunCommandArgs): MarkdownString {
		const runTestCommandMarkdown = this.getRunTestMarkdown(args);
		const runFileCommandMarkdown = this.getRunFileMarkdown(args);
		const runTestCommandConfigMarkdown = this.getRunTestConfigMarkdown(args);
		const runFileCommandConfigMarkdown = this.getRunFileConfigMarkdown(args);

		const message = [
			runTestCommandMarkdown.value,
			runFileCommandMarkdown.value,
			runTestCommandConfigMarkdown.value,
			runFileCommandConfigMarkdown.value
		].join(' ● ');

		const markdown = new MarkdownString(message);
		markdown.isTrusted = true;
		return markdown;
	}
}
