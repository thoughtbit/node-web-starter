import http from 'http'
import server from './server'
import initializeDb from './db'
import config from './config'

// express
const startServer = (db) => {
  // Initialize server
  const app = server.init({ config, db })
  app.server = http.createServer(app)
  app.server.listen(process.env.PORT || config.port)
  console.log(`Started on port ${app.server.address().port}`)
}

// connect to db
initializeDb((db) => {
  startServer(db)
})
