import App from './../App'
import urllib = require('urllib')
import {attachPPID} from '../utils/Common'
const {GlobalConfigProcessor} = require('dorapan')
const globalConfig = GlobalConfigProcessor.getInstance().getAllProperties()
const actuatorPort = globalConfig.actuator.http.port

export class Actuator {

  static route = '/actuator/*'

  app: App
  constructor(app) {
    this.app = app
  }

  async get(ctx) {
    const url: string = /^\/actuator(.*)/.exec(ctx.request.url)[1]
    ctx.body = await Actuator.get(url)
  }

  static async get(url) {
    const backend = process.env.DASHBOARD_BACKEND || 'http://127.0.0.1:' + actuatorPort
      // http://testgw.proxy.taobao.org/
    const remoteUrl = backend + url
    const res = await urllib.request(remoteUrl, {
      timeout: 5000,
      dataType: 'json'
    })
    if(/^\/process/.test(url) && res.data.success && res.data.data) {
      try {
        await attachPPID(res.data.data)
      } catch(err) {
        // pass
      }
    }
    return res.data
  }

}
