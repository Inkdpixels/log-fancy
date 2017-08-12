const iconsByType = require('./iconsByType.js');

function createLogPrefix(namespace, type) {
	const icon = iconsByType[type] || iconsByType.default;

	return icon + type.toUpperCase() + '::' + namespace + ':';
}

function createLogger(namespace) {
	return {
		fatal: console.error.bind(null, createLogPrefix(namespace, 'fatal')),
		error: console.error.bind(null, createLogPrefix(namespace, 'error')),
		success: console.log.bind(null, createLogPrefix(namespace, 'fatal')),
		warn: console.warn.bind(null, createLogPrefix(namespace, 'warn')),
		info: console.info.bind(null, createLogPrefix(namespace, 'info')),
		debug: (console.debug || console.log).bind(null, createLogPrefix(namespace, 'debug')),
		log: console.log.bind(null, createLogPrefix(namespace, 'log'))
	};
}

module.exports = createLogger;
