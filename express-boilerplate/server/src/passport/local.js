import { Strategy as LocalStrategy } from 'passport-local'

export default ({ app, config, db }) => new LocalStrategy(
  {
    emailField: 'email',
    passwordField: 'password',
  }, (email, password, done) => done())
