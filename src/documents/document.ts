import { Position, Range, TextLine, TextDocument } from 'vscode';
import { Test, TestType } from '../types';

export default class Document {
	constructor(private readonly document: TextDocument) {}

	public getLines(): TextLine[] {
		const lines = [];
		for (let i = 0; i < this.document.lineCount; i++) {
			lines.push(this.document.lineAt(i));
		}
		return lines;
	}

	public getTests(): Test[] {
		const TEST_REGEX = /(it|test|describe)(\.(skip|only))?\(['"]([^'"]+)['"],/i;

		return this.getLines().reduce((tests, textLine) => {
			const { firstNonWhitespaceCharacterIndex, range, text } = textLine;
			const matches = TEST_REGEX.exec(text);

			matches &&
				tests.push({
					name: matches[4],
					range: new Range(new Position(range.start.line, firstNonWhitespaceCharacterIndex), range.end),
					type: matches[1] === TestType.DESCRIBE ? TestType.DESCRIBE : TestType.TEST
				} as Test);
			return tests;
		}, []);
	}

	public getTestOnLine(line: number): Test {
		return this.findTestOnLine(this.getTests(), line);
	}

	public findTestOnLine(tests: Test[], line: number): Test {
		return tests.filter(({ range: { start } }) => start.line === line).pop();
	}
}
