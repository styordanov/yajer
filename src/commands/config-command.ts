import * as path from 'path';
import { Commands, Extension, CommandArgs } from '../types';
import Command from './command';
import { window } from 'vscode';

export default class ConfigCommand extends Command {
	constructor(protected readonly extension: Extension) {
		super(Commands.CONFIG_FILE);
	}

	execute(args: CommandArgs) {
		const { file } = args;
		this.removeConfig(file);
		window.showInformationMessage(`Configuration reset for ${path.basename(file)}`);
	}
}
