import NotFoundError from './NotFoundError'

function setError(ctx, statusCode, errorCode, errorMessage) {
  ctx.status = statusCode
  ctx.body = {
    code: errorCode,
    message: errorMessage,
  }
}

export default async function errors(ctx, next) {
  try {
    await next()
  } catch (error) {
    if (error instanceof NotFoundError) {
      setError(ctx, 404, 'NotFound', error.message)
    } else {
      setError(ctx, 500, 'InternalError', 'An internal error has occurred.')
    }
    // TODO: use logger
    console.log(error)
  }
}
