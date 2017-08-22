"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
function nonceMiddleware(req, res, next) {
    res.locals.nonce = uuid.v4();
    next();
}
exports.default = (server) => {
    // ==============================================================================
    // 中间件
    // ==============================================================================
    // Add the logging middleware only if we aren't testing.
    if (process.env.NODE_ENV !== 'test') {
        server.use(morgan('dev'));
    }
    server.disable('x-powered-by');
    // Trust the first proxy in front of us, this will enable us to trust the fact
    // that SSL was terminated correctly.
    server.set('trust proxy', 'loopback');
    server.use(nonceMiddleware);
    server.use((req, res, next) => {
        res.set('Request-Id', uuid.v4());
        next();
    });
    server.set('json spaces', 2);
    // Enable a suite of security good practices through helmet. We disable
    // frameguard to allow crossdomain injection of the embed.
    server.use(helmet({
        frameguard: false
    }));
    // Compress the responses if appropriate.
    server.use(compression());
    // Parse the cookies on the request.
    server.use(cookieParser());
    server.use(bodyParser.json({ type: 'application/json' }));
    // parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use((err, req, res, next) => {
        if (err) {
            res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
            res.render('error', {
                message: err.message,
                error: {}
            });
        }
        else {
            next();
        }
    });
};
//# sourceMappingURL=express.js.map