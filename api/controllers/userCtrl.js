var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');

module.exports = {


    // Get all the users from the database and populate the group fields
    getCurrentUser: function(req, res) {
        User.findById(req.user._id)
            .populate('group_admin')
            .populate('group_member')
            .populate('group_admin.hardware_registered')
            .exec(function(err, userFromMongo) {
                res.send(userFromMongo);
            });

        console.log('user from /api/users/user', req.user);
        //res.send(req.user);
    },

    // Register a user with information from front-end. Along with user creation,
    // create a group. Each user that registers becomes an Admin of the group that
    // is created when they register. The admin has rights to add/remove other group members
    // and add/remove hardware from the list.
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
    }, //logoutUser

    authenticate: function(req, res) {
        console.log('session', req.session);
        return res.sendStatus(200);
    },

    removeMember: function(req, res) {
        User.findOne({email: req.body}, function(err, userFound) {

            Group.findByIdAndUpdate(req.user.group_admin, {$pull: {members: userFound._id}}, function(err, groupUpdated) {
                if (err) console.log('Error removing user ID from group members array');

                User.findByIdAndUpdate(userFound._id, {$pull: {group_member: groupUpdated._id}}, function(err, userUpdatedWithDelete) {
                    if (err) console.log('Error removing group ID from user group_member array');
                })
            })


        })
    },

    // An admin can create a group member on their group. This function checks to see
    // if the email address provided by admin already exists with a user. If there is
    // a matching email address, the current admin's group is added to their group_member array.
    // If no match exists, then a member is created with criteria supplied by admin.
    createNewGroupMember: function(req, res) {
        console.log('req.body:', req.body);

        User.findOne({email: req.body.email}, function(err, foundUser) {

            console.log('foundUser:', foundUser);

            // Check to see if a user already exists with query email.
            if (!foundUser) {
                // If they don't, then create a new user
                var newMemberData = {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                };

                var createMember = new User(newMemberData);

                createMember.save(function(err, newMember) {
                    if (err) res.send(err);

                    console.log('newMember:', newMember);

                    // Update group_member array with group ID
                    User.findByIdAndUpdate(newMember._id, {$push: {group_member: req.user.group_admin._id}}, function(err, updatedNewUser) {
                        if (err) res.send('Error adding group ID to new member groups');

                        res.send();
                    });
                })
            } else {
                // If user already exists, add group ID to their group ID list
                User.findByIdAndUpdate(foundUser._id, {$push: {group_member: req.user.group_admin}}, function(err, updatedPreviousUser) {
                    if (err) res.send('Error adding group ID to already existing member groups');

                    res.send();
                })
            }
        })
    } //createNewGroupMember
}; //module.exports