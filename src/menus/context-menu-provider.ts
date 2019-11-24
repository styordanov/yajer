import { commands } from 'vscode';
import { Extension, EditorContextCommands, Commands, Test } from '../types';

export default class ContextMenuProvider {
  private subscriptions: { dispose: Function }[] = [];

  constructor(private readonly extension: Extension) {}

  register() {
    this.subscribe();
  }

  private subscribe() {
    this.unsubscribe();
    this.subscribeOne(EditorContextCommands.RUN_TEST, Commands.RUN_TEST, true);
    this.subscribeOne(EditorContextCommands.RUN_FILE, Commands.RUN_TEST);
    this.subscribeOne(EditorContextCommands.DEBUG_FILE, Commands.DEBUG_FILE);
    this.subscribeOne(EditorContextCommands.CONFIG_FILE, Commands.CONFIG_FILE);
  }

  private subscribeOne(contextCommand: EditorContextCommands, command: Commands, isTestContext: Boolean = false) {
    const editor = this.extension.editor;
    const document = this.extension.document;
    const ecommands = this.extension.commands;
    const subscriptions = this.extension.context.subscriptions;

    const args = {
      file: editor && editor.document.fileName
    };
    const disposable = commands.registerCommand(contextCommand, () => {
      const test: Test = isTestContext && document.getTestOnLine(editor.selection.start.line);
      const shouldExecute: boolean = isTestContext ? !!test : true;
      shouldExecute && ecommands[command].execute({ ...args, ...{ test: test.name } });
    });

    subscriptions.push(disposable);
    this.subscriptions.push(disposable);
  }

  private unsubscribe() {
    this.subscriptions.forEach(subscription => subscription.dispose());
  }
}
