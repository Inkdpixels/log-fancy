// @flow

import type {LoggerType} from './types.js';

const debug = require('debug');
const path = require('path');
const createColoredLogPrefix = require('./_lib/createColoredLogPrefix.js');

function logger(namespace: string, type: string, ...args: Array<any>): void {
	const prefix = createColoredLogPrefix(namespace, type);

	return debug(prefix)(...args);
}

function resolvePkgJsonName(): string {
	const pkgJsonPath = path.resolve('package.json');
	const err = new Error(`No "name" property found in "${pkgJsonPath}", either set a name or provide a namespace to the createLogger() function.`);

	if (!pkgJsonPath) {
		throw err;
	}

	const pkg: {name: string} = require(pkgJsonPath);

	if (!pkg.name) {
		throw err;
	}

	return pkg.name;
}

function createLogger(arg?: string): LoggerType {
	const namespace = arg || resolvePkgJsonName();
	const log = logger.bind(null, namespace);
	const api = {
		enforceLogging() {
			debug.enable(`*${namespace}*`);

			return api;
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

	return api;
}

module.exports = createLogger;
