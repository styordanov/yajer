import { MarkdownString } from 'vscode';
import { RunCommandArgs } from '../types';
import { runTestCommand, runFileCommand } from '../commands';

export default class HoverMessage {
	public static getMessage(args: RunCommandArgs): MarkdownString {
		const runTestCommandMessage = runTestCommand.getMarkdown(args);
		const runFileCommandMessage = runFileCommand.getMarkdown({ ...args, test: undefined });

		const message = `${runTestCommandMessage} | ${runFileCommandMessage}`;

		const markdown = new MarkdownString(message);
		markdown.isTrusted = true;
		return markdown;
	}
}
