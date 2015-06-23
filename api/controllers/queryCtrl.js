var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');
var Image = require('../models/imageModel.js');
var Hardware = require('../models/hardwareModel.js');

module.exports = {


    findImagesByDateRange: function(req, res) {
        var search = req.params;
        //var startDate = Date.parse(req.params.startDate);
        //var endDate = Date.parse(req.params.endDate);

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
        })
    },

    findImagesFromPastTenDays: function(req, res) {
        // Stuff
    },

    findImagesFromPastThirtyDays: function(req, res) {
        // Stuff
    }

};