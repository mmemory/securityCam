var mongoose = require('mongoose');

var UserGroupRelation = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user_is_admin: { type: Boolean, default: false },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true }
});

module.exports = mongoose.model('UserGroupRelation', UserGroupRelation);
