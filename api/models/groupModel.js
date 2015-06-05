var mongoose = require('mongoose');

var GroupModel = new mongoose.Schema({
    group_info: {
        name: {type: String, required: true},
        created_on: {type: Date, default: Date.now}
    },
    admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    hardware_registered: [{type: mongoose.Schema.Types.ObjectId, ref: 'Hardware'}]
});

module.exports = mongoose.model('Group', GroupModel);