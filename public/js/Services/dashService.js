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
                })
                return deferred.promise;
            };

            this.getFive = function() {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/images'
                }).then(function(res) {
                    deferred.resolve(res);
                    console.log(res);
                }).catch(function(res) {
                    deferred.reject(res.data);
                });
            };
        }
    ]); // End Service //


// /api/images