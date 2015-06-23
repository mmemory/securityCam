var User = require('../models/userModel.js');
var Group = require('../models/groupModel.js');
var UserGroupRelation = require('../models/UserGroupRelation.js');

module.exports = {

    // Get all the users from the database and populate the group fields
  getCurrentUser: function(req, res) {
    dataToReturn = {
      user: null,
      groups: []
    };

    User.findById(req.user._id)
    .exec(function(err, user) {
      console.log('GET CURRENT USER user data: ', user);
      if(err) return res.sendStatus(500);
      if(!user) return res.status(500).json({ message: 'no user found' });
      dataToReturn.user = user;

      UserGroupRelation.find({ user_id : req.user._id })
      .populate('group_id')
      .exec(function(err, result) {
        console.log('GET CURRENT USER group data: ', result);
        if (err) return res.sendStatus(500);
        result.forEach(function(relation, index) {
          dataToReturn.groups.push(relation.group_id);
        });

        console.log('GET CURRENT USER RESULT', dataToReturn);
        res.send(dataToReturn);
      });
    });
  },

  // Register a user with information from front-end. Along with user creation,
  // create a group. Each user that registers becomes an Admin of the group that
  // is created when they register. The admin has rights to add/remove other group members
  // and add/remove hardware from the list.
  registerUser: function(req, res) {
    console.log('req.body info = ', req.body);
    User.findOne({ email: req.body.email })
    .exec(function(err, user) {

      if (err) return res.sendStatus(500);
      if (user) return res.status(400).json('User already exists with that email');

      // FIXME: check to see if group already exists before creating it

      // USER
      var newUserData = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      };

      var newGroupData = {
        name: req.body.groupName
      };

      var UserGroupRelationData = {
        user_is_admin: true
      };

      // USER
      var createUser = new User(newUserData);
      createUser.save(function(err, newUser) {
        console.log('new user saved', newUser);
        if (err) return res.sendStatus(500);
        UserGroupRelationData.user_id = newUser._id;

        // GROUP
        var createGroup = new Group(newGroupData);
        createGroup.save(function(err, newGroup) {
          console.log('new group saved', newGroup);
          if (err) console.log('Error creating group', err);
          UserGroupRelationData.group_id = newGroup._id;

          // USER GROUP RELATION
          var createUserGroupRelation = new UserGroupRelation(UserGroupRelationData);
          createUserGroupRelation.save(function(err, newUserGroupRelation) {
            console.log('new relation saved', newUserGroupRelation);
            UserGroupRelation.findById(newUserGroupRelation._id)
            .populate('user_id')
            .populate('group_id')
            .exec(function(err, result) {
              console.log('populated data: ', result);
              res.send(result);
            });
          }); //createUserGroupRelation.save
        }); //createGroup.save
      }); //createUser.save
    }); //findOne ( user )
  }, //registerUser

  logoutUser: function(req, res) {
    req.logout();
    console.log('logged out!');
    return res.redirect('/#/login');
  }, //logoutUser

  authenticate: function(req, res) {
    return res.sendStatus(200);
  }, //authenticate
};// module.exports
