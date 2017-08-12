const logSymbols = require('log-symbols');

module.exports = {
	fatal: logSymbols.error,
	error: logSymbols.error,
	success: logSymbols.success,
	warn: logSymbols.warning,
	info: logSymbols.info,
	debug: '•',
	default: ' '
};
