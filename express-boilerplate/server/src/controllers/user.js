import UsersService from '../services/users'

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {

}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user)
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {

}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {

}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {

}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {

}

export default {
  load,
  get,
  create,
  update,
  list,
  remove,
}
