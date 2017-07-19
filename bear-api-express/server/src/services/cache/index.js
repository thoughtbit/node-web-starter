import crypto from 'crypto';
import redis from './../db/redis';

const debug = require('debug')('boldr:server:cache');

const cache = (module.exports = {
  client: redis,
});

/**
 * This collects a key that may either be an array or a string and creates a
 * unified key out of it.
 * @param  {Mixed} key Either an array of items composing a key or a string
 * @return {String}    A string that represents a key
 */
const keyfunc = key => {
  if (Array.isArray(key)) {
    return `cache[${key.join(':')}]`;
  }

  return `cache[${key}]`;
};

/**
 * This wraps a complicated function with a cache, in the event that the item is
 * not inside the cache, it will perform the work to get it and then set it
 * followed by returning the value.
 * @param  {Mixed} key       Either an array of items or string represening this
 *                           work
 * @param  {Integer} expiry  Time in seconds for the cache entry to live for
 * @param  {Function} work   A function that returns a promise that can be
 *                           resolved as the value to cache.
 * @return {Promise}         Resolves to the value either retrieved from cache
 */
cache.wrap = (key, expiry, work, kf = keyfunc) => {
  return cache.get(key, kf).then(value => {
    if (value !== null) {
      debug('wrap: hit', kf(key));
      return value;
    }

    debug('wrap: miss', kf(key));

    return work().then(value => {
      process.nextTick(() => {
        cache
          .set(key, value, expiry, kf)
          .then(() => {
            debug('wrap: set complete');
          })
          .catch(err => {
            console.error(err);
          });
      });

      return value;
    });
  });
};

// This is designed to increment a key and add an expiry iff the key already
// exists.
const INCR_SCRIPT = `
if redis.call('GET', KEYS[1]) ~= false then
  redis.call('INCR', KEYS[1])
  redis.call('EXPIRE', KEYS[1], ARGV[1])
end
`;

// Stores the SHA1 hash of INCR_SCRIPT, used for executing via EVALSHA.
let INCR_SCRIPT_HASH;

// This is designed to decrement a key and add an expiry iff the key already
// exists.
const DECR_SCRIPT = `
if redis.call('GET', KEYS[1]) ~= false then
  redis.call('DECR', KEYS[1])
  redis.call('EXPIRE', KEYS[1], ARGV[1])
end
`;

// Stores the SHA1 hash of DECR_SCRIPT, used for executing via EVALSHA.
let DECR_SCRIPT_HASH;

// Load the script into redis and track the script hash that we will use to exec
// increments on.
const loadScript = (name, script) =>
  new Promise((resolve, reject) => {
    let shasum = crypto.createHash('sha1');
    shasum.update(script);

    let hash = shasum.digest('hex');

    cache.client.script('EXISTS', hash, (err, [exists]) => {
      if (err) {
        return reject(err);
      }

      if (exists) {
        debug(`already loaded ${name} as SHA[${hash}], not loading again`);

        return resolve(hash);
      }

      debug(`${name} not loaded as SHA[${hash}], loading`);

      cache.client.script('load', script, (err, hash) => {
        if (err) {
          return reject(err);
        }

        debug(`loaded ${name} as SHA[${hash}]`);

        resolve(hash);
      });
    });
  });

// Load the INCR_SCRIPT and DECR_SCRIPT into Redis.
Promise.all([loadScript('INCR_SCRIPT', INCR_SCRIPT), loadScript('DECR_SCRIPT', DECR_SCRIPT)])
  .then(([incrScriptHash, decrScriptHash]) => {
    INCR_SCRIPT_HASH = incrScriptHash;
    DECR_SCRIPT_HASH = decrScriptHash;
  })
  .catch(err => {
    throw err;
  });

/**
 * This will increment a key in redis and update the expiry iff it already
 * exists, otherwise it will do nothing.
 */
cache.incr = (key, expiry, kf = keyfunc) =>
  new Promise((resolve, reject) => {
    cache.client.evalsha(INCR_SCRIPT_HASH, 1, kf(key), expiry, err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });

/**
 * This will decrement a key in redis and update the expiry iff it already
 * exists, otherwise it will do nothing.
 */
cache.decr = (key, expiry, kf = keyfunc) =>
  new Promise((resolve, reject) => {
    cache.client.evalsha(DECR_SCRIPT_HASH, 1, kf(key), expiry, err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });

/**
 * This will increment many keys in redis and update the expiry iff it already
 * exists, otherwise it will do nothing.
 */
cache.incrMany = (keys, expiry, kf = keyfunc) => {
  let multi = cache.client.multi();

  keys.forEach(key => {
    // Queue up the evalsha command.
    multi.evalsha(INCR_SCRIPT_HASH, 1, kf(key), expiry);
  });

  return new Promise((resolve, reject) => {
    multi.exec(err => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

/**
 * This will decrement many keys in redis and update the expiry iff it already
 * exists, otherwise it will do nothing.
 */
cache.decrMany = (keys, expiry, kf = keyfunc) => {
  let multi = cache.client.multi();

  keys.forEach(key => {
    // Queue up the evalsha command.
    multi.evalsha(DECR_SCRIPT_HASH, 1, kf(key), expiry);
  });

  return new Promise((resolve, reject) => {
    multi.exec(err => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

/**
 * [wrapMany description]
 * @param  {Array<String>} keys         Either an array of objects represening
 *                                      this work
 * @param  {Integer}       expiry       Time in seconds for the cache entry to live for
 * @param  {Function}      work         A function that returns a promise that can be
 *                                      resolved as the value to cache.
 * @param  {Function}      [kf=keyfunc] optional key function to use to turn the
 *                                      provided key into a string for the cache.
 * @return {Promise}                    resovles to the values for the keys
 */
cache.wrapMany = (keys, expiry, work, kf = keyfunc) => {
  return cache.getMany(keys, kf).then(values => {
    // find any of the null valued items by collecting the work
    let workRefs = values
      .map((value, index) => ({ value, index, key: keys[index] }))
      .filter(({ value }) => value === null);

    let workKeys = workRefs.map(({ key }) => key);

    debug(`wrapMany: hit ratio: ${keys.length - workKeys.length}/${keys.length}`);

    if (workKeys.length > 0) {
      return work(workKeys)
        .then(workedValues => {
          // Set the items in the cache that we needed to retrive after the
          // next process tick.
          process.nextTick(() => {
            cache
              .setMany(workKeys, workedValues, expiry, kf)
              .then(() => {
                debug('wrapMany: setMany complete');
              })
              .catch(err => {
                console.error(err);
              });
          });

          return workedValues;
        })
        .then(workedValues => {
          // Walk over the worked keys to merge them with the existing values.
          for (let i = 0; i < workRefs.length; i++) {
            values[workRefs[i].index] = workedValues[i];
          }

          return values;
        });
    } else {
      return values;
    }
  });
};

/**
 * This returns a promise that returns a promise that resolves with the value
 * from the cache or null if it does not exist in the cache.
 * @param  {Mixed} key Either an array of items composing a key or a string
 * @return {Promise}
 */
cache.get = (key, kf = keyfunc) =>
  new Promise((resolve, reject) => {
    cache.client.get(kf(key), (err, reply) => {
      if (err) {
        return reject(err);
      }

      if (reply !== null) {
        let value;

        try {
          // Parse the stored cache value from JSON.
          value = JSON.parse(reply);
        } catch (e) {
          return reject(e);
        }

        return resolve(value);
      }

      resolve(null);
    });
  });

/**
 * Returns many replies.
 * @param  {Array<String>} keys         Either an array of objects represening
 *                                      this work
 * @param  {Function}      [kf=keyfunc] optional key function to use to turn the
 *                                      provided key into a string for the cache.
 */
cache.getMany = (keys, kf = keyfunc) =>
  new Promise((resolve, reject) => {
    cache.client.mget(keys.map(kf), (err, replies) => {
      if (err) {
        return reject(err);
      }

      // Parse the replies.
      for (let i = 0; i < replies.length; i++) {
        let value = null;

        if (replies[i] != null) {
          try {
            // Parse the stored cache value from JSON.
            value = JSON.parse(replies[i]);
          } catch (e) {
            return reject(e);
          }
        }

        replies[i] = value;
      }

      return resolve(replies);
    });
  });

/**
 * Sets many entries in the cache.
 * @param  {Array<String>} keys         array of keys
 * @param  {Array}         values       array of values to set
 * @param  {Function}      [kf=keyfunc] optional key function to use to turn the
 *                                      provided key into a string for the cache.
 */
cache.setMany = (keys, values, expiry, kf = keyfunc) => {
  let multi = cache.client.multi();

  keys.forEach((key, index) => {
    // Serialize the value as JSON.
    let reply = JSON.stringify(values[index]);

    // Queue up the set command.
    multi.set(kf(key), reply, 'EX', expiry);
  });

  return new Promise((resolve, reject) => {
    multi.exec(err => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

/**
 * This invalidates a cached entry in the cache.
 * @param  {Mixed} key Either an array of items composing a key or a string
 * @return {Promise}
 */
cache.invalidate = (key, kf = keyfunc) =>
  new Promise((resolve, reject) => {
    debug(`invalidate: ${kf(key)}`);

    cache.client.del(kf(key), err => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });

/**
 * This sets a value on the key with the expiry and then resolves once it is
 * done.
 * @param  {Mixed}   key     Either an array of items composing a key or a string
 * @param  {Mixed}   value   Object to be serialized and set to the cache
 * @param  {Integer} expiry  Time in seconds for the cache entry to live for
 * @return {Promise}
 */
cache.set = (key, value, expiry, kf = keyfunc) =>
  new Promise((resolve, reject) => {
    // Serialize the value as JSON.
    let reply = JSON.stringify(value);

    cache.client.set(kf(key), reply, 'EX', expiry, err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
