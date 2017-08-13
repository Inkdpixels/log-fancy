const chalk = require('chalk');
const createLogPrefix = require('./createLogPrefix.js');

const colorsByType = {
	fatal: chalk.red.underline,
	error: chalk.redBright,
	success: chalk.green,
	warn: chalk.yellow,
	info: chalk.cyan,
	default: chalk.white
};

function createColoredLogPrefix(namespace, type) {
	const color = colorsByType[type] || colorsByType.default;
	const prefix = createLogPrefix(namespace, type);

	return color(prefix);
}

module.exports = createColoredLogPrefix;
