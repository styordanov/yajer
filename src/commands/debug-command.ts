import * as upath from 'upath';
import { DebugConfiguration, debug } from 'vscode';
import { Commands, Extension, CommandArgs } from '../types';
import Jest from '../lib/jest';
import Command from './command';

export default class DebugCommand extends Command {
	constructor(protected readonly extension: Extension) {
		super(Commands.DEBUG_TEST);
	}

	async execute(args: CommandArgs) {
		const { file, test, forceConfig } = args;
		const config = await this.getConfig(file, forceConfig);

		const debugConfiguration: DebugConfiguration = {
			console: 'integratedTerminal',
			internalConsoleOptions: 'neverOpen',
			name: 'Debug Jest Tests',
			program: Jest.getExecutable(),
			request: 'launch',
			type: 'node',
			args: ['--runInBand', upath.normalize(file)]
		};

		test && debugConfiguration.args.push('-t', `"${test}"`);
		test && debugConfiguration.args.push('-c', `"${config}"`);

		debug.startDebugging(undefined, debugConfiguration);
	}
}
