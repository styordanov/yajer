import { Disposable, commands } from 'vscode';
import { Commands } from '../types';

export default abstract class Command implements Disposable {
	private disposable: Disposable;

	constructor(protected readonly command: Commands) {
		this.disposable = commands.registerCommand(command, (args: unknown) => this.execute(args), this);
	}

	dispose() {
		this.disposable && this.disposable.dispose();
	}

	getMarkdownArgs<T>(args: T): string {
		return `command:${this.command}?${encodeURIComponent(JSON.stringify(args))}`;
	}

	abstract getMarkdown(args: unknown): string;

	abstract execute(args: unknown): unknown;
}
