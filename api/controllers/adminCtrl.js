var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');
var UserGroupRelation = require('../models/UserGroupRelation.js');
var q = require('q');

module.exports = {

  adminGroupsAndMembers: function(req, res) {
    UserGroupRelation.find({
      user_id: req.user._id,
      user_is_admin: true
    })
    .populate('group_id')
    .exec(function(err, relations) {
      console.log('ADMIN group data: ', relations);
      if (err) return res.sendStatus(500);
      var promiseArray = relations.map(function(relation, index) {

        var dfd = q.defer();

        var adminGroup = relation.group_id;
        console.log('adminGroup: ', adminGroup);

        UserGroupRelation.find({
          group_id: adminGroup._id
        })
        .populate({ path: 'user_id', select: 'first_name last_name email'})
        .then(function(relationWithUser) {
          console.log('users found: ', relationWithUser);
          var innerMap = relationWithUser.map(function(relate) {
            console.log('individual relation', relate);
            return relate.user_id;
          });
          console.log('INNER MAP: ', innerMap);
          adminObj = adminGroup.toObject();
          adminObj.members = innerMap;
          console.log('ADMIN GROUP', adminObj);
          dfd.resolve(adminObj);
        });

        return dfd.promise;

      });

      q.all(promiseArray).then(function(groupsWithMembers) {
        console.log('GROUPS WITH MEMBERS', groupsWithMembers);
        res.send(groupsWithMembers);
      });

    });
  },

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
  }, // removeMember

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
        }); // createUser.save
      } // if (!foundUser)
    }); // User.findOne()
  } // createNewGroupMember
};
