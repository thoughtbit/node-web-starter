"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ctrl = require("./user.controller");
const passport = require("passport");
let router = express.Router();
router.get('/', function (req, res, next) {
    res.send('Hello World!');
});
/**
 * OAuth authentication routes. (Sign in)
 */
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    res.redirect(req.session.returnTo || '/');
});
router.get('/:id', ctrl.getUser);
router.get('/:username/profile', ctrl.getUsername);
exports.default = router;
//# sourceMappingURL=user.routes.js.map