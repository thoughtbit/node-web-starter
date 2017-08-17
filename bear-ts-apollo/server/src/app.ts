import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as next from 'next';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { schema } from './schema'
import { expressMiddleware } from './middleware'
import config from './config'
import routes from './routes'

// const router = express.Router()
const server = express()

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const APP_PORT = process.env.APP_PORT || 3000;

app
  .prepare()
  .then(() => {

    // Base Express middleware - body-parser, method-override, busboy, cors
    expressMiddleware(app)

    server.use('/graphql', bodyParser.json(), graphqlExpress({
      schema
    }));

    server.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }));
    // All routes for the app
    routes(app)

    app.use(bodyParser.json())

    // app.use(router)

    // Setup the public directory so that we can serve static assets.
    app.use(express.static(path.resolve(__dirname, '../../public')))

    server.all('*', (req, res) => handle(req, res));

    server.listen(APP_PORT, err => {
      if (err) throw err;
      console.log('> Environment:');
      console.log(`> > NODE_ENV=${process.env.NODE_ENV}`);
      console.log(`> Ready on http://localhost:${APP_PORT} ["test"]`);
    });
  });
