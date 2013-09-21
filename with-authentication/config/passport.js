var mongoose = require('mongoose'),
    User = require('../app/models/user'),
    FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function (passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: '468182209922625',
        clientSecret: '4a4be02e7994058c08b3d3be10b583b6',
        callbackURL: '/auth/facebook/callback'
    }, function(accessToken, refreshToken, profile, done) {
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    provider_id: profile.id,
                    provider: 'facebook',
                    facebook: profile._json
                });
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }));
};