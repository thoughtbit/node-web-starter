import * as Koa from "koa"
const app = new Koa()

app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  console.log(`${ctx.method} ${ctx.url}`)
})

// response
app.use(ctx => {
  ctx.body = 'Hello World'
})

app.listen(9000)
