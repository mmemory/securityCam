var mongoose = require('mongoose');

var HardwareModel = new mongoose.Schema({
    product_code: {type: String, required: true},
    created_on: {type: Date, default: Date.now},
    group_assigned: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
});

module.exports = mongoose.model('Hardware', HardwareModel);