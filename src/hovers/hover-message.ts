import { MarkdownString } from 'vscode';
import { Extension, RunCommandArgs, Commands } from '../types';

export default class HoverMessage {
	constructor(private readonly extension: Extension) {}

	public getMessage(args: RunCommandArgs): MarkdownString {
		const runCommand = this.extension.commands[Commands.RUN_TEST];

		const runTestCommandMessage = runCommand.getMarkdown({ title: 'Run Test' }, args);
		const runFileCommandMessage = runCommand.getMarkdown({ title: 'Run File' }, { ...args, test: undefined });

		const runTestCommandForceConfigMessage = runCommand.getMarkdown({ title: 'Run Test *' }, { ...args, forceConfig: true });
		const runFileCommandForceConfigMessage = runCommand.getMarkdown({ title: 'Run File *' }, { ...args, test: undefined, forceConfig: true });

		const message = `${runTestCommandMessage} | ${runFileCommandMessage} | ${runTestCommandForceConfigMessage} | ${runFileCommandForceConfigMessage}`;

		const markdown = new MarkdownString(message);
		markdown.isTrusted = true;
		return markdown;
	}
}
