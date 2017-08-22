"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const objection = require("objection");
const passport = require("passport");
const user_1 = require("./../../models/user");
const uuid = require("uuid");
/**
 * GET /login
 * Login page.
 */
exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('login');
};
/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/login');
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('errors', info.message);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', { msg: 'Success! You are logged in.' });
            res.redirect(req.session.returnTo || '/');
        });
    })(req, res, next);
};
/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = (req, res) => {
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
exports.postSignup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        const existingUser = yield user_1.default.query().where('email', req.body.email);
        if (existingUser) {
            req.flash('errors', { msg: 'Account with that email address already exists.' });
            return res.redirect('/signup');
        }
        const newUser = yield objection.transaction(user_1.default, (User) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield User.query().insert(payload);
            if (!user) {
                req.flash('errors', { msg: 'Account with that email address does not exist.' });
                return res.redirect('/forgot');
            }
            yield user.$relatedQuery('roles').relate({ id: 1 });
        }));
    }
    catch (error) {
        return next(error);
    }
});
function getUser(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.query()
                .findById(req.params.id)
                .eager('[roles]')
                .omit(['password']);
            return res.send(user);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getUser = getUser;
function getUsername(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.query()
                .where({ username: req.params.username })
                .eager('[roles]')
                .omit(['password'])
                .first();
            return res.send(user);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getUsername = getUsername;
//# sourceMappingURL=user.controller.js.map