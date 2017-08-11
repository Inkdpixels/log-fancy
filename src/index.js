const logSymbols = require('log-symbols');
const debug = require('debug');
const chalk = require('chalk');

const colorsByType = {
	fatal: chalk.red.underline,
	error: chalk.redBright,
	success: chalk.green,
	warn: chalk.yellow,
	info: chalk.cyan,
	default: chalk.white
};
const iconsByType = {
	fatal: logSymbols.error,
	error: logSymbols.error,
	success: logSymbols.success,
	warn: logSymbols.warning,
	info: logSymbols.info,
	debug: '•',
	default: ' '
};

function logger(namespace, type, ...args) {
	const icon = iconsByType[type] || iconsByType.default;
	const color = colorsByType[type] || colorsByType.default;

	return debug(color(`${icon} ${type.toUpperCase()}::${namespace}:`))(...args);
}

function createLogger(namespace) {
	const log = logger.bind(null, namespace);

	return {
		fatal(...args) {
			log('fatal', ...args);

			try {
				process.exit(1);
			} catch (e) {}
		},
		error: log.bind(null, 'error'),
		success: log.bind(null, 'success'),
		warn: log.bind(null, 'warn'),
		info: log.bind(null, 'info'),
		debug: log.bind(null, 'debug'),
		log: log.bind(null, 'log')
	};
}

module.exports = createLogger;
module.exports._logger = logger;
