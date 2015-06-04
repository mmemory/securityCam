// Main imports //
var express = require('express');
var BodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;



// Initialize express //
var app = express();



// Database connection //
var mongoUri = 'mongodb://localhost/security-cam';
mongoose.connect(mongoUri);



// Local Imports //
var User = require('./api/models/userModel.js');



// Local Authentication //
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



// Middleware //
app.use(cors());
app.use(BodyParser.json());
app.use(express.static(__dirname + '/public'));



// Endpoints //
/// Users
/// Register user
app.post('api/users/register', function(req, res) {
    User.findOne({user_info: {email: req.body.email}}, function(user) {

        // User exists already, returns error
        if (user) {
            return res.status(400).json('User already exists with that email');
        }

        // If no user exists, then create a new user
        var createUser = new User(req.body);

        createUser.save(function(err, newUser) {
            if (err) {
                console.log('Error creating user', err);
                return res.status(500).end();
            }
        })
    })
});

/// Groups

/// Hardware

/// Queries
app.get('/api/searchterm/:userID/:groupID/:startDate/:endDate', function(req, res) {
    // Search Date
});



// Server //
var port = process.env.API_PORT || 3015;

app.listen(port, function() {
    console.log('Listening on port', port);
});



