// Main imports //
var express = require('express');
var BodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');



// Initialize express //
var app = express();



// Database connection //
var mongoUri = 'mongodb://localhost/security-cam';
mongoose.connect(mongoUri);



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



// Local Imports //
var User = require('./api/models/userModel.js');
var UserControl = require('./api/controllers/userCtrl.js');
require('./api/config/passport.js')(passport);



// Local Authentication //
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



// Endpoints //
/// Users
app.post('/api/users/register', UserControl.registerUser);
app.post('/auth/logout', UserControl.logoutUser);
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



