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
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(BodyParser.json());
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



// Authentication //
var requireAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).end();
    }
    console.log(req.user);
    next();
};



// Endpoints //
/// Users
app.get('/auth/logout', UserControl.logoutUser);
app.post('/api/users/register', UserControl.registerUser);
app.post('/api/auth/login', passport.authenticate('local', { failureRedirect: '/#/login' }), function(req, res) {
    //console.log('user from login endpoint', req.user);
    res.json(req.user);
});
app.get('/auth/me', function(req, res) {
    console.log('user from /auth/me', req);
});

/// Groups

/// Hardware

/// Queries
app.get('/api/searchterm/:userID/:groupID/:startDate/:endDate', requireAuth, function(req, res) {
    // Search Date
});
/// Image Data
app.post('/api/image-data', requireAuth, function(req, res) {
    console.log('DATA FROM HARDWARE:', req.body);
    res.send(req.body);
});



// Server //
var port = process.env.API_PORT || 3015;

app.listen(port, function() {
    console.log('Listening on port', port);
});



