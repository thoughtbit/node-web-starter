"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const morgan = require("morgan");
const uuid = require("uuid");
function nonceMiddleware(req, res, next) {
    res.locals.nonce = uuid.v4();
    next();
}
exports.default = (app) => {
    app.disable('x-powered-by');
    app.set('trust proxy', 'loopback');
    app.use(nonceMiddleware);
    app.use((req, res, next) => {
        res.set('Request-Id', uuid.v4());
        next();
    });
    app.set('json spaces', 2);
    app.use(bodyParser.json({ type: 'application/json' }));
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use((err, req, res, next) => {
        if (err) {
            res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
        }
        else {
            next();
        }
    });
};
//# sourceMappingURL=express.js.map