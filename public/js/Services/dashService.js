var app = angular.module('securityCam');

app.service('dashService', ['$http', '$q', function($http, $q) {


	this.cameraInfo = function(startDate, endDate) {
		var defer = $q.defer();
		$http({
			method: 'POST',
			//url: //url here/searchterm +userID + groupId + startDate + endDate
		}).then(function(response) {
			console.log(response) 
			var data = response
			
		})
		defer.resolve(param)
	}
}])

