import * as express from 'express';
import * as ctrl from './role.controller';

let router = express.Router();

router.get('/', ctrl.listRoles);

router.get('/:id', ctrl.getRole);

router.get('/:id/users', ctrl.getRoleUsers);

export default router;
