import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import passport from './passport'
import routes from './routes'

/**
 * An Express class to configure Express application.
 */
class Server {
  // Configure express application.
  constructor() {
    // Initialize Express app
    this.app = express()
  }

  // Initialize application middleware.
  initMiddleware(config) {
    // Showing stack errors
    this.app.set('showStackError', true)

    // Request body parsing middleware should be above methodOverride
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json({
      limit: config.bodyLimit,
    }))
    this.app.use(methodOverride())
  }

  // Configure Helmet headers configuration.
  initHelmetHeaders() {
    this.app.use(helmet.frameguard())
    this.app.use(helmet.xssFilter())
    this.app.use(helmet.noSniff())
    this.app.use(helmet.ieNoOpen())
    this.app.disable('x-powered-by')
  }

  // Configure CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests.
  initCrossDomain(config) {
    // setup CORS
    this.app.use(cors({
      exposedHeaders: config.corsHeaders,
    }))
    this.app.use((req, res, next) => {
      // Website you wish to allow to connect
      res.set('Access-Control-Allow-Origin', '*')
      // Request methods you wish to allow
      res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
      // Request headers you wish to allow
      res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token')
      // Pass to next layer of middleware
      next()
    })
  }

  // Configure error handling.
  initErrorRoutes() {
		// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you
    // like, set properties, use instanceof etc.
    this.app.use((err, req, res, next) => {
      // If the error object doesn't exists
      if (!err) {
        return next()
      }
      // Redirect to error page
      res.sendStatus(500)
    })

    // Assume 404 since no middleware responded
    this.app.use((req, res) => {
      // Redirect to not found page
      res.sendStatus(404)
    })
  }

  // Initialize the Express application.
  init({ config, db }) {
    const app = this.app

    // Initialize Express middleware
    this.initMiddleware(config)

    // Initialize Helmet security headers
    this.initHelmetHeaders()

    // Initialize CORS
    this.initCrossDomain(config)

    // Initialize passport configuration
    passport.init({ app, config, db })

    // Initialize routes
    app.use(routes({ config, db }))

    // Initialize error routes
    this.initErrorRoutes()

    return app
  }
}

export default new Server()
