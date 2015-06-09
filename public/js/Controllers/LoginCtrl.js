var app = angular.module('securityCam')
	.controller('LoginCtrl', ['$scope', 'LoginService', '$location', function($scope, LoginService, $location) {
	
	$scope.clickLogin = function() {
		console.log('controller login called');
		LoginService.login($scope.email, $scope.password).then(function() {
			$location.path('dashboard');
		}).catch(function(err) {
			console.log($scope.error);
			$scope.error="There was an error with the Username or Password, please try again!"
			document.getElementById('erase').value = '';
			
		})

	}


}]) // End RegisCtrl.js //