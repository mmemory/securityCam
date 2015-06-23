var app = angular.module('securityCam')
  .controller('MainCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', 'mainService', '$location', function($scope, $timeout, $mdSidenav, $mdUtil, $log, mainService, $location) {

  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');
  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildToggler(navID) {
    $log.debug(navID + "clicked");
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

  $scope.register = function(ev) {
    console.log("Register clicked LoginCtrl");
    $mdDialog.show({
      controller: RegisterController,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      title: 'Register',
      templateUrl: 'js/Templates/registerDialog.html',
      targetEvent: ev
    })
    .then(function() {
      console.log('registering...');
    });
  };

  function RegisterController($scope, $mdDialog) {
    $scope.register = function(firstname, lastname, email, groupName, password) {
      $mdDialog.hide();
      console.log('addUser invoked', firstname, lastname, email, groupName, password);
      LoginService.signup(firstname, lastname, email, groupName, password).then(function() {
        $location.path('dashboard');
      })
      .catch(function(err) {
        $scope.error = err;
        console.log($scope.error);
      });
    };

    $scope.closeDialog = function() {
      $mdDialog.hide();
      console.log('registration cancelled');
    };
  }

  var accountSettings = function() {
    var account = this;
    account.settings = function(e) {
      $location('account');
    };
    account.logout = function(e) {
      $location('auth/logout');
    };
  };


}]); // End MainCtrl //