// @flow

import type {LoggerType} from './types.js';

const debug = require('debug');
const createColoredLogPrefix = require('./_lib/createColoredLogPrefix.js');

function logger(namespace: string, type: string, ...args: Array<any>): void {
	const prefix = createColoredLogPrefix(namespace, type);

	return debug(prefix)(...args);
}

function createLogger(namespace: string): LoggerType {
	const log = logger.bind(null, namespace);

	return {
		enforceLogging() {
			debug.enable(`*${namespace}*`);
		},
		fatal(...args: Array<any>) {
			const stack = new Error().stack.split('\n').splice(2);

			console.error(
				createColoredLogPrefix(namespace, 'fatal'),
				...args,
				'\n',
				stack.join('\n')
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
