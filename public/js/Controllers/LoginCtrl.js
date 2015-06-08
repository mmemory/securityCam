var app = angular.module('securityCam')
	.controller('LoginCtrl', ['$scope', 'LoginService', function($scope, LoginService) {
	
	$scope.clickLogin = function() {
		console.log('controller login called');
		LoginService.login($scope.email, $scope.password).then(function() {
			$location.path('/dashboard');
		}).catch(function(err) {
			console.log($scope.error);
		})

	}
	

}]) // End RegisCtrl.js //