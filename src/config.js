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

module.exports = {
	iconsByType
};
