const sinon = require('sinon');
const createLogger = require('./node.js');

describe('createLogger() Node API', () => {
	it('should be a function.', () => {
		expect(typeof createLogger).toBe('function');
	});

	it('should return an object containing the logger API.', () => {
		const logger = createLogger('foo');

		expect(typeof logger).toBe('object');
		expect(typeof logger.enforceLogging).toBe('function');
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
	let error;

	beforeEach(() => {
		exit = sinon.stub(process, 'exit');
		error = sinon.stub(console, 'error');
	});

	afterEach(() => {
		exit.restore();
		error.restore();
	});

	it('should be a function.', () => {
		expect(typeof createLogger).toBe('function');
	});

	it('should call the console.error method with the provided arguments and a stack trace.', () => {
		const expectedTrace = [
			expect.stringMatching('foo'),
			expect.stringMatching('bar'),
			expect.stringMatching('at fooTraceMethod')
		];
		function fooTraceMethod() {
			createLogger('foo').fatal('bar');
		}

		fooTraceMethod();

		expect(error.callCount).toBe(1);
		expect(error.args[0]).toEqual(expect.arrayContaining(expectedTrace));
	});

	it('should call the process.exit method with exit code `1`.', () => {
		createLogger('foo').fatal('foo');

		expect(exit.callCount).toBe(1);
		expect(exit.args[0]).toEqual([1]);
	});
});

describe('createLogger().enforceLogging()', () => {
	it('should not throw exception errors when called.', () => {
		const logger = createLogger('foo');

		expect(() => logger.enforceLogging()).not.toThrow();
	});
});

describe('createLogger().error()', () => {
	it('should not throw exception errors when called.', () => {
		const logger = createLogger('foo');

		expect(() => logger.error('expect this not to throw exception errors which will stop the application from running...')).not.toThrow();
	});
});
