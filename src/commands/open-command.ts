import { Commands, Extension, CommandArgs } from '../types';
import Command from './command';
import { TextDocumentShowOptions, window } from 'vscode';

export default class OpenCommand extends Command {
	constructor(protected readonly extension: Extension) {
		super(Commands.OPEN_TEST);
	}

	async execute(args: CommandArgs) {
		const { context } = args;
		const { document } = this.extension.editor;
		const options: TextDocumentShowOptions = { preserveFocus: true, selection: context.item.range };

		await window.showTextDocument(document, options);
	}
}
