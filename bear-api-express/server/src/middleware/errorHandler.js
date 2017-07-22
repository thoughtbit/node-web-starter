import { ValidationError } from 'objection'
import HttpError from '../core/errors/httpError'
import { formatValidationErrors } from './../helpers/utils/formatValidationErrors'
import express from './express'

export default (app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new HttpError('Not found', 404)
    return next(err)
  })

  app.use((err, req, res, next) => {
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
