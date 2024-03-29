import * as upath from 'upath'
import { Commands, Extension, CommandArgs } from '../types'
import Jest from '../lib/jest'
import Command from './command'

export default class RunCommand extends Command {
  constructor(protected readonly extension: Extension) {
    super(Commands.RUN_TEST)
  }

  async execute(args: CommandArgs) {
    const { file, context } = args
    const config = await this.getConfig(file)

    const test = context?.item ? context.item.name : args.test

    let command = `${Jest.getCommand()} ${upath.normalize(file)}`
    test && (command = `${command} -t "${test}"`)
    config && (command = `${command} -c "${config}"`)

    command = `${command} ${Jest.getCommandArgs()}`

    const terminal = await this.extension.terminal.get(true)
    terminal.sendText(command)
  }
}
