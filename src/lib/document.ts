import { Range, TextLine, TextDocument } from 'vscode';

export interface Test {
  name: string;
  range: Range;
}

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
}
