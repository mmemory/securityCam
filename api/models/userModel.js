var mongoose = require('mongoose');

var UserModel = new mongoose.Schema({
    user_info: {
        name: {
            first_name: {type: String, required: true},
            last_name: {type: String, required: true}
        },
        email: {type: String, required: true},
        created_on: {type: Date, default: Date.now}
    },
    group_member: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
    group_admin: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]
});

module.exports = mongoose.model('User', UserModel);