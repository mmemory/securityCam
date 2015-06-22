var app = angular.module('securityCam')
    .service('AdminService', ['$http', '$q', function($http, $q) {

            this.registerUser = function(firstname, lastname, email, password) {
                console.log('hit AdminService called');
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/user/member',
                    data: {
                        firstName: firstname,
                        lastName: lastname,
                        email: email,
                        password: password
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
            this.registerMember = function(firstname, lastname, email, password) {
                console.log('hit AdminService called');
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/user/member',
                    data: {
                        firstName: firstname,
                        lastName: lastname,
                        email: email,
                        password: password
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
            this.deleteMember = function(email) {
                var deferred = $q.defer();
                $http({
                    method: 'DELETE',
                    url: '/api/user/member',
                    data: {
                        email: email
                    }
                }).then(function(res) {
                    deferred.resolve(res.data)
                })
            }
            this.deleteCamera = function(hardware) {
                var deferred = $q.defer();
                $http({
                    method: 'DELETE',
                    URL: '/api/user/hardware',
                    data: hardware
                }).then(function(res) {
                    deferred.resolve(res.data)
                })
            }

        }
    ]); // End Service //