var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');
var Image = require('../models/imageModel.js');
var Hardware = require('../models/hardwareModel.js');
var Ambient = require('../models/ambientDataModel.js');

module.exports = {


    findImagesByDateRange: function(req, res) {
        var search = req.params;
        var startDate = Date.parse(req.params.startDate);
        var endDate = Date.parse(req.params.endDate);

        Group.findById(search.groupID)
            .populate('pictures_total')
            .exec(function(err, group) {
                if (err) console.log('Error finding group to search for images', err);

                var picArray = group.pictures_total;
                var resultArray = [];

                for (var i = 0; i < picArray.length; i++) {
                    if (picArray[i].created_on > search.startDate && picArray[i].created_on < search.endDate) {
                        resultArray.push(picArray[i]);
                    }
                }

                res.send(resultArray);
        });
    },

    filterImagesByDate: function(req, res) {
        var search = req.params;
        var startDate = Date.parse(req.params.startDate);
        var endDate = Date.parse(req.params.endDate);

        Image.find(function(err, images) {
                if (err) console.log('Error finding images to sort by date', err);

                var resultArray = [];

                for (var i = 0; i < images.length; i++) {
                    if (images[i].created_on > search.startDate && images[i].created_on < search.endDate) {
                        resultArray.push(images[i]);
                    }
                }

                console.log("RESULTARRAY", resultArray);
                res.send(resultArray);
            });

    },

    findImagesFromPastTenDays: function(req, res) {
        // Stuff
    },

    findImagesFromPastThirtyDays: function(req, res) {
        // Stuff
    },

    getAmbientSensorData: function(req, res) {

        Ambient
            .find()
            .limit(148)
            .sort('-created_on')
            .exec(function(err, ambientData) {
                if (err) console.log('Error finding ambient data', err);

                var ambientDataObject = {
                    temperatureInCelsius: [],
                    temperatureInFarenheit: [],
                    light: ambientData[0].light,
                    humidity: ambientData[0].humidity,
                    currentTempC: ambientData[0].temperatureInCelsius,
                    currentTempF: ambientData[0].temperatureInFarenheit
                };

                for (var i = 0; i < ambientData.length; i++) {
                    ambientDataObject.temperatureInCelsius.push(ambientData[i].temperatureInCelsius);
                    ambientDataObject.temperatureInFarenheit.push(ambientData[i].temperatureInFarenheit);
                }

                console.log(ambientDataObject);

                res.send(ambientDataObject);
            })
    }

};