import * as objection from 'objection';
import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { LocalStrategyInfo } from 'passport-local';
import {default as User, UserModel, AuthToken } from './../../models/user';
import * as uuid from 'uuid';

/**
 * GET /login
 * Login page.
 */
export let getLogin = (req: Request, res: Response ) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('login');
};

/**
 * POST /login
 * Sign in using email and password.
 */
export let postLogin = (req: Request, res: Response, next: NextFunction) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', (err: Error, user: UserModel, info: LocalStrategyInfo) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', info.message);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
export let logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
};

/**
 * GET /signup
 * Signup page.
 */
export let getSignup = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('signup', {
    title: 'Create Account'
  });
};

/**
 * POST /signup
 * Create a new local account.
 */
export let postSignup = async (req: Request, res: Response, next: NextFunction) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len({ min: 4 });
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }
  try {
    const payload = {
      id: uuid.v4(),
      // no need to hash here, its taken care of on the model instance
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      avatarUrl: req.body.avatarUrl
    };

    const existingUser = await User.query().where('email', req.body.email);

    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists.' });
      return res.redirect('/signup');
    }

    const newUser = await objection.transaction(User, async User => {
      const user = await User.query().insert(payload);
      if (!user) {
        req.flash('errors', { msg: 'Account with that email address does not exist.' });
        return res.redirect('/forgot');
      }
      await user.$relatedQuery('roles').relate({ id: 1 });

    });
  } catch (error) {
    return next(error);
  }

};

export async function getUser(req, res, next) {
  try {
    const user = await User.query()
      .findById(req.params.id)
      .eager('[roles]')
      .omit(['password']);
    return res.send(user);
  } catch (error) {
    return next(error);
  }
}

export async function getUsername(req, res, next) {
  try {
    const user = await User.query()
      .where({ username: req.params.username })
      .eager('[roles]')
      .omit(['password'])
      .first();
    return res.send(user);
  } catch (error) {
    return next(error);
  }
}
