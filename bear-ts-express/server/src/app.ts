import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import config from './config'
import routesAll from './routes'
import registerApi from './api'

import { expressMiddleware } from './middleware'

const router = express.Router()

const app: express.Application = express()

// Base Express middleware - body-parser, method-override, busboy, cors
expressMiddleware(app)

// All routes for the app
routesAll(app)

// Register our REST API.
registerApi(router)

app.use(bodyParser.json())

// app.use(router)

// Setup the public directory so that we can serve static assets.
app.use(express.static(path.resolve(__dirname, '../../public')))

export default app
