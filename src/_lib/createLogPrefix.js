// @flow

const logSymbols = require('log-symbols');

const iconsByType = {
	fatal: logSymbols.error,
	error: logSymbols.error,
	success: logSymbols.success,
	warn: logSymbols.warning,
	info: logSymbols.info,
	debug: '•',
	default: ' '
};

function createLogPrefix(namespace: string, type: string) {
	const icon = iconsByType[type] || iconsByType.default;

	return icon + type.toUpperCase() + '::' + namespace + ':';
}

module.exports = createLogPrefix;
