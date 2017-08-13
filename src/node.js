const debug = require('debug');
const createColoredLogPrefix = require('./_lib/createColoredLogPrefix.js');

function logger(namespace, type, ...args) {
	const prefix = createColoredLogPrefix(namespace, type);

	return debug(prefix)(...args);
}

function createLogger(namespace) {
	const log = logger.bind(null, namespace);

	return {
		fatal(...args) {
			console.error(
				createColoredLogPrefix(namespace, 'fatal'),
				...args,
				new Error().stack
			);

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
