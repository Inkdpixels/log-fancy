const sinon = require('sinon');
const createLogger = require('./index.js');

describe('createLogger._logger()', () => {
	it('should be a function.', () => {
		expect(typeof createLogger._logger).toBe('function');
	});

	it('should not throw an error when called.', () => {
		createLogger._logger('foo', 'info', 'should log something');
		createLogger._logger('foo', 'bar', 'should log something');
	});
});

describe('createLogger()', () => {
	it('should be a function.', () => {
		expect(typeof createLogger).toBe('function');
	});

	it('should return an object containing the logger API.', () => {
		const logger = createLogger('foo');

		expect(typeof logger).toBe('object');
		expect(typeof logger.info).toBe('function');
		expect(typeof logger.warn).toBe('function');
		expect(typeof logger.success).toBe('function');
		expect(typeof logger.debug).toBe('function');
		expect(typeof logger.log).toBe('function');
		expect(typeof logger.error).toBe('function');
		expect(typeof logger.fatal).toBe('function');
	});
});

describe('createLogger().fatal()', () => {
	let exit;

	beforeEach(() => {
		exit = sinon.stub(process, 'exit');
	});

	afterEach(() => {
		exit.restore();
	});

	it('should be a function.', () => {
		expect(typeof createLogger).toBe('function');
	});

	it('should call the process.exit method with exit code `1`.', () => {
		createLogger('foo').fatal('foo');

		expect(exit.callCount).toBe(1);
		expect(exit.args[0]).toEqual([1]);
	});
});
