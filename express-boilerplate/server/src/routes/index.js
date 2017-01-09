/**
 * 路由入口
 */

import { Router } from 'express'

// Import all routes
// import auth from './auth'
import api from './api/index'
import app from './app/index'

const router = new Router()

export default ({ config, db }) => {
  // api router
  router.use('/api/admin', api.adminRouter({ config, db }))
  router.use('/api/user', api.userRouter({ config, db }))

  // app router
  router.use('/app/admin', app.adminRouter({ config, db }))
  router.use('/app/user', app.userRouter({ config, db }))

  router.get('/api', (req, res) => {
    res.json('api')
  })

  router.get('/app', (req, res) => {
    res.json('app')
  })

  router.get('/', (req, res) => {
    // res.json({ version: config.version })
    res.render('index', {
      name: 'home',
    })
  })

  // // catch 404 and forward to error handler
  // router.use((req, res, next) => {
  //   const err = new Error('Not Found')
  //   err.status = 404
  //   next(err)
  // })

  // router.use((error, req, res) => {
  //   const statusCode = error.statusCode || 500
  //   const err = {
  //     error: statusCode,
  //     message: error.message,
  //   }
  //   if (!res.headersSent) {
  //     res.status(statusCode).send(err)
  //   }
  // })

  return router
}
