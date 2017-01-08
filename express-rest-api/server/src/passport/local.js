import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../user/user.model';

export default new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},  (email, password, done) => {

    User.findOne({email: email.toLowerCase()}, function (err, user) {

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
