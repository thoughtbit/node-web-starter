import * as express from 'express'
import User from './models/user'

export default function (router: express.Router) {
  router.get('/api/users/:id', async (req, res) => {
    const user = await User.query()
      .findById(req.params.id)
      .eager('[roles]')
      .omit(['password'])
    res.send(user)
  })

  router.get('/api/users/:username/profile', async (req, res) => {
     const user = await User.query()
      .where({ username: req.params.username })
      .eager('[roles]')
      .omit(['password'])
      .first()
    res.send(user)
  })
}
