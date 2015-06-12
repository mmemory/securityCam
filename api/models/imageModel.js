var mongoose = require('mongoose');

var ImageModel = new mongoose.Schema({
    name: {type: String, required: true},
    created_on: {type: Date},
    from_hardware: {type: mongoose.Schema.Types.ObjectId, ref: 'Hardware'}
});

module.exports = mongoose.model('Image', ImageModel);