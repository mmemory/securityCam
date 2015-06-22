var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');
var Image = require('../models/imageModel.js');
var Hardware = require('../models/hardwareModel.js');

module.exports = {


    findImagesByDateRange: function(req, res) {
        var search = req.query;

        Group.findById(search.groupID, function(err, group) {
            if (err) console.log('Error finding group to search for images', err);

            Image.find({created_on: {$gt: search.startDate, $lt: search.endDate}}, function(err, imagesByDate) {
                if (err) console.log('Error finding images with date range', err);

                res.send(imagesByDate);
            })
        })

    },

    findImagesFromPastTenDays: function(req, res) {
        // Stuff
    },

    findImagesFromPastThirtyDays: function(req, res) {
        // Stuff
    }

};