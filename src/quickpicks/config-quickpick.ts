import { window } from 'vscode';
import Jest from '../lib/jest';

export default class ConfigQuickPick {
	static show() {
		const configs: string[] = Jest.getConfigs() || [];
		return configs.length <= 1 ? configs.pop() : window.showQuickPick(Jest.getConfigs());
	}
}
