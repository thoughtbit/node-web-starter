import { Router } from 'express';

export default ({ config, db }) => {
	let router = Router()

  router.route('/')
    .get(async (req, res, next) => {
      res.json({ "route": "GET / user" });
    })
    .post((req, res, next) => {
      res.json({ "route": "POST / user" });
    });

  router.route('/:id')
    .get(async (req, res, next) => {
      res.json({ "route": "GET / user:id" });
    })
    .put((req, res, next) => {
      res.json({ "route": "PUT / user:id" });
    })
    .delete((req, res, next) => {
      res.json({ "route": "DELETE / user" });
    });

  return router
}
