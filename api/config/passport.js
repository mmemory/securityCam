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
    //                var newUser = new User({
    //                    user_info: {
    //                        name: {first_name: req.body.firstName, last_name: req.body.firstName},
    //                        email: req.body.email,
    //                        password: req.body.password
    //                    }
    //                });
    //
    //                newUser.save(function(err) {
    //                    if (err) return err;
    //                    return done(null, newUser);
    //                }); //Save new user
    //            } //else
    //        }); //findOne
    //    }); //nextTick
    //}); //passport.use


    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        //define how we match user credentials to db values
        User.findOne({ 'user_info.email': email }, function(err, user){
            if (!user) {
                console.log('user doesn\'t exist');
                done(new Error("This user does not exist"));
            }
            user.verifyPassword(password).then(function(doesMatch) {
                if (doesMatch) {
                    console.log('password verified');
                    done(null, user);
                }
                else {
                    done(new Error("Please verify your password and try again"));
                }
            });
        });
    }));
}; //module.exports