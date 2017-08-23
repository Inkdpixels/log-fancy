// @flow

export type LoggerFnType = (...args: Array<any>) => void;
export type LoggerType = {
	fatal: LoggerFnType,
	error: LoggerFnType,
	success: LoggerFnType,
	warn: LoggerFnType,
	info: LoggerFnType,
	debug: LoggerFnType,
	log: LoggerFnType
};
