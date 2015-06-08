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
var UserControl = require('./api/controllers/userCtrl.js');



// Local Authentication //


// Create new passport strategy instance for local auth
//passport.use(new LocalStrategy({
//    // use email as username
//    userNameField: 'email'
//}), function(email, password, done) {
//
//    // Find user by email provided
//    User.findOne({user_info: {email: email}}, function(err, user) {
//
//        // If user does not exist, send back error
//        if (!user) {
//            done(new Error("Login Error: A user with that email does not exist, please try again"))
//        }
//
//        user.verifyPassword(password).then(function(doesMatch) {
//            if (doesMatch) {
//                done(null, user);
//            } else {
//                done(new Error("Please verify your password and try again"))
//            }
//        })
//    })
//});

// Checks for member authentication status
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
app.use(session({
    secret: 'lskdjfl;qwerwoqeifj',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());



// Endpoints //
/// Users
app.post('/api/auth/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
    return res.json({message: "you logged in"});
});
app.post('/api/users/register', UserControl.registerUser);
app.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/#/login');
});
/// Groups

/// Hardware

/// Queries
app.get('/api/searchterm/:userID/:groupID/:startDate/:endDate', function(req, res) {
    // Search Date
});
/// Image Data
app.post('/api/image-data', function(req, res) {
    console.log('DATA FROM HARDWARE:', req.body);
    res.send(req.body);
});



// Server //
var port = process.env.API_PORT || 3015;

app.listen(port, function() {
    console.log('Listening on port', port);
});



