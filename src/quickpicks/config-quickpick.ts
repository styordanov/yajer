import { window } from 'vscode';
import Jest from '../commands/jest';

export default class ConfigQuickPick {
	static show() {
		return window.showQuickPick(Jest.getConfigs());
	}
}
