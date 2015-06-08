var app = angular.module('securityCam')
	.controller('RegisterCtrl', ['$scope', 'LoginService', '$location', function($scope, LoginService, $location) {
	
	$scope.clickRegister = function() {
        console.log('controller register called');
		LoginService.signup($scope.firstname, $scope.lastname, $scope.email, $scope.password).then(function() {
			
			$location.path('admin');

		}).catch(function(err) {
			$scope.error = err;
			console.log($scope.error);
			document.getElementsByClassName('erase').value = ""
		})
			
	}

}]) // End RegisCtrl.js //