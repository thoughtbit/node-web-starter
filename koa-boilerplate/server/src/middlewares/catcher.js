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

/*
const ERROR = {
  FORMAT_INVALID: 'FORMAT_INVALID',
  DATA_NOT_FOUND: 'DATA_NOT_FOUND',
  DATA_EXISTED: 'DATA_EXISTED',
  DATA_INVALID: 'DATA_INVALID',
  LOGIN_REQUIRED: 'LOGIN_REQUIRED',
  PERMISSION_DENIED: 'PERMISSION_DENIED'
}
const ERROR_MAP = {
  FORMAT_INVALID: {
    code: 1,
    message: 'The request format is invalid'
  },
  DATA_NOT_FOUND: {
    code: 2,
    message: 'The data is not found in database'
  },
  DATA_EXISTED: {
    code: 3,
    message: 'The data has exist in database'
  },
  DATA_INVALID: {
    code: 4,
    message: 'The data is invalid'
  },
  LOGIN_REQUIRED: {
    code 5,
    message: 'Please login first'
  },
  PERMISSION_DENIED: {
    code: 6,
    message: 'You have no permission to operate'
  }
}

class CError extends Error {
  constructor(type, detail) {
    super()
    Error.captureStackTrace(this, this.constructor)
    let error = ERROR_MAP[type]
    if (!error) {
      error = {
        code: 999,
        message: 'Unknow error type'
      }
    }
    this.name = 'CError'
    this.type = error.code !== 999 ? type : 'UNDEFINED'
    this.code = error.code
    this.message = error.message
    this.detail = detail
  }
}

// in controller
if (!user) {
  throw new CError(ERROR.LOGIN_REQUIRED, 'You should login first')
}
if (!req.body.title) {
  throw new CError(ERROR.FORMAT_INVALID, 'Title is required')
}
if (!post) {
  throw new CError(ERROR.DATA_NOT_FOUND, 'The post you required is not found')
}

module.exports = async function errorHandler (ctx, next) {
  try {
    await next()
  } catch (err) {
    let status
    switch (err.type) {
      case ERROR.FORMAT_INVALID:
      case ERROR.DATA_EXISTED:
      case ERROR.DATA_INVALID:
        status = 400
        break
      case ERROR.LOGIN_REQUIRED:
        status = 401
      case ERROR.PERMISSION_DENIED:
        status = 403
      case ERROR.DATA_NOT_FOUND:
        status = 404
        break
      default:
        status = 500
    }
    ctx.status = status
    ctx.body = err
  }
}
// in app.js
app.use(errorHandler)

*/
