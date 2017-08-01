import { Router } from 'express'
import { isAuthenticated } from './../../services/authentication'
import * as ctrl from './auth.controller'

const router = new Router()

router.post('/login', ctrl.loginUser)

router.post('/signup', ctrl.registerUser)

router.get('/check', isAuthenticated, ctrl.checkAuthentication)

router.post('/verify', ctrl.verifyUserRegister)

export default router
