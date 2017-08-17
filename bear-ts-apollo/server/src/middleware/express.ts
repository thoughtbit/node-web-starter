import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import * as uuid from 'uuid'
import config from '../config'

function nonceMiddleware(req, res, next) {
  res.locals.nonce = uuid.v4()
  next()
}

export default (app) => {
  app.disable('x-powered-by')
  app.set('trust proxy', 'loopback')
  app.use(nonceMiddleware)

  app.use((req, res, next) => {
    res.set('Request-Id', uuid.v4())
    next()
  })
  app.set('json spaces', 2)
  app.use(bodyParser.json({ type: 'application/json' }))
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  app.use((err: any, req: express.Request, res: express.Response,next: express.NextFunction) => {
    if (err) {
      res.status(err.statusCode || err.status || 500).send(err.data || err.message || {})
    } else {
      next()
    }
  })
}
