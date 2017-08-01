import { resolve } from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { printSchema } from 'graphql'
import _debug from 'debug'
import appRootDir from 'app-root-dir'
import RootSchema from './graphql/rootSchema'
import config from './config'
import routes from './routes'
import { enableEnhancedStackTraces } from './helpers/utils/debugUtil'

import { expressMiddleware, /* authMiddleware, */ errorHandler, apolloUpload } from './middleware'

const debug = _debug('bear:server:app')

enableEnhancedStackTraces()

const app = express()

// Base Express middleware - body-parser, method-override, busboy, cors
expressMiddleware(app)
// Session middleware, authentication check, rbac
// authMiddleware(app)

app.get('/graphql/schema', (req, res) => {
  res.type('text/plain').send(printSchema(RootSchema))
})

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: `${config.api.prefix}/graphql`,
  }),
)

// All routes for the app
routes(app)

const graphqlHandler = graphqlExpress((req) => {
  const query = req.query.query || req.body.query
  if (query && query.length > 2000) {
    // None of our app's queries are this long
    // Probably indicates someone trying to send an overly expensive query
    throw new Error('Query too large.')
  }
  return {
    schema: RootSchema,
    context: {
      req,
      user: req.user ? req.user : null,
    },
    debug: true,
    pretty: process.env.NODE_ENV !== 'production',
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path,
    }),
  }
})

app.use(
  `${config.api.prefix}/graphql`,
  bodyParser.json(),
  apolloUpload({
    uploadDir: resolve(appRootDir.get(), './public/uploads/tmp'),
  }),
  graphqlHandler,
)

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use('/uploads', express.static(resolve(appRootDir.get(), './static/uploads')))
app.use('/apidocs', express.static(resolve(appRootDir.get(), './static/apidocs')))

// Setup the public directory so that we can serve static assets.
app.use(express.static(resolve(appRootDir.get(), './public')))

// Catch and format errors
errorHandler(app)

export default app
