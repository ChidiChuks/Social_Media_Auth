let localStrategy = require('passport-local').Strategy;

let db = reuire('../models');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.uuid);
    });

    passport.deserializeUser(function(uuid, done)) {
        db.Accounts.findById(uuid).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null)
            }
        })
    }

    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'account_key',
        passReqToCallback: true
    }))
}