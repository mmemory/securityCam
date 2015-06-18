var app = angular.module('securityCam')
    .controller('DashCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', 'dashService', 'user', 'mainService',
        function($scope, $timeout, $mdSidenav, $mdUtil, $log, dashService, user, mainService) {

            ////////////////////////////
            //      On the Scope    
            ///////////////////////////


            ////////////////////////////
            //      Sidebar   
            ///////////////////////////

            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');
            /**
             * Build handler to open/close a SideNav; when animation finishes
             * report completion in console
             */
            function buildToggler(navID) {
                var debounceFn = $mdUtil.debounce(function() {
                    $mdSidenav(navID)
                        .toggle()
                        .then(function() {
                            $log.debug("toggle " + navID + " is done");
                        });
                }, 300);
                return debounceFn;
            }

            $scope.closeLeft = function() {
                $mdSidenav('left').close()
                    .then(function() {
                        $log.debug("close LEFT is done");
                    });
            };

            $scope.closeRight = function() {
                $mdSidenav('right').close()
                    .then(function() {
                        $log.debug("close RIGHT is done");
                    });
            };


            /////////// End Sidebar ////////////

            ////////////////////////////
            //      Dummy Data   
            ///////////////////////////


            // save array of numbers for photos taken in last ten days here:    i.e. $scope.tenDay = $scope.dataResponseFromBackend
            $scope.tenDay = [78, 81, 63, 72, 90, 70, 22, 87, 73];


            // save array of numbers for photos taken in last thirty days here:      
            $scope.thirtyDay = [78, 24, 76, 89, 67, 78, 87, 54, 68, 89, 43, 90, 77, 63, 81, 63, 86, 55, 72, 90, 12, 77, 89, 59, 70, 22, 67, 30, 87, 73]


            // This is for the groups that user is a part of - will come from Mongo. We need to determine 
            // how to seperate all data based on which 'group' user decides to view
            $scope.groups = [
                "Group A",
                "Group B",
                "Group C",
                "Group D"
            ]


            $scope.user = user;
            $scope.authorized = user.email;
            console.log($scope.authorized);

            var displayGroups = function(groups) {
                groupAdminName = $scope.user.group_admin.name;
                groups.unshift(groupAdminName)
            };
            displayGroups($scope.groups);


            $scope.runTest = function() {
                var startDate = Date.parse($scope.startDate)
                console.log(startDate);
                var endDate = Date.parse($scope.endDate)
                console.log(endDate);
                dashService.getPics($scope.group, startDate, endDate).then(function(response) {
                    console.log("response");
                })
            }



        }
    ]) // End MainCtrl //