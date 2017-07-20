import mongoose from 'mongoose'
import config from '../../config'
import logger from '../logger'

/**
 * Create mongoose connection.
 */
const createMongooseConnection = (cb) => {
  // create the database connection
  mongoose.connect(config.mongodb.dbURI, config.mongodb.dbOptions)

  // when successfully connected
  mongoose.connection.on('connected', () => {
    logger.debug(`Mongoose connected to ${config.mongodb.dbURI}`)
  })

  // if the connection throws an error
  mongoose.connection.on('error', (err) => {
    logger.debug(`Mongoose connection error: ${err}`)
  })

  // when the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    logger.debug('Mongoose disconnected')
  })

  // when the connection is open
  mongoose.connection.once('open', () => {
    if (cb && typeof (cb) === 'function') {
      cb()
    }
  })

  // if the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.debug('Mongoose disconnected through app termination')
      process.exit(0)
    })
  })
}

export default createMongooseConnection
