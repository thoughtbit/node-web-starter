import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-better-body'
import mount from 'koa-mount'
import serve from 'koa-static'
import favicon from 'koa-favicon'
import nunjucks from 'koa-nunjucks-2'
import convert from 'koa-convert'
import json from 'koa-json'
import send from 'koa-send'
import logger from 'koa-logger'
import onerror from 'koa-onerror'
import compress from 'koa-compress'
import cors from 'kcors'

import config from './config'
import routeMiddleware from './routes'
// import errorMiddleware from './middlewares/catcher'
import KoaErrors from './helpers/errors/KoaErr'
import DateFilter from './helpers/filters/DateFilter'

const app = new Koa()

app.keys = [config.session]

// 500 error
onerror(app)

// middlewares
app.use(convert(bodyParser({
  formLimit: '200kb',
  jsonLimit: '200kb',
  bufferLimit: '4mb',
})))
app.use(cors({ credentials: true }))
app.use(convert(json()))
app.use(convert(logger()))
app.use(compress())

// static
// app.use(convert(serve(path.join(__dirname, './../public'))))

// Serve static files
config.static.forEach((staticRoute) => {
  app.use(mount(staticRoute.url, convert(serve(staticRoute.path))))
})

// favicon
app.use(favicon(config.favicon))

// views
app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    autoescape: true,
    watch: true,
  },
  configureEnvironment: (env) => {
    env.addFilter('dateFilter', DateFilter)
  },
}))

// 发送文件，如HTML
app.use(async (ctx, next) => {
  ctx.send = send
  await next()
})

// registers routes via middleware
app.use(routeMiddleware())

// 设置Header
app.use(async (ctx, next) => {
  ctx.set('X-Powered-By', 'koa-boilerplate')
  await next()
})

// 使用自定义错误
app.use(async (ctx, next) => {
  ctx.err = KoaErrors
  await next()
})

// 全局错误处理
// app.use(errorMiddleware)

// 404
// app.use(async (ctx) => {
//   ctx.status = 404
//   await ctx.render('404')
// })

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured:', err)
  logger.error('server error', err, ctx)
})

app.listen(config.port, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(`✅  Listening at http://localhost:${config.port}...`)
  }
})
