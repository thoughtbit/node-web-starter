/**
 * API路由
 */
import Router from 'koa-router'
import compose from 'koa-compose'

import userCtrl from './../controllers/user'

import KoaErrors from './../helpers/errors/KoaErr'

const router = new Router({
  prefix: '/api',
})
router.use(KoaErrors)

// 新增
router.post('/user', userCtrl.save)
router.get('/user', userCtrl.index)
router.get('/:user', userCtrl.find)
router.get('/user/:userId', userCtrl.getUser)
router.get('/users', userCtrl.getUsers)

router.put('/user/:userId', userCtrl.updateUser)
router.del('/user/:userId', userCtrl.deleteUser)

export default () => compose(
  [
    router.routes(),
    router.allowedMethods(),
  ]
)
