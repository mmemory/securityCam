var app = angular.module('securityCam')
	.controller('WelcomeCtrl', ['$scope', '$mdDialog', '$location', '$document', 'LoginService', function($scope, $mdDialog, $location, $document, LoginService) {
	
	$scope.login = function(ev) {
		console.log("Login clicked WelcomeCtrl")
    $mdDialog.show({
      controller: RegisterController,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      title: 'Login',
      templateUrl: 'js/Templates/loginDialog.html',
      targetEvent: ev
  	})
    .then(function() {
    	console.log('logging in...')
    })
	};

	$scope.register = function(ev) {
		console.log("Register clicked WelcomeCtrl")
    $mdDialog.show({
      controller: RegisterController,
      scope: $scope,
      preserveScope: true,
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
	  $scope.registerUser = function(firstname, lastname, email, groupName, password) {
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

	  $scope.login = function(email, password) {
	    $mdDialog.hide();
	    console.log('addUser invoked', email, password);
	    LoginService.login($scope.email, $scope.password).then(function() {
				$location.path('dashboard');
			}).catch(function(err) {
				console.log($scope.error);
				$scope.error="There was an error with the Username or Password, please try again!"
			})
	  };

	  $scope.closeDialog = function() {
	    $mdDialog.hide();
	    console.log('registration cancelled')
	  };
	};

	$scope.scroll = function() {
		console.log('scroll clicked')
		$document.scrollToElementAnimated('section');
	};
	

}]) // End MainCtrl //