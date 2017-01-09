import passport from 'passport'
import local from './passport/local'

class Passport {
  constructor() {
  }

  init({ app, config, db }) {
    // use these strategies
    passport.use(local({ config, db }))
    // Add passport's middleware
    app.use(passport.initialize())
  }
}

export default new Passport()
