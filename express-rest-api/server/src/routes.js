import authentication from '../auth/auth.routes';
import user from '../user/user.routes';
import logger from '../helpers/logger';


class Routes {

    constructor() {
    }

    /**
     * Initialize routes for each module
     * @param {Object} app The express application
     */
    init(app) {

        authentication(app);

        user(app);

        /**
         * Error handling
         */

        app.use(function (err, req, res, next) {
            logger.error(err.stack);
            res.status(500).send(err.stack);
            next();
        });
    }
}

export default new Routes();
