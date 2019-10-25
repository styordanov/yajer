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

	private getDebugCommandMarkdown(command: RunCommandMarkdown, args: RunCommandArgs): MarkdownString {
		const debugCommand = this.extension.commands[Commands.DEBUG_TEST];
		const markdown = new MarkdownString(debugCommand.getMarkdown(command, args));
		markdown.isTrusted = true;
		return markdown;
	}

	private getRunTestMarkdown(args: RunCommandArgs): MarkdownString {
		return this.getRunCommandMarkdown({ title: '↪', description: 'Run current test with last known config' }, args);
	}

	private getRunFileMarkdown(args: RunCommandArgs): MarkdownString {
		return this.getRunCommandMarkdown({ title: '↪↪', description: 'Run current file with last known config' }, { ...args, test: undefined });
	}

	private getRunTestConfigMarkdown(args: RunCommandArgs): MarkdownString {
		return this.getRunCommandMarkdown({ title: '↬', description: 'Run current test' }, { ...args, forceConfig: true });
	}

	private getRunFileConfigMarkdown(args: RunCommandArgs): MarkdownString {
		return this.getRunCommandMarkdown({ title: '↬↬', description: 'Run current file' }, { ...args, test: undefined, forceConfig: true });
	}

	private getDebugTestMarkdown(args: RunCommandArgs): MarkdownString {
		return this.getDebugCommandMarkdown({ title: '↪ debug', description: 'Debug current test with last known config' }, args);
	}

	private getDebugTestConfigMarkdown(args: RunCommandArgs): MarkdownString {
		return this.getRunCommandMarkdown({ title: '↬ debug', description: 'Debug current test' }, { ...args, forceConfig: true });
	}

	public getMessage(args: RunCommandArgs): MarkdownString {
		const runTestCommandMarkdown = this.getRunTestMarkdown(args);
		const runFileCommandMarkdown = this.getRunFileMarkdown(args);
		const runTestCommandConfigMarkdown = this.getRunTestConfigMarkdown(args);
		const runFileCommandConfigMarkdown = this.getRunFileConfigMarkdown(args);

		const debugTestCommandMarkdown = this.getDebugTestMarkdown(args);
		const debugTestCommandConfigMarkdown = this.getDebugTestConfigMarkdown(args);

		const message = [
			runTestCommandMarkdown.value,
			runFileCommandMarkdown.value,
			runTestCommandConfigMarkdown.value,
			runFileCommandConfigMarkdown.value,
			debugTestCommandMarkdown.value,
			debugTestCommandConfigMarkdown.value
		].join(' ');

		const markdown = new MarkdownString(message);
		markdown.isTrusted = true;
		return markdown;
	}
}
