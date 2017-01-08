import authentication from  './authentication.controller.js';

/**
 * Set authentication routes.
 *
 * @param {Object} app The express application
 */
export default function (app) {
    app.route('/auth/signin').post(authentication.signin);
    app.route('/auth/signout').get(authentication.signout);
    app.route('/auth/signup').post(authentication.signup);
}
