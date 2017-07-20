import http from 'http'
import _debug from 'debug'
import app from './app'
import { logger, initializeDb } from './services/index'
import config from './config'

const debug = _debug('bear:server')

const PORT = config.server.port
const HOST = config.server.host

const server = http.createServer(app)

// connect to db
initializeDb(() => {
  server.listen(PORT, HOST)

  server.on('listening', () => {
    const address = server.address()
    logger.info(
      '🚀  Starting server on %s:%s',
      address.address,
      address.port,
    )
  })

  server.on('error', (err) => {
    logger.error(`⚠️  ${err}`)
    throw err
  })

  console.log(`Started on port ${server.address().port}`)
})

process.on('SIGINT', () => {
  logger.info('shutting down!')
  // disconnect(); // 尝试关闭mysql
  server.close()
  process.exit()
})

process.on('uncaughtException', (error) => {
  logger.error(`uncaughtException: ${error.message}`)
  logger.error(error.stack)
  debug(error.stack)
  process.exit(1)
})
