import * as glob from 'glob'
import * as upath from 'upath'
import { readFileSync } from 'fs'
import { workspace } from 'vscode'
import { URL } from 'url'

export default class Jest {
  private static configs: string[] = []
  private static WIN_PATH = './node_modules/jest/bin/jest.js'
  private static UNIX_PATH = './node_modules/.bin/jest'

  private static getWorkspaceFolderPath(): string {
    const [workspaceFolder] = workspace.workspaceFolders || []
    return workspaceFolder ? workspaceFolder.uri.fsPath : './'
  }

  static getConfigsPackageJSON(): string[] {
    const packageJSON = upath.join(Jest.getWorkspaceFolderPath(), 'package.json')
    const contents = JSON.parse(readFileSync(new URL(`file://${packageJSON}`), 'utf8'))
    return contents?.scripts && contents.scripts.test.includes('jest') ? [contents.scripts.test] : []
  }

  static getConfigs(forceReconfigure = false): string[] {
    const jestConfig: string = workspace.getConfiguration().get('yajer.jestConfig')
    if (jestConfig) {
      return [jestConfig]
    }

    const defaultPatterns = ['jest.config.js', 'jest.config.json']
    const configPatterns: string = workspace.getConfiguration().get('yajer.jestConfigPatterns')
    const patterns = [...defaultPatterns, ...configPatterns.split(',')].filter(Boolean).map(p => `*${p.trim()}`)

    const pattern = `+(${patterns.join('|')})`
    const options = { matchBase: true, nodir: true, ignore: 'node_modules/**', cwd: Jest.getWorkspaceFolderPath() }

    if (Jest.configs.length === 0 || forceReconfigure) {
      Jest.configs = glob.sync(pattern, options)
    }
    return Jest.configs
  }

  static getExecutable(): string {
    const jestPath = process.platform.includes('win32') ? Jest.WIN_PATH : Jest.UNIX_PATH
    return upath.join(Jest.getWorkspaceFolderPath(), jestPath)
  }

  static getCommand(): string {
    return workspace.getConfiguration().get('yajer.jestCommand') || `node ${Jest.getExecutable()}`
  }

  static getCommandArgs(): string {
    return String(workspace.getConfiguration().get('yajer.jestCommandArgs')).trim()
  }
}
