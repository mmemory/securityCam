var app = angular.module('securityCam')
    .service('mainService', ['$http', '$q',
        function($http, $q) {

            this.user = function() {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/users/user'
                }).then(function(res) {
                    //console.log('success', res.data);
                    var userObj = res.data;
                    deferred.resolve(userObj);
                }).catch(function(res) {
                    deferred.reject(res.data);
                    console.log('rejected', res)
                });
                return deferred.promise;
            }
        }
    ]); // End Service //