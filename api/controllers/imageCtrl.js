var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');
var Image = require('../models/imageModel.js');
var Hardware = require('../models/hardwareModel.js');

module.exports = {

    // This method receives data from Arduino hardware POST, and creates a new image instance.
    // The Arduino unit automatically POSTs to the corresponding endpoint when a picture
    // is taken by its camera.
    recieveImageFromHardware: function(req, res) {

        console.log('req.body:', req.body);

        var dataFromHardware = req.body;

        var newImageData = {
            name: dataFromHardware.name,
            from_hardware: dataFromHardware.camera,
            image_url: dataFromHardware.url
        };

        var newImage = new Image(newImageData);

        newImage.save(function(err, image) {
            if (err) console.log(err);
            //console.log('saved image:', image);
            //var stringData = JSON.stringify(image);
            Hardware.find({product_code: image.from_hardware}, function(err, hardwareFound) {
                console.log(hardwareFound);
            });

            res.send('SUCCESSFULLY SAVED IN MONGO!');
        });
    }




};