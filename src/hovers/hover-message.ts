import { MarkdownString } from 'vscode';

export default class HoverMessage {
  public static getMessage(): MarkdownString {
    const runCurrentOldConfig = `[Run Current (old config)](https://www.google.com "Run current test with last known configuration")`;

    const runCurrentNewConfig = `[Run Current (new config)](https://www.google.com "Run current test with prompt for new configuration")`;

    const runAllOldConfig = `[Run All (old config)](https://www.google.com "Run all tests in file with last known configuration")`;

    const runAllNewConfig = `[Run All (new config)](https://www.google.com "Run all tests in file with prompt for new configuration")`;

    const message = [runCurrentOldConfig, runCurrentNewConfig, runAllOldConfig, runAllNewConfig].join('\n\n');

    const markdown = new MarkdownString(message);
    markdown.isTrusted = true;
    return markdown;
  }
}
