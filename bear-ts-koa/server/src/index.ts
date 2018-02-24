import * as Koa from 'koa'
import * as Router from 'koa-router'
import { createServer, Server } from 'http'

const app = new Koa()
const methods = ['get', 'put', 'post', 'patch', 'delete', 'del']

export abstract class WebServer extends Koa {
  server: Server
  router: any

  constructor() {
    super()
    this.router = new Router
    this.server = createServer(this.callback())
    this.setup()
    this.use(this.router.routes())
    this.use(this.router.allowedMethods())
  }

  setup() {
    const router = this.router
    const routes: any[] = this.getRoutes()
    for (const Route of routes) {
      const routePath = Route.route
      const route = new Route(this)
      if (route.setup) {
        route.setup()
      }
      for (const method of methods) {
        if (route[method]) {
          router[method](routePath, route[method].bind(route))
        }
      }
    }
    this.server.on('upgrade', (request, socket) => {
      if (!socket.wsHasBeenTaken) {
        socket.end()
      }
    })


  abstract getRoutes()
  abstract getPort(): {port: number, host: string}

  async start() {
    const {port, host} = this.getPort()
    await new Promise((resolve, reject) => {
      this.server.listen({ port, host }, (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }

  async stop() {
    await new Promise((resolve) => {
      this.server.close(resolve)
    })
  }
}
// app.use(async function (ctx, next) {
//   const start = new Date()
//   await next()
//   console.log(`${ctx.method} ${ctx.url}`)
// })

// // response
// app.use(ctx => {
//   ctx.body = 'Hello World'
// })

// app.listen(9000, () => {
//     console.log('>>| Listen on 9000')
// })

/**
 * demo for test
 * */
export function add(a, b) {
  return a + b
}
