import { Router } from 'express'
import { isAuthenticated } from './../../services/authentication'
import { checkRole } from './../../middleware/rbac'
import User from './../../models/user'
import * as ctrl from './user.controller'

const router = new Router()

router.get('/', (req, res) => {
  res.json('user')
})

router.get('/:id', ctrl.getUser)

router.get('/:username/profile', ctrl.getUsername)

export default router
