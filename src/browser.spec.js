const createLogger = require('./browser.js');

describe('createLogger() Browser API', () => {
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
