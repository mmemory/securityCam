var User = require('../models/userModel.js');

module.exports = {
    
    registerUser: function(req, res) {
        User.findOne({user_info: {email: req.body.email}}, function(user) {
            console.log('register user called');

            // User exists already, returns error
            if (user) {
                return res.status(400).json('User already exists with that email');
            }

            var newUserData = {
                user_info: {
                    name: {
                        first_name: req.body.firstName,
                        last_name: req.body.lastName
                    },
                    email: req.body.email,
                    password: req.body.password
                }
            };

            // If no user exists, then create a new user with newUserData
            var createUser = new User(newUserData);

            //console.log('PASSWORD', req.body.password);
            //console.log('createUser:', createUser);

            createUser.save(function(err, newUser) {
                console.log('new user saved', newUser);

                if (err) {
                    console.log('Error creating user', err);
                    return res.status(500).end();
                } //if err
            }); //save
        }); //findOne
    }, //registerUser
    
    logoutUser: function(req, res) {
        console.log('logged out!');
        req.logout();
        return res.redirect('/#/login');
    }

}; //module.exports