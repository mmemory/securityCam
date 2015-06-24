var mongoose = require('mongoose');

var AmbientModel = new mongoose.Schema({
    temperatureInCelsius: Number,
    temperatureInFarenheit: Number,
    light: Number,
    humidity: Number,
    created_on: Number
});

module.exports = mongoose.model('Ambient', AmbientModel);
