import * as express from 'express'

export default function (router: express.Router) {
  router.get('/api/', (req, res) => {
    res.send('Hello Api!')
  })
}
