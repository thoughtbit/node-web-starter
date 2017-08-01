import { Router } from 'express'
import { isAuthenticated } from './../../services/authentication'
import * as ctrl from './token.controller'

const router = new Router()

router.post('/forgot-password', ctrl.forgottenPassword)

router.post('/reset-password/:token', ctrl.resetPassword)

export default router
