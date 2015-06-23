var app = angular.module('securityCam')
	.controller('AdminCtrl', ['$scope', '$mdDialog', 'user', 'AdminService', 
		function($scope, $mdDialog, user, AdminService) {
		
		$scope.user = user;
        console.log($scope.user);
		
		// Function to add a new user
		// $scope.addUser = function(name, lastname, email, password) {
		// 	$mdDialog.hide();
		// 	AdminService.registerMember(name, lastname, email, password).then(function(response) {
		// 	console.log('addNewUser invoked - AdminCtrl', name, email);
		// 	console.log(response);
		// 		//document.getElementsByClassName('')
		// 	}).catch(function(err) {
		// 		console.log(err);
		// 	});
		// };

		$scope.closeDialog = function() {
     	console.log('user registration cancelled');
        $mdDialog.hide();
    };
		// New user dialog pop-up
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
		    	$scope.addHardware(name, email);
		    });
		};

		function DialogController($scope, $mdDialog) {
		  $scope.addUser = function(firstName, lastName, email, password) {
		    $mdDialog.hide();
		    console.log('addUser invoked', firstName, lastName, email, password);
		    AdminService.registerMember(firstName, lastName, email, password).then(function() {
		    	console.log('User added');
		    });
		  };
		  $scope.closeDialog = function() {
		    $mdDialog.hide();
		    console.log('registration cancelled');
		  };

		  $scope.deleteUser = function() {
		  	$mdDialog.hide();
		  	console.log("user delete invoked");
		  	AdminService.deleteUser().then(function(res) {
		  		console.log('user deleted :(');
		  	});
		  };

		  $scope.deleteHardware = function() {
		  	$mdDialog.hide();
		  	console.log("hardware delete invoked");
		  	AdminService.deleteHardware().then(function(res) {
		  		console.log('hardware deleted :(');
		  	});
		  };

		}

	//Delete User
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

    $scope.demo = {
  	  topDirections: ['left', 'up'],
      bottomDirections: ['down', 'right'],
      isOpen: false,
      availableModes: ['md-fling', 'md-scale'],
      selectedMode: 'md-fling',
      availableDirections: ['up', 'down', 'left', 'right'],
      selectedDirection: 'up'
  	};



}]); // End AdminCtrl //