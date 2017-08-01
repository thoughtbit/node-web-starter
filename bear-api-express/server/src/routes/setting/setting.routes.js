import { Router } from 'express'
import { checkRole } from './../../middleware/rbac'
import { isAuthenticated } from './../../services/authentication'
import * as ctrl from './setting.controller'

const router = new Router()

router.get('/', ctrl.listSettings)

router.post('/', isAuthenticated, checkRole('Admin'), ctrl.addSetting)

router.get('/:id', ctrl.getSetting)

router.put('/:id', isAuthenticated, checkRole('Admin'), ctrl.updateSetting)

router.patch('/:id', isAuthenticated, checkRole('Admin'), ctrl.updateSetting)

export default router
