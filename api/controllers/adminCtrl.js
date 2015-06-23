var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');
var UserGroupRelation = require('../models/UserGroupRelation.js');

module.exports = {

  removeMember: function(req, res) {

    // FIXME: check to make sure current user is admin to requested group_id
    // FIXME: make sure there is ALWAYS one admin for each group

    UserGroupRelation.findOne({
      user_id: req.user._id,
      group_id: req.body.group_id
    }).remove(function(err, result) {
      console.log('REMOVE MEMBER RESULT', result);
      res.send(result);
    });
  },

  // An admin can create a group member on their group. This function checks to see
  // if the email address provided by admin already exists with a user. If there is
  // a matching email address, the current admin's group is added to their group_member array.
  // If no match exists, then a member is created with criteria supplied by admin.
  createNewGroupMember: function(req, res) {

    // FIXME: check to make sure current user is admin to requested group_id

    console.log('CREATE NEW GROUP MEMBER');
    console.log('req.body:', req.body);

    User.findOne({email: req.body.email}, function(err, foundUser) {
      console.log('foundUser:', foundUser);
      if (err) return res.sendStatus(500);

      if (foundUser) {
        var relationForExistingMember = {
          user_id: foundUser._id,
          group_id: req.body.group_id
        };

        var newUserGroupRelation = new UserGroupRelation(relationForExistingMember);
        newUserGroupRelation.save(function(err, savedUserGroupRelation) {
          console.log('new relation saved', savedUserGroupRelation);
          if (err) return res.sendStatus(500);
          return res.send(savedUserGroupRelation);
        }); //newUserGroupRelation.save
      } // if(foundUser)

      if (!foundUser) {
        var addMemberNewUserData = {
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        };

        var relationDataNewMember = {
          user_id: null,
          group_id: req.body.group_id
        };

        var newUserFromAddMember = new User(addMemberNewUserData);
        newUserFromAddMember.save(function(err, newUserFromAddMember) {
          console.log('new user saved', newUserFromAddMember);
          if (err) return res.sendStatus(500);
          relationDataNewMember.user_id = newUserFromAddMember._id;

          var newUGR = new UserGroupRelation(relationDataNewMember);
          console.log('newUGR', newUGR);
          newUGR.save(function(err, savedUGR) {
            console.log('err: ', err);
            console.log('new user and relation saved', savedUGR);
            if (err) return res.sendStatus(500);
            return res.send(relationDataNewMember);
          });
        });// createUser.save
      }// if (!foundUser)
    });
  }// createNewGroupMember
};
