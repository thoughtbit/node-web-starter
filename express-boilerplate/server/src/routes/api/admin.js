import { Router } from 'express'

const router = new Router()

export default ({ config, db }) => {
  router.route('/')
    .get(async (req, res, next) => {
      res.json({ route: 'GET / admin' })
    })
    .post((req, res, next) => {
      res.json({ route: 'POST / admin' })
    })

  router.route('/:id')
    .get(async (req, res, next) => {
      res.json({ route: "GET / admin:id" })
    })
    .put((req, res, next) => {
      res.json({ route: 'PUT / admin:id' })
    })
    .delete((req, res, next) => {
      res.json({ route: 'DELETE / admin' })
    })
  return router
}
