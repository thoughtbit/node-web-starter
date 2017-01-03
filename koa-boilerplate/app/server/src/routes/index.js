/**
 * 路由入口
 */
import compose from 'koa-compose'

// Import all routes
import app from './app'
import api from './api'
// import auth from './auth'
// import mock from './mock'

export default () => compose([
  app(),
  api(),
  // auth(),
  // mock()
])
