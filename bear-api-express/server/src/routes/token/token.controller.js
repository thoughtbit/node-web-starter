import _debug from 'debug'
import uuid from 'uuid'
import * as objection from 'objection'
import { mailer } from './../../services/mailer'
import { signToken } from './../../services/authentication'
import { passwordModifiedEmail, forgotPasswordEmail } from '../../services/mailer/templates'
import { responseHandler, BadRequest } from '../../core'
import User from './../../models/user'
import VerificationToken from './../../models/verification_token'
import ResetToken from '../../models/reset_token'

const debug = _debug('bear:token-ctrl')

export async function forgottenPassword(req, res, next) {
  const user = await User.query().where({ email: req.body.email }).first()
  const mailSubject = '[Bear] Password Reset'
  const resetPasswordToken = uuid.v4()

  await user.$relatedQuery('resetToken').insert({
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    token: resetPasswordToken,
    userId: user.id,
  })

  const mailBody = forgotPasswordEmail(resetPasswordToken)

  mailer(user, mailBody, mailSubject)
  return responseHandler(res, 202, {
    message: 'Sending email with reset link',
  })
}

export async function resetPassword(req, res, next) {
  try {
    const userResetToken = await ResetToken.query().where({ token: req.body.token }).first()
    console.log(userResetToken)
    if (!userResetToken) {
      return res.status(404).json({ error: 'Unable to locate an user with the provided token.' })
    }
    const mailSubject = '[Bear] Password Changed'

    const user = await User.query().findById(userResetToken.userId)
    console.log(user)
    User.query().patchAndFetchById(user.id, {
      password: req.body.password,
    })
    const mailBody = passwordModifiedEmail(user)
    await mailer(user, mailBody, mailSubject)
    return responseHandler(res, 204, 'Sent')
  } catch (error) {
    return next(new BadRequest(error))
  }
}
