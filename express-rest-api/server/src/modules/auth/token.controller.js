import jwt from 'jsonwebtoken';
import redis from '../config/redis';
import config from  '../config/config';

/**
 * Extract the token from the header Authorization.
 *
 * @method extractTokenFromHeader
 * @param {Object} headers The request headers
 * @returns {String} the token
 * @private
 */
const extractTokenFromHeader = (headers) => {

    if (headers === null) {
        throw new Error('Header is null');
    }

    if (!headers.authorization) {
        throw new Error('Authorizadtion header is null');
    }

    const authorization = headers.authorization;

    const authArr = authorization.split(' ');
    if (authArr.length !== 2) {
        throw new Error('Authorization header value is not of length 2');
    }

    // retrieve token
    const token = authArr[1];

    // verify token
    try {
        jwt.verify(token, config.token.secret);
    } catch (err) {
        throw new Error(`The token is not valid: ${err.message}`);
    }

    return token;
};

/**
 * Create a new JWT token and stores it in redis with payload data for a particular period of time.
 *
 * @method createToken
 * @param {Object}   payload An additional information that we can pass with token e.g. {user: 2, admin: true}
 * @returns {string} return the token if successfully created
 */
const createToken = (payload) => {
    return new Promise((resolve, reject) => {

        const ttl = config.token.expiration;

        if (payload !== null && typeof payload !== 'object') {
            return reject('payload is not an Object');
        }

        if (ttl !== null && isNaN(ttl)) {
            return reject('ttl is not a valid Number');
        }

        const token = jwt.sign({id: payload.id, email: payload.email},
            config.token.secret, {expiresIn: config.token.expiration});

        if (redis) {
            // stores a token with payload data for a ttl period of time
            redis.setexAsync(token, parseInt(ttl, 10), JSON.stringify(payload)).then(result => {
                if (!result) {
                    reject('Token not set in Redis');
                }
                resolve(token);

            }).catch(reason => {
                reject(reason);
            });

        } else {
            return Promise.resolve(token);
        }
    });
};

/**
 * Expires a token by deleting the entry in redis.
 *
 * @method expireToken
 * @param {Object}   headers The request headers
 * @param {Function} cb      Callback function
 * @returns {Function} callback function `callback(null, true)` if successfully deleted
 */
const expireToken = (headers, cb) => {

    try {

        const token = extractTokenFromHeader(headers);

        if (token === null) {
            return cb(new Error('Token is null'));
        }

        if (redis) {
            // delete token from redis
            redis.del(token, (err, reply) => {
                if (err) {
                    return cb(err);
                }

                if (!reply) {
                    return cb(new Error('Token not found'));
                }

                return cb(null, true);
            });

        } else {
            cb(null, true);
        }

    } catch (err) {
        return cb(err);
    }
};

/**
 * Verify if token is valid.
 *
 * @method verifyToken
 * @param {Object}   headers The request headers
 * @returns {Function} callback function `callback(null, JSON.parse(userData))` if token exist
 */
const verifyToken = (headers) => {

    return new Promise((resolve, reject) => {

        let token;

        try {
            token = extractTokenFromHeader(headers);
        } catch(err) {
            return reject(err);
        }

        if (!token) {
            return reject('Token is null');
        }

        if (redis) {
            // gets the associated data of the token
            redis.getAsync(token).then(result => {
                if (!result) {
                    return reject('Token not found');
                }
                resolve(JSON.parse(result));
            }).catch(reason => {
                reject(reason);
            });

        } else {
            return Promise.resolve(token);
        }
    });
};

export default {createToken, expireToken, verifyToken};
