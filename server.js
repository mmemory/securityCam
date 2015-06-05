// Main imports
var express = require('express');
var BodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;



// Initialize express
var app = express();



// Local Imports
//var Auth = require('./api/config/auth.js');
var User = require('./api/models/userModel.js');


// Local Authentication
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Create new passport strategy instance for local auth
passport.use(new LocalStrategy({
    // use email as username
    userNameField: 'email'
}), function(email, password, done) {

    // Find user by email provided
    User.findOne({user_info: {email: email}}, function(err, user) {

        // If user does not exist, send back error
        if (!user) {
            done(new Error("Login Error: A user with that email does not exist, please try again"))
        }

        user.verifyPassword(password).then(function(doesMatch) {
            if (doesMatch) {
                done(null, user);
            } else {
                done(new Error("Please verify your password and try again"))
            }
        })
    })
});

// Checks for authentication status
var requireAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).end();
    }
    console.log(req.user);
    next();
};

// Checks for Admin authentication status
var requireAdmin = function(req, res, next) {
	if (!req.user.group_admin) {
		return res.status(401).end();
	}
	next();
};



// Middleware
app.use(cors());
app.use(BodyParser.json());
app.use(express.static(__dirname + '/public'));

// Endpoints
/// Users

/// Groups

/// Hardware

/// Queries
app.get('/api/searchterm/:userID/:groupID/:startDate/:endDate', function(req, res) {
    // Search Date
});


// Connections
var port = process.env.API_PORT || 3015;
var mongoUri = 'mongodb://localhost/security-cam';

app.listen(port, function() {
    console.log('Listening on port', port);
});

mongoose.connect(mongoUri);


