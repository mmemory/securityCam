var app = angular.module('securityCam')
	.controller('AdminCtrl', ['$scope', '$mdDialog', 'user', function($scope, $mdDialog, user) {
		
		$scope.user = user;
    $scope.authorized = user.email;
    console.log($scope.user);
		
		// Function to add a new user
		$scope.addUser = function(name, email) {
			$mdDialog.hide();
			console.log('addNewUser invoked - AdminCtrl', name, email)
		}

		$scope.closeDialog = function() {
     	console.log('user registration cancelled')
      $mdDialog.hide();
    };
		// New user dialog pop-up
		$scope.addNewUser = function(ev) {
			console.log("addNewUser clicked AdminCtrl")
	    $mdDialog.show({
	    	controller: DialogController,
	      parent: angular.element(document.body),
	      clickOutsideToClose: true,
	      title: 'Register New User',
	      templateUrl: 'js/Templates/newUserDialog.html',
	      targetEvent: ev
	  	})
	    .then(function() {
	    	$scope.addUser(name, email);
	    })
	  };

		function DialogController($scope, $mdDialog) {
		  $scope.addUser = function(firstName, lastName, email, password) {
		    $mdDialog.hide();
		    console.log('addUser invoked', firstName, lastName, email, password);
		    AdminService.registerUser(firstName, lastName, email, password).then(function() {
		    	console.log('somthin')
		    })
		  };
		  $scope.closeDialog = function() {
		    $mdDialog.hide();
		    console.log('registration cancelled')
		  };
		};

		$scope.deleteUser = function(userObj) {
			var member = userObj; 
			//this will be the actuall member we want to delete from array we will need their email address
			AdminService.deleteMember(member.email).then(function(response) {
				console.log(response)
			})
		}

		$scope.deleteHardware = function(cameraId) {
			AdminService.deleteCamera(cameraId).then(function(response) {
				console.log(response)
			})
		}


}]) // End AdminCtrl //