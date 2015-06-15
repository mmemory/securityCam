var app = angular.module('securityCam')
    .service('AdminService', ['$http', '$q',
        function($http, $q) {

        this.registerUser = function(firstname, lastname, email, password) {
            console.log('hit AdminService called');
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/api/user/member'
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

        }
    ]); // End Service //