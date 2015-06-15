var app = angular.module('securityCam')
	.controller('WelcomeCtrl', ['$scope', 'user', function($scope, user) {
	
		$scope.user = user;
	

}]) // End MainCtrl //