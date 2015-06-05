var app = angular.module('securityCam');

app.service('dashService', ['$http', '$q' function($http, $q) {

<<<<<<< HEAD
	this.cameraInfo = function(startDate, endDate) {
		var defer = $q.defer();
		$http({
			method: 'POST',
			//url: //url here/searchterm +userID + groupId + startDate + endDate
		}).then(function(response) {
			console.log(response) {
				var data = response
			}
		})
		defer.resolve(param)
	}
}])
=======
	//this.cameraInfo = function(startDate, endDate) {
	//	var defer = $q.defer();
	//	$http({
	//		method: 'POST'
	//		//url: //url here/searchterm +userID + groupId + startDate + endDate
	//	}).then(function(response) {
	//		console.log(response)
	//		var data = response
    //
	//	});
	//	defer.resolve(param)
	//}

});
>>>>>>> 8433982d623d199514a2f3203898c88d2a85e6bc
