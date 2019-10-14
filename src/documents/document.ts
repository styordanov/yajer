import { TextLine, TextDocument } from 'vscode';
import { Test } from '../@types/extension';

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
      const matches = TEST_REGEX.exec(textLine.text);
      matches && tests.push({ name: matches[4], range: textLine.range } as Test);
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
