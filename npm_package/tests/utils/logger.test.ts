import { Logger, LogLevel } from '../../src/utils/logger';

describe('Logger', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should not log when disabled', () => {
    const logger = new Logger(false);
    logger.info('test message');
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should log when enabled', () => {
    const logger = new Logger(true);
    logger.info('test message');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should log with metadata', () => {
    const logger = new Logger(true);
    const metadata = { key: 'value' };
    logger.info('test message', metadata);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('INFO: test message {"key":"value"}')
    );
  });

  it('should log at different levels', () => {
    const logger = new Logger(true);
    logger.debug('debug message');
    logger.info('info message');
    logger.warn('warn message');
    logger.error('error message');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('DEBUG:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('INFO:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('WARN:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('ERROR:'));
  });
});
