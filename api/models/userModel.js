var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var saltFactor = 10;

var UserModel = new mongoose.Schema({
    user_info: {
        name: {
            first_name: {type: String, required: true},
            last_name: {type: String, required: true}
        },
        email: {type: String, required: true},
        created_on: {type: Date, default: Date.now},
        password: {type: String, required: true}
    },
    group_member: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
    group_admin: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]
});


// Bcrypt middleware
UserModel.pre('save', function(next) {
    var user = this;
    //console.log('user variable:', user);

    bcrypt.genSalt(saltFactor, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.user_info.password, salt, function(err, hash) {
            if(err) return next(err);
            user.user_info.password = hash;
            next();
        });
    });
});


//UserModel.methods.generateHash = function(password) {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltFactor)
//};

// Verify password
//UserModel.methods.verifyPassword = function(password) {
//    var deferred = q.defer();
//    var user = this;
//    bcrypt.compare(password, user.password, function(err, res) {
//        if (err) {
//            deferred.resolve(false);
//        }
//        deferred.resolve(true);
//    });
//    return deferred.promise;
//};

//UserModel.methods.validatePassword = function(password) {
//    return bcrypt.compare(password, this.user_info.password);
//};

module.exports = mongoose.model('User', UserModel);
