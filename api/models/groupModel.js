var mongoose = require('mongoose');

var GroupModel = new mongoose.Schema({
    name: {type: String, required: true},
    created_on: {type: Date, default: Date.now},
    hardware_registered: [{type: mongoose.Schema.Types.ObjectId, ref: 'Hardware'}],
    pictures_total: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}]
});

module.exports = mongoose.model('Group', GroupModel);
