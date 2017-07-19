import Promise from 'bluebird'
import redis from 'redis'
import config from './../../config'
import logger from './../logger'

let redisClient = null

if (config.db.redis.isAvailable) {
  // It'll add a Async to all node_redis functions (e.g. return client.getAsync().then())
  Promise.promisifyAll(redis.RedisClient.prototype)
  Promise.promisifyAll(redis.Multi.prototype)

  redisClient = redis.createClient(config.db.redis.port, config.db.redis.host)

  redisClient.auth(config.db.redis.auth)

  redisClient.on('connect', () => {
    logger.debug('Redis connected to', config.db.redis.host, config.db.redis.port)
  })

  redisClient.on('error', (err) => {
    logger.error(`Redis error: ${err}`)
  })
}

export default redisClient
