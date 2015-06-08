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

    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        //define how we match user credentials to db values
        User.findOne({ 'user_info.email': email }, function(err, user){
            if (!user) {
                console.log('user doesn\'t exist');
                done(new Error("This user does not exist"));
            } else {
                user.verifyPassword(password).then(function(doesMatch) {

                    //console.log(doesMatch);
                    if (doesMatch) {
                        console.log('user verified');
                        done(null, user);
                    }
                    else {
                        done(new Error("Please verify your password and try again"));
                    }
                });
            }
        });
    }));
}; //module.exports