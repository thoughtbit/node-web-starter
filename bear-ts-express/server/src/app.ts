import * as path from 'path';
import * as express from 'express';
import * as _debug from 'debug';

import config from './config';
import routes from './routes';
import { expressMiddleware } from './middleware';

const debug = _debug('bear:server');
const server = express();

// ==============================================================================
// 中间件
// ==============================================================================
// Base Express middleware - body-parser, method-override, busboy, cors
expressMiddleware(server);

debug(`mounting routes ...`);

// ==============================================================================
// ROUTES
// ==============================================================================
// All routes for the server
routes(server);

export default server;
