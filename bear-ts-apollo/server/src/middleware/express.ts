import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as uuid from 'uuid';

import config from '../config';

function nonceMiddleware(req, res, next) {
  res.locals.nonce = uuid.v4();
  next();
}

export default (server) => {
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
    resave: false, // 每次请求都重新设置session cookie
    saveUninitialized: true, // 无论有没有session cookie，每次请求都设置个session cookie
    secret: 'keyboard cat',
    name: 'mycookie', // 这里的name值得是cookie的name，默认cookie的name是：connect.sid
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

  server.use((err: any, req: express.Request, res: express.Response,next: express.NextFunction) => {
    if (err) {
      res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
      res.render('error', {
        message: err.message,
        error: {}
      });
    } else {
      next();
    }
  });
};
