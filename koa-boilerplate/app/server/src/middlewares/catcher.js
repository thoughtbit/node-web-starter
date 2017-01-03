/**
 * Middleware for catching errors thrown in routes
 * @param ctx
 * @returns {function}
 */
export default async function(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
}
