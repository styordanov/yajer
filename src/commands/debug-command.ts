const crypto = require('crypto');
import { DebugConfiguration, debug } from 'vscode';
import { Commands, Extension, CommandArgs } from '../types';
import Command from './command';
import ConfigQuickPick from '../quickpicks/config-quickpick';

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
			program: 'jest',
			request: 'launch',
			type: 'node',
			args: ['--runInBand', file]
		};

		test && debugConfiguration.args.push('-t', `"${test}"`);
		test && debugConfiguration.args.push('-c', `"${config}"`);

		debug.startDebugging(undefined, debugConfiguration);
	}
}
