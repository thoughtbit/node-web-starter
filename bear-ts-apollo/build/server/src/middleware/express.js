"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const session = require("express-session");
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
    // 使用session模块
    // 这里不没有使用数据库储存session;使用内存储存session
    server.use(session({
        resave: false,
        saveUninitialized: true,
        secret: 'keyboard cat',
        name: 'mycookie',
        cookie: { secure: true, maxAge: 30 * 60 * 1000 } // 设置maxAge是30分钟，即30分钟后session和相应的cookie失效过期
        // store: new MongoStore({
        //   url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
        //   autoReconnect: true
        // })
    }));
    // 接口请求之后，更新session的时间
    // server.use((req, res, next) => {
    //   req.session._garbage = Date();
    //   req.session.touch();
    //   next();
    // });
    // 处理跨域请求，如果不涉及跨域，请忽略
    // server.all('*', (req, res, next) => {
    //   res.header('Access-Control-Allow-Origin', req.headers.origin);
    //   res.header('Access-Control-Allow-Credentials', true);
    //   res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-with, X_Requested_With');
    //   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //   res.header('X-Powered-By', '3.2.1');
    //   res.header('Content-Type', 'application/json; charset=utf-8');
    //   if (req.method === 'OPTIONS') {
    //     res.end('options ok');
    //   } else {
    //     next();
    //   }
    // });
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