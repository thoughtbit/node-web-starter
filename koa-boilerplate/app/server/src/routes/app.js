/**
 * 网站路由
 */
import path from 'path'
import Router from 'koa-router'
import compose from 'koa-compose'

import homeCtrl from '../controllers/app'

const router = new Router()

// const router = new Router({
//   prefix: '/app'
// })

router.get('/', async (ctx, next) => {
  // 渲染HTML模板
  await ctx.send(ctx, path.join(__dirname, '../views/index.html'))
})

router.get('/index', homeCtrl.home)
router.get('/about', homeCtrl.about)

export default () => compose(
  [
    router.routes(),
    router.allowedMethods(),
  ]
)
