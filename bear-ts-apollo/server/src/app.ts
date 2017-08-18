import * as path from 'path';
import * as express from 'express';
import config from './config';
import routes from './routes';

import { expressMiddleware } from './middleware';

const router = express.Router();

const server = express();

// Base Express middleware - body-parser, method-override, busboy, cors
expressMiddleware(server);

// All routes for the server
routes(server);

// Setup the public directory so that we can serve static assets.
server.use(express.static(path.resolve(__dirname, '../../public')));

export default server;
