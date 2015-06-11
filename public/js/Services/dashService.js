var app = angular.module('securityCam')
    .service('dashService', ['$http', '$q',
        function($http, $q) {

            this.cameraInfo = function(startDate, endDate) {
                var defer = $q.defer();
                $http({
                    method: 'POST',
                    //url: //url here/searchterm +userID + groupId + startDate + endDate
                }).then(function(response) {
                    console.log(response);
                    // Do something with the response 
                    var data = response;
                    defer.resolve(data);
                });
                return defer.promise;
            };



            this.user = function() {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/users/user'
                }).then(function(res) {
                    console.log('success', res);
                    deferred.resolve(res.data);
                }).catch(function(res) {
                    deferred.reject(res.data);
                    console.log('rejected', res)
                })
            }
        }
    ]); // End Service //