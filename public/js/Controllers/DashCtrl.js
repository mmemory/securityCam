var app = angular.module('securityCam')
  .controller('DashCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', function($scope, $timeout, $mdSidenav, $mdUtil, $log) { 
	
	////////////////////////////
	// 		  On the Scope		
	///////////////////////////
	$scope.submissionStartDate
	$scope.submissionEndDate
	$scope.group

            //$scope.filterOptions = function() {
            //    dashService.cameraInfo($scope.submissionStartDate, $scope.submissionEndDate).then(function(response) {
            //        console.log(response);
            //
            //    })
            //}

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
      var debounceFn =  $mdUtil.debounce(function(){
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
        },300);
        return debounceFn;
      }

    $scope.closeLeft = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
      });
    };

    $scope.closeRight = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
      });
    };


  /////////// End Sidebar ////////////

  ////////////////////////////
  //      Dummy Data   
  ///////////////////////////

    $scope.tenDay = [78, 81, 63, 72, 90, 70, 22, 87, 73];
    $scope.thirtyDay = [78, 24, 76, 89, 67, 78, 87, 54, 68, 89, 43, 90, 77, 63, 81, 63, 86, 55, 72, 90, 12, 77, 89, 59, 70, 22, 67, 30, 87, 73]


    $scope.groups = [
      "Group A",
      "Group B",
      "Group C",
      "Group D"
    ]

}]) // End MainCtrl //
