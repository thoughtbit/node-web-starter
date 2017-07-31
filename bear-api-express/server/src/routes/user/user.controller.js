import _debug from 'debug'

import {
  responseHandler,
  UserNotVerifiedError,
  NotFound,
  BadRequest,
  InternalServer,
  Unauthorized,
  Conflict,
} from './../../core'
import User from './../../models/user'

const debug = _debug('bear:user-ctrl')

export async function getUser(req, res, next) {
  try {
    const user = await User.query()
      .findById(req.params.id)
      .eager('[roles,socialMedia]')
      .omit(['password'])

    return responseHandler(res, 200, user)
  } catch (error) {
    const err = new BadRequest(error)
    return next(err)
  }
}

export async function getUsername(req, res, next) {
  try {
    const user = await User.query()
      .where({ username: req.params.username })
      .eager('[roles,socialMedia]')
      .omit(['password'])
      .first()

    return responseHandler(res, 200, user)
  } catch (error) {
    const err = new BadRequest(error)
    return next(err)
  }
}
