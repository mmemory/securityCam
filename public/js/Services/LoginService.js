var app = angular.module('securityCam');

	app.service('LoginService', ['$http', '$q', function($http, $q) {

		this.signup = function(firstname, lastname, email, groupName, password) {
            console.log('service register called');
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: '/api/users/register',
				data: {
					firstName: firstname,
					lastName: lastname,
					email: email,
					password: password,
					groupName: groupName
				}
			}).then(function(res) {
				deferred.resolve(res.data);
				console.log(res.data);
			}).catch(function(res) {
				deferred.reject(res.data);
				console.log(res.data);
			});
			return deferred.promise;
		};

		this.login = function(email, password) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: '/api/auth/login',
				data: {
					email: email,
					password: password
				}
			}).then(function(res) {
				deferred.resolve(res.data);
			}).catch(function(res) {
				deferred.reject(res.data);
			})
			return deferred.promise;
		};

}]);