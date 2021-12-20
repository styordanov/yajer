import { TreeItem, TreeItemCollapsibleState } from 'vscode'
import { Test, TestType, Commands, IconPath } from '../types'
import IconPathBuilder from '../lib/icon-path-builder'

export default class TestTreeItem extends TreeItem {
  readonly item: Test
  private items: TestTreeItem[] | undefined

  constructor(test: Test) {
    super(test.name, TreeItemCollapsibleState.None)
    this.item = test

    this.command = {
      command: Commands.OPEN_TEST,
      title: '',
      arguments: [{ context: this }],
    }

    this.id = String(this.item.id)
    this.contextValue = 'test'
    this.iconPath = this.getIconPath()
    this.tooltip = `${this.isTest ? 'test' : 'describe'}('${this.item.name}')`
  }

  private getIconPath(): IconPath {
    const icon = this.isTest ? 'test.svg' : 'describe.svg'
    return {
      dark: IconPathBuilder.build(icon),
      light: IconPathBuilder.build(icon),
    }
  }

  get isTest(): boolean {
    return this.item.type === TestType.TEST
  }

  get parentID(): string {
    return String(this.item.parent)
  }

  set children(items: TestTreeItem[]) {
    this.items = items
    if (this.items.length) {
      this.collapsibleState = TreeItemCollapsibleState.Expanded
    }
  }

  get children(): TestTreeItem[] | undefined {
    return this.items
  }
}
