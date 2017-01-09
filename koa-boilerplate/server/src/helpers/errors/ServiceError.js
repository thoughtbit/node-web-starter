// Note: Babel does not support extending builtin types like Error:
// https://phabricator.babeljs.io/T3083

export default function ServiceError(message, name) {
  this.message = message
  this.name = name || 'ServiceError'
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor)
  }
}

ServiceError.prototype = Object.create(Error.prototype)
ServiceError.prototype.constructor = ServiceError
