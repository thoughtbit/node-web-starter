import path from 'path'
import winston from 'winston'
import config from './../../config';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const mode = isDev ? 'dev' : 'prod';
const logsFolder = config.logging.file.dir;
const logToFile = config.logging.file.enabled;
const loggingLevel = config.logging.file.level;
const fileName = config.logging.file.filename;

winston.emitErrs = true

const infoLogFile = `${logsFolder}/${fileName}-${mode}-${loggingLevel}-info.log`; // path.join(__dirname, '../../.logs/info.json')
const exLogFile = `${logsFolder}/${fileName}-${mode}-${loggingLevel}-exceptions.log`; // path.join(__dirname, '../../.logs/exceptions.json')

// LEVELS : { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({
      level: loggingLevel,
      filename: infoLogFile,
      handleExceptions: true,
      json: true,
      prettyPrint: false,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: config.logging.level,
      handleExceptions: true,
      json: isProd,
      prettyPrint: !isProd,
      colorize: !isProd,
      timestamp: true,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: exLogFile }),
  ],
  exitOnError: false,
})

logger.stream = {
  write: message => {
    logger.info(message);
  },
};

export default logger





