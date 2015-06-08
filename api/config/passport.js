var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel.js');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {

        User.findById(id, function(err, user) {
            done(err, user);
        })

    });

    //passport.use('local', new LocalStrategy({
    //    usernameField: 'email',
    //    passwordField: 'password',
    //    passReqToCallback: true
    //}), function(req, email, password, done) {
    //
    //    process.nextTick(function() {
    //        User.findOne({'user_info.email': email}, function(err, user) {
    //            if (err) return done(err);
    //            if(user) return done(null, false);
    //            else {
    //                var newUser = new User;
    //                newUser.user_info.name.first_name = req.body.firstName;
    //                newUser.user_info.name.last_name = req.body.lastName;
    //                newUser.user_info.name.email = email;
    //                newUser.user_info.name.password = password;
    //
    //
    //                newUser.save(function(err) {
    //                    if (err) return err;
    //                    return done(null, newUser);
    //                })
    //            }
    //        })
    //    })
    //})
};