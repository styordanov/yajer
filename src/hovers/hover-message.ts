import { MarkdownString } from 'vscode';
import { Extension, CommandArgs, Commands, CommandMarkdown } from '../types';

export default class HoverMessage {
	constructor(private readonly extension: Extension) {}

	private getRunCommandMarkdown(command: CommandMarkdown, args: CommandArgs): MarkdownString {
		const runCommand = this.extension.commands[Commands.RUN_TEST];
		const markdown = new MarkdownString(runCommand.getMarkdown(command, args));
		markdown.isTrusted = true;
		return markdown;
	}

	private getDebugCommandMarkdown(command: CommandMarkdown, args: CommandArgs): MarkdownString {
		const debugCommand = this.extension.commands[Commands.DEBUG_TEST];
		const markdown = new MarkdownString(debugCommand.getMarkdown(command, args));
		markdown.isTrusted = true;
		return markdown;
	}

	private getConfigCommandMarkdown(command: CommandMarkdown, args: CommandArgs): MarkdownString {
		const configCommand = this.extension.commands[Commands.CONFIG_TEST];
		const markdown = new MarkdownString(configCommand.getMarkdown(command, args));
		markdown.isTrusted = true;
		return markdown;
	}

	private getRunTestMarkdown(args: CommandArgs): MarkdownString {
		return this.getRunCommandMarkdown({ title: 'Run Test', description: 'Run current test with last known config' }, args);
	}

	private getRunFileMarkdown(args: CommandArgs): MarkdownString {
		return this.getRunCommandMarkdown({ title: 'Run File', description: 'Run current file with last known config' }, { ...args, test: undefined });
	}

	private getRunTestConfigMarkdown(args: CommandArgs): MarkdownString {
		return this.getRunCommandMarkdown(
			{ title: 'Run Test (new config)', description: 'Run current test with new config' },
			{ ...args, forceConfig: true }
		);
	}

	private getRunFileConfigMarkdown(args: CommandArgs): MarkdownString {
		return this.getRunCommandMarkdown(
			{ title: 'Run File (new config)', description: 'Run current file with new config' },
			{ ...args, test: undefined, forceConfig: true }
		);
	}

	private getDebugTestMarkdown(args: CommandArgs): MarkdownString {
		return this.getDebugCommandMarkdown({ title: 'Debug Test', description: 'Debug current test with last known config' }, args);
	}

	private getDebugTestConfigMarkdown(args: CommandArgs): MarkdownString {
		return this.getRunCommandMarkdown(
			{ title: 'Debug Test (new config)', description: 'Debug current test with new config' },
			{ ...args, forceConfig: true }
		);
	}

	private getConfigTestMarkdown(args: CommandArgs): MarkdownString {
		return this.getConfigCommandMarkdown({ title: 'Reset Config', description: 'Reset current file config' }, args);
	}

	public getMessage(args: CommandArgs): MarkdownString {
		const runTestCommandMarkdown = this.getRunTestMarkdown(args);
		const runFileCommandMarkdown = this.getRunFileMarkdown(args);
		const runTestCommandConfigMarkdown = this.getRunTestConfigMarkdown(args);
		const runFileCommandConfigMarkdown = this.getRunFileConfigMarkdown(args);

		const debugTestCommandMarkdown = this.getDebugTestMarkdown(args);
		const debugTestCommandConfigMarkdown = this.getDebugTestConfigMarkdown(args);

		const configTestCommandMarkdown = this.getConfigTestMarkdown(args);

		const message = [
			runTestCommandMarkdown.value,
			runTestCommandConfigMarkdown.value,
			'***',
			runFileCommandMarkdown.value,
			runFileCommandConfigMarkdown.value,
			'***',
			debugTestCommandMarkdown.value,
			debugTestCommandConfigMarkdown.value,
			'***',
			configTestCommandMarkdown.value
		].join('  \n');

		const markdown = new MarkdownString(message);
		markdown.isTrusted = true;
		return markdown;
	}
}
