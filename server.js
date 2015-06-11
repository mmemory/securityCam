///////////////////////////////////////////
//      MAIN VARIABLES
/////////////////////////////////////////
var express = require('express');
var BodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local');



///////////////////////////////////////////
//      LOCAL IMPORTS
/////////////////////////////////////////
var User = require('./api/models/userModel.js');
var UserControl = require('./api/controllers/userCtrl.js');



///////////////////////////////////////////
//      CONNECTIONS
/////////////////////////////////////////
var mongoUri = 'mongodb://localhost/security-cam';
mongoose.connect(mongoUri);



///////////////////////////////////////////
//      MIDDLEWARE
/////////////////////////////////////////
var app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(BodyParser.json());
app.use(session({
    secret: 'lskdjflqwerwoqeifj',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(username, password, done) {
  console.log('running LocalStrategy callback');
  User.findOne({ email: username }).exec().then(function(user) {
    if (!user) {
        console.log('user doesn\'t exist');
        return done(new Error("This user does not exist"));
    }
    user.verifyPassword(password).then(function(isMatch) {
      if (!isMatch) return done(null, false);
      return done(null, user);
    });
  });
}));



///////////////////////////////////////////
//      AUTHENTICATION
/////////////////////////////////////////
passport.serializeUser(function(user, done) {
  console.log('serializer running');
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  console.log('deserializer running');
  console.log('_id: ', _id);
  User.findById(_id, function(err, user) {
    if (err) console.log(err);
    console.log('user', user);
    done(err, user);
  });
});

// Authentication //
var requireAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).end();
    }
    console.log(req.user);
    next();
};



///////////////////////////////////////////
//      ENDPOINTS
/////////////////////////////////////////
// Users
app.get('/auth/logout', UserControl.logoutUser);
app.post('/api/users/register', UserControl.registerUser);
app.post('/api/auth/login', passport.authenticate('local'), function(req, res) {
    console.log('session', req.session);
    return res.sendStatus(200);
});
app.get('/api/users/user', function(req, res) {
    console.log('user from /api/users/user', req.user);
    res.send(req.user);
});

// Groups

// Hardware

// Queries
app.get('/api/searchterm/:userID/:groupID/:startDate/:endDate', requireAuth, function(req, res) {
    // Search Date
});
// Image Data
app.post('/api/image-data', function(req, res) {
    console.log('DATA FROM HARDWARE:', req.body);
    res.send(req.body);
});



///////////////////////////////////////////
//      SERVER
/////////////////////////////////////////
var port = process.env.API_PORT || 3015;

app.listen(port, function() {
    console.log('Listening on port', port);
});
