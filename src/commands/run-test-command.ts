import { Commands, RunCommandMarkdownArgs, RunCommandArgs } from '../types';
import RunCommand from './run-command';

export default class RunTestCommand extends RunCommand {
	protected markdownArgs: RunCommandMarkdownArgs = {
		title: 'Run Current',
		description: 'Run current test'
	};

	constructor() {
		super(Commands.RUN_TEST);
	}
}
