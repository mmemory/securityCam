var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var q = require('q');
var saltFactor = 10;

var UserModel = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    created_on: {type: Date, default: Date.now},
    password: {type: String, required: true},
    group_member: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
    group_admin: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
});

// Bcrypt middleware
UserModel.pre('save', function(next) {
    var user = this;
    //console.log('user variable:', user);

    bcrypt.genSalt(saltFactor, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Verify password
UserModel.methods.verifyPassword = function(password) {
    var deferred = q.defer();
    var user = this;
    bcrypt.compare(password, user.password, function(err, result) {

        if (err) {
            deferred.resolve(false);
        }
        deferred.resolve(result);
    });
    return deferred.promise;
};

module.exports = mongoose.model('User', UserModel);
