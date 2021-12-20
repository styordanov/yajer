import { Terminal, window, commands } from 'vscode'

export default class TerminalProvider {
  private terminal: Terminal
  private readonly TERMINAL_NAME = 'Yet Another Jest Runner'

  constructor() {
    window.onDidCloseTerminal(() => {
      this.terminal = null
    })
  }

  async get(clear: boolean): Promise<Terminal> {
    if (!this.terminal) {
      this.terminal = window.createTerminal(this.TERMINAL_NAME)
    }

    if (clear) {
      await this.clear()
    }

    this.terminal.show()
    return this.terminal
  }

  async clear() {
    await commands.executeCommand('workbench.action.terminal.clear')
  }
}
