var app = angular.module('securityCam')
	.controller('AdminCtrl', ['$scope', '$mdDialog', 'user', 'AdminService', 
		function($scope, $mdDialog, user, AdminService) {
		
      ////////////////////////////
      //      Define User Obj
      ///////////////////////////
		$scope.user = user;
    console.log($scope.user);
    $scope.groups = $scope.user.groups;
	

        ////////////////////////////
        //      Add user
        ///////////////////////////

    // Adds user from the Admin Page into selected group
		$scope.addNewUser = function(ev) {
			console.log("addNewUser clicked AdminCtrl");
		    $mdDialog.show({
		      controller: DialogController,
		      scope: $scope,
		      preserveScope: true,
		      parent: angular.element(document.body),
		      clickOutsideToClose: true,
		      title: 'Register New User',
		      templateUrl: 'js/Templates/newUserDialog.html',
		      targetEvent: ev
		  	});
		    // .then(function() {
		    // 	$scope.addUser(name, email);
		    // })
		};

        ////////////////////////////
        //      Add camera
        ///////////////////////////	

		// Adds camera to selected group		
		$scope.addNewHardware = function(ev) {
			console.log("addNewHardware clicked AdminCtrl");
		    $mdDialog.show({
		      controller: DialogController,
		      scope: $scope,
		      preserveScope: true,		     
		      parent: angular.element(document.body),
		      clickOutsideToClose: true,
		      title: 'Register New Hardware',
		      templateUrl: 'js/Templates/newHardwareDialog.html',
		      targetEvent: ev
		  	})
		    .then(function() {
		    	console.log('adding hardware');
		    });
		};


        ////////////////////////////
        //      Add user
        ///////////////////////////

    // MD-Dialog to change selected group in Admin Page
		$scope.chooseGroup = function(ev) {
			console.log("chooseGroup clicked AdminCtrl");
		    $mdDialog.show({
		      controller: DialogController,
		      scope: $scope,
		      preserveScope: true,		     
		      parent: angular.element(document.body),
		      clickOutsideToClose: true,
		      title: 'Change Groups',
		      templateUrl: 'js/Templates/changeGroupsDialog.html',
		      targetEvent: ev
		  	})
		    .then(function() {
		    	console.log('changing groups...');
		    });
		};


        //////////////////////////////
        //      Delete User
        //////////////////////////////

	$scope.deleteUserDialog = function(ev) {
			console.log("deleteUserDialog clicked AdminCtrl");
	    $mdDialog.show({
	      controller: DialogController,
	      scope: $scope,
	      preserveScope: true,
	      parent: angular.element(document.body),
	      clickOutsideToClose: true,
	      title: 'Delete User',
	      templateUrl: 'js/Templates/deleteUserDialog.html',
	      targetEvent: ev
	  	})
	    .then(function() {
	    	console.log('user being deleted...');
	    });
	};

        //////////////////////////////////
        //       Delete Hardware
        //////////////////////////////////

	$scope.deleteHardwareDialog = function(ev) {
			console.log("deleteHardwareDialog clicked AdminCtrl");
	    $mdDialog.show({
	      controller: DialogController,
	      scope: $scope,
	      preserveScope: true,
	      parent: angular.element(document.body),
	      clickOutsideToClose: true,
	      title: 'Delete Hardware',
	      templateUrl: 'js/Templates/deleteHardwareDialog.html',
	      targetEvent: ev
	  	})
	    .then(function() {
	    	console.log('Hardware being deleted...');
	    });
	};

        //////////////////////////////
        //      Delete User
        //////////////////////////////

  $scope.demo = {
	  topDirections: ['left', 'up'],
    bottomDirections: ['down', 'right'],
    isOpen: false,
    availableModes: ['md-fling', 'md-scale'],
    selectedMode: 'md-fling',
    availableDirections: ['up', 'down', 'left', 'right'],
    selectedDirection: 'up'
	};


        /////////////////////////////////////////////
        //      New Controller for Dialogs
        /////////////////////////////////////////////


		function DialogController($scope, $mdDialog) {

			// called from newUserDialog - adds user from Admin Page to selected group
		  $scope.addUser = function(firstName, lastName, email, password) {
		    $mdDialog.hide();
		    console.log('addUser invoked', firstName, lastName, email, password);
		    AdminService.registerMember(firstName, lastName, email, password).then(function() {
		    	console.log('User added');
		    });
		  };

			// called from newHardwareDialog - adds hardware from Admin Page to selected group
		  $scope.addHarware = function(newProductCode, cameraName) {
		    $mdDialog.hide();
		    console.log('addHardware invoked', firstName, lastName, email, password);
		    AdminService.addHardware(newProductCode, cameraName).then(function() {
		    	console.log('Hardware added');
		    });
		  };

			// called from deleteUserDialog - deletes user from Admin Page from selected group
		  $scope.deleteUser = function() {
		  	$mdDialog.hide();
		  	console.log("user delete invoked");
		  	AdminService.deleteUser().then(function(res) {
		  		console.log('user deleted :(');
		  	});
		  };

			// called from deleteHardwareDialog - deletes hardware from Admin Page from selected group
		  $scope.deleteHardware = function() {
		  	$mdDialog.hide();
		  	console.log("hardware delete invoked");
		  	AdminService.deleteHardware().then(function(res) {
		  		console.log('hardware deleted :(');
		  	});
		  };

			// called from changeGroupsDialog - changes selected group
		  $scope.changeGroups = function(newGroup) {
		  	$mdDialog.hide();
		  	console.log("change Groups invoked");
		  	$scope.group = newGroup;
		  };

			// closes Dialog - called from all Dialogs		  
		  $scope.closeDialog = function() {
		    $mdDialog.hide();
		    console.log('registration cancelled');
		  };

		} // Ends DialogController

}]); // End AdminCtrl //