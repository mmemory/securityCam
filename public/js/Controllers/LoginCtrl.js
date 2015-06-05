var app = angular.module('securityCam')
	.controller('AdminCtrl', ['$scope', 'LoginService', function($scope, LoginService) {
	
	$scope.clickRegister = function() {
		LoginService.signup($scope.firstname, $scope.lastname, $scope.email, $scope.password).then(function() {
			$location.path('/admin');
		}).catch(function(err) {
			$scope.error = err;
			console.log($scope.error);
		})
			
	}

}]) // End RegisCtrl.js //