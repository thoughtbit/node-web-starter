import { Strategy as LocalStrategy } from 'passport-local'

export default new LocalStrategy({
    app, 
    config, 
    db,
    emailField: 'email',
    passwordField: 'password'
},  (app, config, db, email, password, done) => {

    db.User.findOne({email: email.toLowerCase()}, function (err, user) {

        if (err) {
            return done(err);
        }

        // no user found with that email
        if (!user) {
            return done(null, false, {message: 'The email is not registered.'});
        }
        if (!user || !user.authenticate(password)) {
            return done(null, false, {
                message: 'Invalid username or password'
            });
        }

        return done(null, user);
    });
});
