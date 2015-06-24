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
var ImageControl = require('./api/controllers/imageCtrl.js');
var HardwareControl = require('./api/controllers/hardwareCtrl.js');
var adminCtrl = require('./api/controllers/adminCtrl.js');
var Image = require('./api/models/imageModel.js');
var QueryControl = require('./api/controllers/queryCtrl.js');
var AmbientControl = require('./api/controllers/ambientDataControl.js');



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
app.use(BodyParser.urlencoded({extended: true}));
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

var requireAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).end();
    }
    console.log(req.user);
    next();
};


//
// Logger
//
var logMe = function(req, res, done) {
    console.log('REQUEST MADE');
    console.log('Type of request:', typeof req.body);
    console.log(req.method, ' ', req.path);
    console.log('BODY:\n', req.body);
    done();
};

///////////////////////////////////////////
//      ENDPOINTS
/////////////////////////////////////////
// Users
app.get('/auth/logout', UserControl.logoutUser);
app.get('/api/users/user', UserControl.getCurrentUser);
app.post('/api/users/register', UserControl.registerUser);
app.post('/api/auth/login', passport.authenticate('local'), UserControl.authenticate);
app.post('/api/user/member', adminCtrl.createNewGroupMember);
app.delete('/api/user/member', adminCtrl.removeMember);
// Hardware
app.post('/api/user/hardware', HardwareControl.createHardwareInstance);
app.delete('api/user/hardware', HardwareControl.deleteHardware);
// Data Queries
app.get('/api/searchterm/:groupID/:startDate/:endDate', QueryControl.findImagesByDateRange);
app.get('/api/d3/ten-days', requireAuth, QueryControl.findImagesFromPastTenDays);
app.get('/api/d3/thirty-days', requireAuth, QueryControl.findImagesFromPastThirtyDays);
app.get('/api/admin', requireAuth, adminCtrl.adminGroupsAndMembers);
app.get('/api/ambient', QueryControl.getAmbientSensorData);
// Data From Hardware
app.post('/api/image-data', logMe, ImageControl.receiveImageFromHardware);
app.post('/api/ambient-data', logMe, AmbientControl.receiveAmbientDataFromHardware);
//app.get('/api/images', logMe, ImageControl.getAllGroupImages);

app.get('/api/images/hack', ImageControl.allImages);



///////////////////////////////////////////
//      SERVER
/////////////////////////////////////////
var port = process.env.API_PORT || 3015;

app.listen(port, function() {
    console.log('Listening on port', port);
});
