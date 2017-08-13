const sinon = require('sinon');
const createLogger = require('./node.js');

describe('createLogger() Node API', () => {
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
	let log;
	let trace;

	beforeEach(() => {
		exit = sinon.stub(process, 'exit');
		trace = sinon.stub(console, 'trace');
		log = sinon.stub(console, 'log');
	});

	afterEach(() => {
		exit.restore();
		trace.restore();
		log.restore();
	});

	it('should be a function.', () => {
		expect(typeof createLogger).toBe('function');
	});

	it('should call the console.log and console.trace method with the provided arguments.', () => {
		createLogger('foo').fatal('foo');

		expect(trace.callCount).toBe(1);
		expect(trace.args[0]).toContain('foo');
		expect(log.callCount).toBe(1);
		expect(log.args[0]).toContain('foo');
	});

	it('should call the process.exit method with exit code `1`.', () => {
		createLogger('foo').fatal('foo');

		expect(exit.callCount).toBe(1);
		expect(exit.args[0]).toEqual([1]);
	});
});
