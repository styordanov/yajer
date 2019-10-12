import * as vscode from 'vscode';

export interface Test {
	name: string;
	range: vscode.Range;
}

export default class Document {
	static getLines(document: vscode.TextDocument): vscode.TextLine[] {
		const lines = [];
		for (let i = 0; i < document.lineCount; i++) {
			lines.push(document.lineAt(i));
		}
		return lines;
	}

	static getTests(document: vscode.TextDocument): Test[] {
		const TEST_REGEX = /(it|test|describe)(\.(skip|only))?\(['"]([^'"]+)['"],/i;

		return Document.getLines(document).reduce((tests, textLine) => {
			const matches = TEST_REGEX.exec(textLine.text);
			matches && tests.push({ name: matches[4], range: textLine.range } as Test);
			return tests;
		}, []);
	}
}
