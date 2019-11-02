import { MarkdownString } from 'vscode';
import { Extension, CommandArgs, Commands, CommandMarkdown } from '../types';

export default class HoverMessage {
	constructor(private readonly extension: Extension) {}

	private getCommandMarkdown(command: Commands, commandMarkdown: CommandMarkdown, args: CommandArgs): MarkdownString {
		const markdown = new MarkdownString(this.extension.commands[command].getMarkdown(commandMarkdown, args));
		markdown.isTrusted = true;
		return markdown;
	}

	private getRunTestMarkdown(args: CommandArgs): MarkdownString {
		return this.getCommandMarkdown(
			Commands.RUN_TEST,
			{
				title: 'Run Test',
				description: 'Run current test with last known config'
			},
			args
		);
	}

	private getRunFileMarkdown(args: CommandArgs): MarkdownString {
		return this.getCommandMarkdown(
			Commands.RUN_TEST,
			{
				title: 'Run File',
				description: 'Run current file with last known config'
			},
			{ ...args, test: undefined }
		);
	}

	private getDebugTestMarkdown(args: CommandArgs): MarkdownString {
		return this.getCommandMarkdown(
			Commands.DEBUG_TEST,
			{
				title: 'Debug Test',
				description: 'Debug current test with last known config'
			},
			{ ...args }
		);
	}

	private getConfigTestMarkdown(args: CommandArgs): MarkdownString {
		return this.getCommandMarkdown(
			Commands.CONFIG_TEST,
			{
				title: 'Reset Config',
				description: 'Reset configuration for current file'
			},
			args
		);
	}

	public getMessage(args: CommandArgs): MarkdownString {
		const runTestCommandMarkdown = this.getRunTestMarkdown(args);
		const runFileCommandMarkdown = this.getRunFileMarkdown(args);
		const debugTestCommandMarkdown = this.getDebugTestMarkdown(args);
		const configTestCommandMarkdown = this.getConfigTestMarkdown(args);

		const message = [
			runTestCommandMarkdown.value,
			runFileCommandMarkdown.value,
			debugTestCommandMarkdown.value,
			'***',
			configTestCommandMarkdown.value
		].join('  \n');

		const markdown = new MarkdownString(message);
		markdown.isTrusted = true;
		return markdown;
	}
}
