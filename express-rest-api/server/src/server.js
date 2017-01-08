import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from './passport';
import routes from './routes';

/**
 * An Express class to configure Express application.
 *
 * @class
 */
class Server {

    /**
     * Configure express application.
     *
     * @class
     */
    constructor() {
        // Initialize Express app
        this.app = express();
    }

    /**
     * Initialize application middleware.
     *
     * @method initMiddleware
     * @private
     */
    initMiddleware() {

        // Showing stack errors
        this.app.set('showStackError', true);

        // Request body parsing middleware should be above methodOverride
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(methodOverride());
    }

    /**
     * Configure Helmet headers configuration.
     *
     * @method initHelmetHeaders
     * @private
     */
    initHelmetHeaders() {
        this.app.use(helmet.xframe());
        this.app.use(helmet.xssFilter());
        this.app.use(helmet.nosniff());
        this.app.use(helmet.ienoopen());
        this.app.disable('x-powered-by');
    }

    /**
     * Configure CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests.
     *
     * @method initCrossDomain
     * @private
     */
    initCrossDomain() {
        // setup CORS
        this.app.use(cors());
        this.app.use((req, res, next) => {
            // Website you wish to allow to connect
            res.set('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
            // Request headers you wish to allow
            res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');
            // Pass to next layer of middleware
            next();
        });
    }

    /**
     * Configure error handling.
     *
     * @method initErrorRoutes
     * @private
     */
    initErrorRoutes() {
        // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you
        // like, set properties, use instanceof etc.
        this.app.use(function (err, req, res, next) {
            // If the error object doesn't exists
            if (!err) {
                return next();
            }

            // Redirect to error page
            res.sendStatus(500);
        });

        // Assume 404 since no middleware responded
        this.app.use(function (req, res) {
            // Redirect to not found page
            res.sendStatus(404);
        });
    }

    /**
     * Initialize the Express application.
     *
     * @method init
     * @returns {Object} the express application
     */
    init({ config, db }) {

        // Initialize Express middleware
        this.initMiddleware();

        // Initialize Helmet security headers
        this.initHelmetHeaders();

        // Initialize CORS
        this.initCrossDomain();

        // Initialize passport configuration
        passport.init(this.app);

        // Initialize routes
        routes.init(this.app, config, db);

        // Initialize error routes
        this.initErrorRoutes();

        return this.app;

    }

}

export default new Server()

