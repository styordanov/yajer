import { DecorationOptions, TextEditorDecorationType, window } from 'vscode'
import { Extension } from '../types'
import IconPathBuilder from '../lib/icon-path-builder'

export default class Decorator {
  private timeout: NodeJS.Timer
  public static decorationType: TextEditorDecorationType = window.createTextEditorDecorationType({
    after: { margin: '0 0 0 .5rem', color: '#c5c5c5', contentIconPath: IconPathBuilder.build('test-context.svg') },
  })

  constructor(private readonly extension: Extension) {}

  private getDecorations(): DecorationOptions[] {
    return this.extension.document.getTests().map(({ range }) => ({ range }))
  }

  private setDecorations() {
    this.extension.editor?.setDecorations(Decorator.decorationType, this.getDecorations())
  }

  public update() {
    this.timeout && clearTimeout(this.timeout)
    this.timeout = setTimeout(this.setDecorations.bind(this), 500)
  }
}
