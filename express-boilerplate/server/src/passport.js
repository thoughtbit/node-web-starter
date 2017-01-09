import passport from 'passport'
import local from './passport/local'

export default ({ app, config, db }) => {
  // use these strategies
  passport.use(local({ app, config, db }))
  // Add passport's middleware
  app.use(passport.initialize())
  app.use(passport.session())
}
