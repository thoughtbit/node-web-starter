import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as _debug from 'debug';

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import config from './config';
import routes from './routes';
import { expressMiddleware } from './middleware';

const debug = _debug('bear:server');

export function setupParentApp(): express.Express {
  debug('initalizing express parentApp...');
  let server = express();

  // ==============================================================================
  // 中间件
  // ==============================================================================
  // Base Express middleware - body-parser, method-override, busboy, cors
  expressMiddleware(server);

  // ==============================================================================
  // GRAPHIQL
  // ==============================================================================
  server.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
  }));

  server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));

  // ==============================================================================
  // ROUTES
  // ==============================================================================
  // All routes for the server
  routes(server);

  debug('parentApp done');
  return server;
}
