import App from './../App'
import mount = require('koa-mount')
import serve = require('koa-static')
import {join} from 'path'

export class Static {

  app: App
  constructor(app) {
    this.app = app
  }

  setup() {
    this.app.use(mount('/public', serve(
      join(__dirname, '../../public'),
      {
        gzip: true
      }
    )))
  }

}
