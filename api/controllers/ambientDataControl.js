var Ambient = require('../models/ambientDataModel.js');

module.exports = {

    receiveAmbientDataFromHardware: function(req, res) {
        var ambientData = req.body;

        var newAmbientObjectData = {
            temperatureInCelsius: ambientData.tc,
            temperatureInFarenheit: ambientData.tf,
            light: ambientData.li,
            humidity: ambientData.h,
            created_on: ambientData.ts
        };

        var newAmbientObject = new Ambient(newAmbientObjectData);

        newAmbientObject.save(function(err, savedData) {
            if (err) console.log('Error saving ambient data from Arduino');

            console.log('Ambient Data Saved To Mongo:', savedData);

            res.send('AMBIENT DATA SUCCESSFULLY SAVED, YOU ARE A SMART MAN, PHILLIP')
        })
    }
};