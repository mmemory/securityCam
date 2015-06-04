// Main requires
var express = require('express');
var BodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');



// Connection variables
var port = process.env.API_PORT || 3015;
var mongoUri = 'mongodb://localhost/security-cam';



// Initialize app
var app = express();



// Local Imports



// Middleware
app.use(cors());
app.use(BodyParser.json());
app.use(express.static(__dirname + '/public'));



// Endpoints
/// Users

/// Groups

/// Hardware


// Connections
app.listen(port, function() {
    console.log('Listening on port', port);
});

mongoose.connect(mongoUri);


