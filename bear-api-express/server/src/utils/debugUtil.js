import chalk from 'chalk'
import logger from './logger'
/**
 * Logs the given error to the NodeJS console
 * @param {Error} nativeError Native JavaScript Error Object
 */
export function logError(nativeError) {
  /* eslint-disable no-console */
  if (nativeError instanceof Error) {
    // Triggering generating formatted stacktrace
    String(nativeError.stack);

    const formattedMessage = chalk.red(`${nativeError.name}: ${nativeError.message}`);
    const formattedStack = highlightStack(nativeError.stack);

    // Optionally display source code except
    if (nativeError.code) {
      console.error(`${formattedMessage}\n\n${nativeError.code}\n\n${formattedStack}`);
    } else {
      console.error(`${formattedMessage}\n\n${formattedStack}`);
    }
  } else {
    console.error(nativeError);
  }
}

/**
 * Enable enhanced stack traces
 */
export function enableEnhancedStackTraces(debug = false) {
  // Override native Promise API with faster and more developerr friendly bluebird
  global.Promise = require('bluebird');

  /* eslint-disable no-use-extend-native/no-use-extend-native */
  Promise.config({
    longStackTraces: debug,
    warnings: debug,
  });

  // Catch unhandled Promise rejections and pass them over to our log handler
  process.on('unhandledRejection', (reason, promise) => logError(reason));

  // Catch uncaught exceptions and pass them over to our log handler
  process.on('uncaughtException', error => logError(error));

  // Enable by hooking into V8 Stacktrace API integration
  // https://github.com/v8/v8/wiki/Stack-Trace-API
  Error.prepareStackTrace = prepareStackTrace;

  logger.task('Activated enhanced stack traces');
}
