var app = angular.module('securityCam')
    .service('dashService', ['$http', '$q',
        function($http, $q) {

            this.getPics = function(groupID, startDate, endDate) {
                console.log('hit service');
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/searchterm/' +groupID+ '/' +startDate+ '/' +endDate
                }).then(function(response) {
                    console.log(response);
                    // Do something with the response 
                    var data = response;
                    deferred.resolve(data);
                }).catch(function(res) {
                    deferred.reject(res.data);
                    console.log('rejected', res.data);
                });
                return deferred.promise;
            };

            this.getFive = function(group_id) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/images',
                    data: {group_id: group_id}
                }).then(function(res) {
                    deferred.resolve(res);
                    console.log(res);
                }).catch(function(res) {
                    deferred.reject(res.data);
                });
                return deferred.promise;
            };

            this.getImages = function() {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/images/hack'
                }).then(function(res) {
                    console.log(res);
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].timestamp = new Date(res.data[i].ts);
                        console.log('TIMESTAMP', res.data.timestamp);
                    }
                    deferred.resolve(res.data);
                }).catch(function(res) {
                    deferred.reject(res.data);
                });
                return deferred.promise;
            };
        }
    ]); // End Service //


// /api/images