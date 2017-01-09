import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import initializeDb from './db'
import middlewares from './middlewares'
import passport from './passport'
import routers from './routes'
import config from './config'

const app = express()

app.server = http.createServer(app)

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({
  limit: config.bodyLimit,
}))

// connect to db
initializeDb((db) => {
  // internal middleware
  app.use(middlewares({ config, db }))

  // passport
  passport({ app, config, db })

  // api router
  app.use(routers({ config, db }))

  app.server.listen(process.env.PORT || config.port)

  console.log(`Started on port ${app.server.address().port}`)
})

export default app
