import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression'; // compresses requests
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as engines from 'consolidate';
import * as uuid from 'uuid';
import * as errorHandler from 'errorhandler';
import * as lusca from 'lusca';
import * as dotenv from 'dotenv';
import * as flash from 'express-flash';
import * as passport from 'passport';
import expressValidator = require('express-validator');

import config from '../config';

/**
 * API keys and Passport configuration.
 */
import * as passportConfig from './../config/passport';

function nonceMiddleware(req, res, next) {
  res.locals.nonce = uuid.v4();
  next();
}

function userMiddleware(req, res, next) {
  res.locals.user = req.user;
  next();
}

export default (server) => {

  /**
   * Load environment variables from .env file, where API keys and passwords are configured.
   */
  // dotenv.config({ path: path.join(__dirname, '../../.env.example') });

  // ==============================================================================
  // 中间件
  // ==============================================================================

  // Add the logging middleware only if we aren't testing.
  if (process.env.NODE_ENV !== 'test') {
    server.use(logger('dev'));
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

  server.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
    cookie: { secure: true }
    // store: new MongoStore({
    //   url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    //   autoReconnect: true
    // })
  }));
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(flash());
  server.use(lusca.xframe('SAMEORIGIN'));
  server.use(lusca.xssProtection(true));

  server.use(bodyParser.json({ type: 'application/json' }));

  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(expressValidator());

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

  server.use(userMiddleware);
  server.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user &&
      req.path !== '/login' &&
      req.path !== '/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
      req.session.returnTo = req.path;
    } else if (req.user &&
      req.path === '/account') {
      req.session.returnTo = req.path;
    }
    next();
  });

  // ==============================================================================
  // VIEW CONFIGURATION
  // ==============================================================================
  // Static files
  server.use(express.static(path.join(__dirname, '../../public'), { maxAge: 31557600000 }));
  server.use(['/favicon.ico', '/images*', '/media*', '/css*', '/fonts*', '/assets*'], (req, res) => {
    res.status(404).end();
  });

  // view engine setup
  server.engine('html', engines.nunjucks);
  server.set('views', path.join(__dirname, '../views'));
  server.set('view engine', 'html');

  /**
   * Error Handler. Provides full stack - remove for production
   */
  server.use(errorHandler());
};
