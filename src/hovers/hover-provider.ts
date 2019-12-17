import { TextDocument, Position, CancellationToken, Hover, Range, languages, Disposable, MarkdownString } from 'vscode';
import { Extension, Test } from '../types';
import HoverMessage from './hover-message';

export default class HoverProvider implements Disposable {
	private hoverDisposable: Disposable;
	private hoverMessage: HoverMessage;

	constructor(private readonly extension: Extension) {
		this.hoverMessage = new HoverMessage(extension);
	}

	public dispose() {
		this.unregister();
	}

	private provideHover(document: TextDocument, position: Position, token: CancellationToken): Hover {
		const test: Test = this.extension.document.getTestOnLine(position.line);
		const range = document.validateRange(new Range(position.line, Number.MAX_SAFE_INTEGER, position.line, Number.MAX_SAFE_INTEGER));

		const message: MarkdownString = this.hoverMessage.getMessage({ file: this.extension.editor.document.fileName, test: test.name });
		return new Hover(message, range);
	}

	public register() {
		this.unregister();

		if (this.extension.editor === undefined) {
			return;
		}

		const subscriptions = [
			languages.registerHoverProvider(
				{ pattern: this.extension.editor.document.uri.fsPath },
				{
					provideHover: this.provideHover.bind(this)
				}
			)
		];
		this.hoverDisposable = Disposable.from(...subscriptions);
	}

	unregister() {
		this.hoverDisposable && this.hoverDisposable.dispose();
	}
}
