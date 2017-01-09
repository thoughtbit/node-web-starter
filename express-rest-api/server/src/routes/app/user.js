import { Router } from 'express'

const router = new Router()

export default ({ config, db }) => {
  router.route('/')
    .get(async (req, res, next) => {
      res.json({ route: 'GET / user' })
    })
    .post((req, res, next) => {
      res.json({ route: 'POST / user' })
    })
  return router
}
