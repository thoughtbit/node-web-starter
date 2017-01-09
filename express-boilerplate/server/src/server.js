import path from 'path'
import http from 'http'
import express from 'express'
import engines from 'consolidate'
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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({
  limit: config.bodyLimit,
}))

// Static files
app.use(express.static(path.join(__dirname, '../public')))
app.use(['/favicon.ico', '/images*', '/media*', '/css*', '/fonts*', '/assets*'], (req, res) => {
  res.status(404).end()
})

// view engine setup
app.engine('html', engines.nunjucks)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

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
