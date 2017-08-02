import config from './../config'
import userRoutes from './user/user.routes'

export default app => {
  app.get('health-check', (req, res) => {
    res.status(200)
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')
    res.json({
      health: 'good',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    })
  })

  app.use('users', userRoutes)
}
