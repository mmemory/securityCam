var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var q = require('q');

var UserModel = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    created_on: {type: Date, default: Date.now},
    password: {type: String, required: true},
});

// Password Encryption
UserModel.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password'))	return next();
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Password Verification
UserModel.methods.verifyPassword = function(password) {
    var deferred = q.defer();
    var user = this;
    bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err) deferred.reject(err);
        else deferred.resolve(isMatch);
    });
    return deferred.promise;
};

module.exports = mongoose.model('User', UserModel);
