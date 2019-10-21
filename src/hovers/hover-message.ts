import { MarkdownString } from 'vscode';
import { Extension, RunCommandArgs, Commands } from '../types';

export default class HoverMessage {
	constructor(private readonly extension: Extension) {}

	public getMessage(args: RunCommandArgs): MarkdownString {
		const runTestCommandMessage = this.extension.commands[Commands.RUN_TEST].getMarkdown(args);
		const runFileCommandMessage = this.extension.commands[Commands.RUN_FILE].getMarkdown({ ...args, test: undefined });

		const runTestCommandForceConfigMessage = this.extension.commands[Commands.RUN_TEST].getMarkdown({ ...args, forceConfig: true });
		const runFileCommandForceConfigMessage = this.extension.commands[Commands.RUN_FILE].getMarkdown({ ...args, test: undefined, forceConfig: true });

		const message = `${runTestCommandMessage} | ${runFileCommandMessage} | ${runTestCommandForceConfigMessage} | ${runFileCommandForceConfigMessage}`;

		const markdown = new MarkdownString(message);
		markdown.isTrusted = true;
		return markdown;
	}
}
