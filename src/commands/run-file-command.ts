import { Commands, RunCommandMarkdownArgs, RunCommandArgs } from '../types';
import RunCommand from './run-command';

export default class RunFileCommand extends RunCommand {
	protected markdownArgs: RunCommandMarkdownArgs = {
		title: 'Run File',
		description: 'Run current file'
	};

	constructor() {
		super(Commands.RUN_FILE);
	}
}
