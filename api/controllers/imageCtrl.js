var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');
var Image = require('../models/imageModel.js');
var Hardware = require('../models/hardwareModel.js');

module.exports = {

    // This method receives data from Arduino hardware POST, and creates a new image instance.
    // The Arduino unit automatically POSTs to the corresponding endpoint when a picture
    // is taken by its camera.
    receiveImageFromHardware: function(req, res) {

        console.log('req.body:', req.body);

        var dataFromHardware = req.body;

        var timeStamp = new Date(dataFromHardware.timestamp);

        var newImageData = {
            name: dataFromHardware.name,
            from_hardware: dataFromHardware.camera,
            image_url: dataFromHardware.url,
            created_on: timeStamp,
            // Other readings
            lightIntensity: dataFromHardware.lightIntensity,
            temperatureInCelsius: dataFromHardware.temperatureInCelsius,
            temperatureInFahrenheit: dataFromHardware.temperatureInFahrenheit,
            humidity: dataFromHardware.humidity
        };

        var newImage = new Image(newImageData);

        newImage.save(function(err, image) {
            if (err) console.log(err);
            console.log('saved image:', image);
            //var stringData = JSON.stringify(image);


            // When a new image document is created, store the image ID on the hardware model
            Hardware.findOne({product_code: image.from_hardware}, function(err, hardwareFound) {
                //console.log(hardwareFound);
                //hardwareFound.pictures.push(image._id);

                //hardwareFound.save(function(err) {
                //    if (err) console.log('Error saving image to pictures array on hardware', err);
                //})

                if (hardwareFound) {
                    Hardware.findByIdAndUpdate(hardwareFound._id, {$push: {pictures: image._id}}, function(err) {
                        if (err) console.log('Error saving image to hardware pictures array', err);
                    })
                } else {
                    console.log('Couldn\'t find hardware (imageCtrl.js)');
                }
            });

            res.send('SUCCESSFULLY SAVED IN MONGO!');
        });
    }
};