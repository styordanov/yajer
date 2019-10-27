import { window } from 'vscode';
import Jest from '../lib/jest';

export default class ConfigQuickPick {
	static show() {
		return window.showQuickPick(Jest.getConfigs());
	}
}
