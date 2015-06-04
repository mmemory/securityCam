fvar app = angular.module('securityCam')
    .controller('DashCtrl', ['$scope', 'dashService', function($scope, dashService) {

            $scope.filterOptions = function() {
                dashService.cameraInfo($scope.sessionStartDate, $scope.sessionEndDate).then(function(response) {
                    console.log(response);

                })
            }


        }
    ]) // End DashCtrl //