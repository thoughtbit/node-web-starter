import config from './config';
import redis from 'redis';
import logger from '../helpers/logger';
import Promise from 'bluebird';

let redisClient = null;


if (config.redis.isAvailable) {

    // It'll add a Async to all node_redis functions (e.g. return client.getAsync().then())
    Promise.promisifyAll(redis.RedisClient.prototype);

    redisClient = redis.createClient(config.redis.port, config.redis.host);

    redisClient.auth(config.redis.auth);

    redisClient.on('connect', function () {
        logger.debug('Redis connected to', config.redis.host, config.redis.port);
    });

    redisClient.on('error', function (err) {
        logger.error('Redis error: ' + err);
    });
}

export default redisClient;
