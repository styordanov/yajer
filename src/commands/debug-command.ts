import * as upath from 'upath'
import { DebugConfiguration, debug } from 'vscode'
import { Commands, Extension, CommandArgs } from '../types'
import Jest from '../lib/jest'
import Command from './command'

export default class DebugCommand extends Command {
  constructor(protected readonly extension: Extension) {
    super(Commands.DEBUG_FILE)
  }

  async execute(args: CommandArgs) {
    const { file } = args
    const config = await this.getConfig(file)
    const jestArgs = Jest.getCommandArgs().split(' ')

    const debugConfiguration: DebugConfiguration = {
      type: 'node',
      request: 'launch',
      name: 'Debug Jest Tests',
      program: Jest.getExecutable(),
      args: [upath.normalize(file), '--config', config, ...jestArgs],
      console: 'integratedTerminal',
      internalConsoleOptions: 'neverOpen',
      disableOptimisticBPs: true,
    }

    debug.startDebugging(undefined, debugConfiguration)
  }
}
