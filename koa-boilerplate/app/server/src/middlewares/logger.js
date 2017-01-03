// logger
export default async function(ctx, next) {
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  console.log(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`)
  ctx.response.set('X-Response-Time', `${ms}ms`)
}
