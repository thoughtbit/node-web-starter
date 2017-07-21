import http from 'http'
import _debug from 'debug'
import app from './app'
import { initializeDb, disconnect } from './helpers/db/mysql'
import { logger } from './helpers/utils/logger'
import config from './config'

const debug = _debug('bear:server')

const PORT = config.server.port
const HOST = config.server.host

const server = http.createServer(app)

// connect to db
initializeDb()
  .then(() => {
    logger.info('Database connected successfully')
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
  .catch((err) => {
    logger.error(err)
    process.exit(1)
  })

process.on('SIGINT', () => {
  logger.info('shutting down!')
  disconnect() // 关闭mysql
  server.close()
  process.exit()
})

process.on('uncaughtException', (error) => {
  logger.error(`uncaughtException: ${error.message}`)
  logger.error(error.stack)
  debug(error.stack)
  process.exit(1)
})
