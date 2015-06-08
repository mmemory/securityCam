var app = angular.module('securityCam')
	.controller('LoginCtrl', ['$scope', 'LoginService', function($scope, LoginService) {
	
	$scope.clickRegister = function() {
        console.log('controller register called');
		LoginService.signup($scope.firstname, $scope.lastname, $scope.email, $scope.password).then(function() {
			$location.path('/admin');
		}).catch(function(err) {
			$scope.error = err;
			console.log($scope.error);
		})
	}

}]) // End RegisCtrl.js //