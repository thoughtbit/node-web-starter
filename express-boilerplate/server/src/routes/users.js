import { toRes } from '../../lib/util';
import User from '../../models/users';
import passport from 'passport';

/**
 * Logs the user in and return the token
 * @param  {Object} req
 * @param  {Object} res
 */
export const login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    var token;

    // If Passport throws/catches an error
    if (err) {
      return res.status(400).json(err);
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();

      return res.status(200).json({
        'token' : token
      });
    }

    // If user is not found
    res.status(401).json(info);
  })(req, res);
}

/**
 * Creates a new user
 * @param  {Object} req
 * @param  {[type]} res          [description]
 */
export const create = ({ body }, res) => {
  const user = new User({
    name: body.name,
    username: body.username
  });

  user.setPassword(body.password);
  user.save(err => {
    if (err) {
      return res.status(400).json(err);
    }

    const response = Object.assign({}, user.toObject(), { token: user.generateJwt() });

    return res.status(201).json(response);
  });
};

/**
 * Fetches an existing user in the app
 * @param  {Object} options.params
 * @param  {Object} res
 */
export const show = ({ params }, res) => User.findById(params.id, toRes(res, 200));

/**
 * Fetches the current user info
 * @param  {Object} options.user
 * @param  {Object} res
 */
export const showMe = ({ user }, res) => show({ params: { id: user._id } }, res);

