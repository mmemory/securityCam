var mongoose = require('mongoose');

var ImageModel = new mongoose.Schema({
    name: {type: String, required: true},
    //created_on: {type: Date},
    //from_hardware: {type: mongoose.Schema.Types.ObjectId, ref: 'Hardware'}
    from_hardware: String,
    image_url: String
});

module.exports = mongoose.model('Image', ImageModel);

