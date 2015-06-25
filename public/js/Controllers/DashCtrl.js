var app = angular.module('securityCam')
    .controller('DashCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', 'dashService', 'user', 'mainService', '$mdDialog',
        function($scope, $timeout, $mdSidenav, $mdUtil, $log, dashService, user, mainService, $mdDialog) {

            ////////////////////////////
            //      DUMMY DATA
            ///////////////////////////

            // save array of numbers for photos taken in last ten days here:    i.e. $scope.tenDay = $scope.dataResponseFromBackend
            $scope.tenDay = [78, 81, 63, 72, 90, 70, 22, 87, 73];


            // save array of numbers for photos taken in last thirty days here:      
            $scope.thirtyDay = [78, 24, 76, 89, 67, 78, 87, 54, 68, 89, 43, 90, 77, 63, 81, 63, 86, 55, 72, 90, 12, 77, 89, 59, 70, 22, 67, 30, 87, 73];


    ////////////////////////////
    //      DATA DISPLAY
    ///////////////////////////

            // This is for the groups that user is a part of - will come from Mongo. We need to determine
            // how to seperate all data based on which 'group' user decides to view

            $scope.user = user;
            console.log($scope.user);
            $scope.groups = $scope.user.groups;

            /////////////////////////////////////////
            //      Filter THrough Photos
            /////////////////////////////////////////


            // Opens filterPhotoDialog
            $scope.filterPhotos = function(ev) {
                console.log("Filter clicked DashCtrl");
                $mdDialog.show({
                    controller: FilterController,
                    scope: $scope,
                    preserveScope: true,
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    title: 'Filter Photos',
                    templateUrl: 'js/Templates/filterPhotosDialog.html',
                    targetEvent: ev
                })
                    .then(function() {
                        console.log('filtering...');
                    });
            };

            // opens openPhotoDialog to display photo in 'shadow box' type of scenario
            $scope.openPhoto = function(ev) {
                console.log("openPhoto clicked DashCtrl");
                $mdDialog.show({
                    controller: FilterController,
                    scope: $scope,
                    preserveScope: true,
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    title: 'Open Photo',
                    templateUrl: 'js/Templates/openPhotoDialog.html',
                    targetEvent: ev
                })
                    .then(function() {
                        console.log('opening photo...');
                    });
            };


            /////////////////////////////////////////
            //      Get Images on page Load
            /////////////////////////////////////////

            $scope.getImages = function() {
                dashService.getImages().then(function(response) {
                    console.log("RESPONSE", response);
                    $scope.images = response;
                });
            }();


            ///////////////////////////////////////
            //      Controller for Dialogs
            ///////////////////////////////////////

            function FilterController($scope, $mdDialog) {

                // Filters photos - called from filterPhotoDialog
                $scope.filterImages = function(startDate, endDate) {
                    $mdDialog.hide();
                    var filterStartDate = Date.parse(startDate) / 1000;
                    var filterEndDate = Date.parse(endDate) / 1000;
                    console.log('filterImages invoked', startDate, endDate, filterStartDate, filterEndDate);
                    dashService.filterImagesByDate(filterStartDate, filterEndDate).then(function(response) {
                        console.log("RESPONSE", response);
                        $scope.images = response;
                    }).catch(function(err) {
                        $scope.error = err;
                        console.log($scope.error);
                    });
                };

                // Closes Dialog - called from all Dialogs
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                    console.log('filtering cancelled');
                };
            } // Ends FilterController

            ///////////////////////////////////////////
            //      Functions for data display
            /////////////////////////////////////////// 

            $scope.environmentData = function() {
                dashService.environmentData().then(function(results) {
                    console.log(results);
                    $scope.ambientData = {
                        currentTempC: results.currentTempC,
                        currentTempF: results.currentTempF,
                        humidity: [results.humidity, (100 - results.humidity)],
                        lightDensity: 864
                    };
                    $scope.tempC = results.temperatureInCelsius.reverse();
                    $scope.tempF = results.temperatureInFarenheit.reverse();
                });
            }();



        }
    ]); // End MainCtrl //
