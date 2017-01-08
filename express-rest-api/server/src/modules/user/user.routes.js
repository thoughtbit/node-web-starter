
import user from './user.controller';
import authentication from '../authentication/authentication.controller';

/**
 * Set user routes.
 *
 * @param {Object} app The express application
 */
export default function(app) {
    app.route('/users/:id').get(authentication.isAuthenticated, user.findById);
    app.route('/users').get(authentication.isAuthenticated, user.findAll);
}
