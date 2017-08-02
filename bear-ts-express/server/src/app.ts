import * as path from 'path'
import * as express from 'express'
import bodyParser from 'body-parser'
import config from './config'
import routesAll from './routes'
import registerApi from './api'

import { expressMiddleware } from './middleware'

const promiseRouter = require('express-promise-router')

const router: express.Router = promiseRouter()

const app: express.Application = express().use(bodyParser.json()).use(router)

// Base Express middleware - body-parser, method-override, busboy, cors
expressMiddleware(app)
// Session middleware, authentication check, rbac
// authMiddleware(app)

// All routes for the app
routesAll(app)

// Register our REST API.
registerApi(router)

// Setup the public directory so that we can serve static assets.
app.use(express.static(path.resolve(__dirname, '../../public')))

export default app
