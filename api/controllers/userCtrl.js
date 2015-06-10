var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');

module.exports = {

    getCurrentUser: function(req, res) {
        console.log('current user', req.user);

        User.findById(req.user._id)
            .populate('group_admin')
            .populate('group_admin.members')
            .populate('group_admin.hardware_registered')
            .exec(function(err, currentUser) {
                if (err) console.log('Error getting current user:', err);
                console.log(currentUser);

                return res.status(200).json(currentUser);
            })
    },

    registerUser: function(req, res) {
        User.findOne({email: req.body.email}, function(user) {
            console.log('register user called');

            // User exists already, returns error
            if (user) {
                return res.status(400).json('User already exists with that email');
            }

            var newGroupData = {
                name: req.body.groupName
                //admin: req.user._id
            };


            // If no user exists, then create a new user with newUserData.
            // Also create a group to be referenced on that user model
            var createGroup = new Group(newGroupData);

            createGroup.save(function(err, newGroup) {
                if (err) console.log('Error creating group', err);

                console.log('Created new group');

                var newUserData = {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    group_admin: newGroup._id
                };

                var createUser = new User(newUserData);
                //console.log('createUser:', createUser);

                createUser.save(function(err, newUser) {
                    console.log('new user saved', newUser);

                    if (err) {
                        console.log('Error creating user', err);
                        return res.status(500).end();
                    }

                    Group.findByIdAndUpdate({_id: newGroup._id}, {$set: {admin: newUser._id}}, function(err, updatedGroup) {
                        if (err) console.log('error updating group with admin ID');

                        console.log('Added admin to group');
                    });

                    return res.json(newUser);
                }); //save user
            }); //save group
        }); //findOne
    }, //registerUser

    logoutUser: function(req, res) {
        console.log('logged out!');
        req.logout();
        return res.redirect('/#/login');
    }

}; //module.exports