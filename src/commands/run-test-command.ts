import { Commands, RunCommandMarkdownArgs, Extension } from '../types';
import RunCommand from './run-command';

export default class RunTestCommand extends RunCommand {
	protected markdownArgs: RunCommandMarkdownArgs = {
		title: 'Run Current',
		description: 'Run current test'
	};

	constructor(protected readonly extension: Extension) {
		super(Commands.RUN_TEST, extension);
	}
}
