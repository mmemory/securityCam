var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');
var Image = require('../models/imageModel.js');
var Hardware = require('../models/hardwareModel.js');

module.exports = {


    // An admin can add multiple hardware units to their group account.
    // This method handles the functionality of saving data about the device
    // to Mongo. The admin only needs to provide the product code (IP address)
    // of the hardware unit.
    createHardwareInstance: function(req, res) {

        var newHardwareBody = req.body;

        var newHardwareData = {
            product_code: newHardwareBody.product_code,
            group_assigned: req.user.group_admin
        };

        var newHardware = new Hardware(newHardwareData);

        newHardware.save(function(err, savedHardware) {
            if (err) console.log('Error saving hardware', err);

            Group.findByIdAndUpdate(req.user.group_admin._id, {$push: {hardware_registered: savedHardware._id}}, function(err, updatedGroup) {
                if (err) console.log('Error saving reference to hardware in group (hardwareCtrl.js)', err);

                res.send('updatedGroup:', updatedGroup);
            });

            //res.send(savedHardware);
        })
    },

    deleteHardware: function(req, res) {

        Hardware.findOne({product_code: req.body}, function(err, hardwareFound) {
            hardwareFound.remove(function(err, removed) {
                if (err) console.log('Error deleting hardware', err);

                res.send();
            })
        })
    }
};