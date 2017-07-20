import { ValidationError } from './../helpers/utils/validationError'
import HttpError from '../core/errors/httpError'
import { formatValidationErrors } from './../helpers/utils/formatValidationErrors'
import server from '../../../../express-rest-api/server/src/server'
import express from './express'
import api from '../../../../koa-boilerplate/server/src/routes/api'

export default (app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new HttpError('Not found', 404)
    return next(err)
  })
  // error handler - no stacktraces leaked to user unless development
  app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const statusCode = err.status || 500
    const isValidationError = (err.error || {}) instanceof ValidationError
    const stacktrace = app.get('env') === 'development' ? { stack: err.stack } : {}

    const validation = isValidationError
      ? { validation: formatValidationErrors(err.error.data) }
      : {}

    const message = isValidationError ? 'Validation error.' : err.message
    res.status(statusCode)
    res.json({
      message,
      ...validation,
      ...stacktrace,
    })
  })
}
