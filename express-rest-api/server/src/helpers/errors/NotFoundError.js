import ServiceError from './ServiceError'

export default class NotFoundError extends ServiceError {
  constructor(message) {
    super(message, 'NotFoundError')
  }
}
