var User = require('../models/userModel.js');

module.exports = {
    
    registerUser: function(req, res) {
        User.findOne({user_info: {email: req.body.email}}, function(user) {

            // User exists already, returns error
            if (user) {
                return res.status(400).json('User already exists with that email');
            }

            // If no user exists, then create a new user
            var createUser = new User(req.body);

            createUser.save(function(err, newUser) {
                if (err) {
                    console.log('Error creating user', err);
                    return res.status(500).end();
                }// if err
            });// save
        }); //findOne
    }, //registerUser
    
    logoutUser: function(req, res) {
        req.logout();
        return res.redirect('/#login');
    }

}; //module.exports