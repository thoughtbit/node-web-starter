import { Router } from 'express'
import { isAuthenticated } from './../../services/authentication'
import { checkRole } from './../../middleware/rbac'
import * as ctrl from './role.controller'

const router = new Router()

router.get('/', ctrl.listRoles)

router.get('/:id', ctrl.getRole)

router.get('/:id/users', ctrl.getRoleUsers)

export default router
