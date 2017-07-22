import { Router } from 'express'
import { isAuthenticated } from './../../services/authentication'
import * as ctrl from './auth.controller'

const router = new Router()

router.get('/login', (req, res) => {
  res.json('login')
})

export default router
