import path from 'path'
import winston from 'winston'

winston.emitErrs = true;

const infoLogFile = path.join(__dirname, '../../logs/info.json');
const exLogFile = path.join(__dirname, '../../logs/exceptions.json');

// LEVELS : { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

const logger = new (winston.Logger)({
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: infoLogFile,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            timestamp: true,
            handleExceptions: true,
            colorize: true
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: exLogFile })
    ],
    exitOnError: false
});


export default logger;

