var app = angular.module('securityCam')

	.controller('DashCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', 'dashService', function($scope, $timeout, $mdSidenav, $mdUtil, $log, dashService) {
 
	
	////////////////////////////
	// 		  On the Scope		
	///////////////////////////
	$scope.submissionStartDate
	$scope.submissionEndDate
	$scope.group

            $scope.filterOptions = function() {
                dashService.cameraInfo($scope.submissionStartDate, $scope.submissionEndDate).then(function(response) {
                    console.log(response);

                })
            }

	////////////////////////////
	// 		  Sidebar		
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

    $scope.groups = [
          "Group A",
          "Group B",
          "Group C",
          "Group D"
      ];

    /////////// End Sidebar ////////////


}]) // End DashCtrl //
