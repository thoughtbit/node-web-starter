import fs from "fs"
import path from 'path'
import winston from 'winston'

if (!fs.existsSync(".logs")) {
  fs.mkdirSync(".logs")
}

winston.emitErrs = true

const infoLogFile = path.join(__dirname, '../.logs/info.json')
const exLogFile = path.join(__dirname, '../.logs/exceptions.json')

// LEVELS : { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

// const dateFormat = function () {
//   return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
// }

module.exports = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: infoLogFile,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      timestamp: true,
      // timestamp: dateFormat,
      handleExceptions: true,
      colorize: true,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: exLogFile }),
  ],
  exitOnError: false,
})
