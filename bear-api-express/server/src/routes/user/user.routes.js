import { Router } from 'express'
import { isAuthenticated } from '../../services/authentication'
import { checkRole } from '../../middleware/rbac'
import User from './../../models/user'
import * as ctrl from './user.controller'

const router = new Router()

// router.get('/:id', ctrl.getUser)

// router.post('/', isAuthenticated, checkRole('Admin'), ctrl.adminCreateUser)

// router.put('/:id', isAuthenticated, ctrl.updateUser)

// router.put('/admin/:id', isAuthenticated, checkRole('Admin'), ctrl.adminUpdateUser)

// router.patch('/:id', isAuthenticated, ctrl.updateUser)

// router.delete('/:id', isAuthenticated, checkRole('Admin'), ctrl.destroyUser)

// router.get('/:username/profile', ctrl.getUsername)

export default router
