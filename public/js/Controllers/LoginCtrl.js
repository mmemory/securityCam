var app = angular.module('securityCam')
	.controller('LoginCtrl', ['$scope', 'LoginService', '$location', '$mdDialog', function($scope, LoginService, $location, $mdDialog) {

	$scope.clickLogin = function() {
		console.log('controller login called');
		LoginService.login($scope.email, $scope.password).then(function() {
			$location.path('dashboard');
		}).catch(function(err) {
			console.log($scope.error);
			$scope.error="There was an error with the Username or Password, please try again!"
			document.getElementById('erase').value = '';
			
		})

	};

	$scope.register = function(ev) {
		console.log("Register clicked LoginCtrl")
    $mdDialog.show({
      controller: RegisterController,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      title: 'Register',
      templateUrl: 'js/Templates/registerDialog.html',
      targetEvent: ev
  	})
    .then(function() {
    	console.log('registering...')
    })
  };

  function RegisterController($scope, $mdDialog) {
	  $scope.register = function(firstname, lastname, email, groupName, password) {
	    $mdDialog.hide();
	    console.log('addUser invoked', firstname, lastname, email, groupName, password);
	    LoginService.signup(firstname, lastname, email, groupName, password).then(function() {
	    	$location.path('dashboard');
	    })
	    .catch(function(err) {
	    	$scope.error = err;
	    	console.log($scope.error);
	    })
	  };

	  $scope.closeDialog = function() {
	    $mdDialog.hide();
	    console.log('registration cancelled')
	  };
	};


}]) // End RegisCtrl.js //