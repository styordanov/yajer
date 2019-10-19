import { Commands, RunCommandMarkdownArgs, Extension } from '../types';
import RunCommand from './run-command';

export default class RunFileCommand extends RunCommand {
	protected markdownArgs: RunCommandMarkdownArgs = {
		title: 'Run File',
		description: 'Run current file'
	};

	constructor(protected readonly extension: Extension) {
		super(Commands.RUN_FILE, extension);
	}
}
