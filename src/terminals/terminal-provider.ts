import { Terminal, window, commands } from 'vscode';

export default class TerminalProvider {
	private terminal: Terminal;
	private readonly TERMINAL_NAME = 'Yet Another Jest Runner';

	constructor() {
		window.onDidCloseTerminal(() => {
			this.terminal = null;
		});
	}

	async get(clear: Boolean): Promise<Terminal> {
		!this.terminal && (this.terminal = window.createTerminal(this.TERMINAL_NAME));
		this.terminal.show();
		clear && (await this.clear());
		return this.terminal;
	}

	async clear() {
		await commands.executeCommand('workbench.action.terminal.clear');
	}
}
