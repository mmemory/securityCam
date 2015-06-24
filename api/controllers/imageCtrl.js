var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');
var Image = require('../models/imageModel.js');
var Hardware = require('../models/hardwareModel.js');

module.exports = {

    // This method receives data from Arduino hardware POST, and creates a new image instance.
    // The Arduino unit automatically POSTs to the corresponding endpoint when a picture
    // is taken by its camera.
    receiveImageFromHardware: function(req, res) {

        //console.log('req', req);

        console.log('req.body:', req.body);

        var dataFromHardware = req.body;

        //var timestamp = new Date(dataFromHardware.timestamp);
        //var timestamp = new Date(dataFromHardware.ts);

        var newImageData = {
            name: dataFromHardware.n,
            from_hardware: dataFromHardware.c,
            image_url: dataFromHardware.u,
            created_on: dataFromHardware.ts
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

                        //Get pictures from global group images
                        Group.findByIdAndUpdate(hardwareFound.group_assigned, {$push: {pictures_total: image._id}}, function(err) {
                            if (err) console.log('Error saving group images to total', err);

                            res.send();
                        });
                    })
                } else {
                    console.log('Couldn\'t find hardware (imageCtrl.js)');
                }
            });

            res.send('SUCCESSFULLY SAVED IN MONGO!');
        });
    },

    allImages: function(req, res) {
      Image.find()
      .exec(function(err, images) {
        res.send(images);
      });
    }
};
