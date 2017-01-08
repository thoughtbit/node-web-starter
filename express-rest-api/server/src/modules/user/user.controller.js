import logger from '../utils/logger';
import User from './user.model';

const forgeUser = (username, email, password, res = null) => {
  saltAndHashPassword(password).then((hash) => {
    User.forge({
      username,
      password: hash,
      public_name: username,
      email,
      role: 'admin',
    })
      .save()
      .then((user) => {
        if (res) {
          res.status(200);
          return res.json({ data: user });
        }
      })
      .catch((err) => {
        log.error(err, 'Failed to register user during DB insert');
        if (res) {
          res.status(400);
          return res.json({ data: 'Failed to register user during DB insert' });
        }
      });
  })
    .catch((err) => {
      log.error(err);
      if (res) {
        res.status(400);
        return res.json({ data: err });
      }
    });
};

const createUser = (req, res) =>
  forgeUser(
    req.body.username,
    req.body.email,
    req.body.password,
    res
  );

const getUserById = (req, res) => {
  User.where('id', req.params.id).fetch({
    columns: ['public_name', 'username', 'id', 'profile_pic_url'],
  }).then((result) => {
    if (result) {
      res.status(200);
      return res.json({
        user: result,
      });
    }

    res.status(204);
    return res.json({
      message: 'User not found',
    });
  })
  .catch((err) => {
    res.status(400);
    return res.json({ data: err });
  });
};

const getUserByToken = (req, res) => {
  User.where('id', req.decoded.id).fetch({
    columns: ['public_name', 'username', 'id', 'profile_pic_url'],
  }).then((result) => {
    log.info(`Searching data about userId: ${req.decoded.id}`, result);
    if (result) {
      res.status(200);
      return res.json({ user: result });
    }

    res.status(403);
    return res.json({
      message: 'User not found',
    });
  })
  .catch((err) => {
    log.error(err, 'failed to fetch user from database');
    res.status(500);
    return res.json({ data: err });
  });
};

const getUserByUsername = (req, res) => {
  User.where('username', req.params.username).fetch({
    columns: ['public_name', 'username', 'id', 'profile_pic_url'],
  }).then((result) => {
    if (result) {
      res.status(200);
      return res.json({
        user: result,
      });
    }

    res.status(204);
    return res.json({
      message: 'User not found',
    });
  })
  .catch((err) => {
    log.error(err, 'failed to fetch user from database');
    res.status(500);
    return res.json({ data: err });
  });
};

const login = (req, res) => {
  const fieldName = req.body.username.indexOf('@') > 0 ? 'email' : 'username';
  User.where(fieldName, req.body.username).fetch({
    columns: ['password', 'id'],
  }).then((result) => {
    if (!result) {
      res.status(404);
      return res.json({ data: 'user not found' });
    }

    log.info(result, `User fetched from DB, validating against ${req.body.password}`);
    bcrypt.compare(req.body.password, result.attributes.password, (err, validated) => {
      if (err) {
        log.error(err, 'failed to compare password with hash');
        res.status(500);
        return res.json({ data: err });
      }

      if (validated) {
        const token = jwt.sign({ id: result.id }, settings.JWT_SECRET, { expiresIn: '7 days' });
        res.status(200);
        return res.json({ token, id: result.id });
      }

      res.status(401);
      return res.json({ data: 'authentication failed' });
    });
  })
  .catch((err) => {
    log.error(err, 'failed to fetch user from database');
    res.status(500);
    return res.json({ data: err });
  });
};

module.exports = {
  createUser,
  forgeUser,
  getUserById,
  getUserByToken,
  getUserByUsername,
  login,
};
