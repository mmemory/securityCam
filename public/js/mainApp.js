var app = angular.module('securityCam', ['ngMaterial', 'ui.router'])
	.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', function($mdThemingProvider, $stateProvider, $urlRouterProvider) {
  	$mdThemingProvider.theme('default')
    	.primaryPalette('light-blue')
    	.accentPalette('pink')

    $urlRouterProvider.otherwise('/welcome');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'js/Templates/DashTmpl.html',
            controller: 'DashCtrl',
            resolve: {
              user: function(mainService) {
                return mainService.user();
              }
            }
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'js/Templates/AdminTmpl.html',
            controller: 'AdminCtrl',
            resolve: {
              user: function(mainService) {
                return mainService.user();
              }
            }
        })
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'js/Templates/WelcomeTmpl.html',
            controller: 'WelcomeCtrl',
            resolve: {
              user: function(mainService) {
                return mainService.user();
              }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'js/Templates/LoginTmpl.html',
            controller: 'LoginCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'js/Templates/RegisterTmpl.html',
            controller: 'RegisterCtrl'
        })

    }
]) // end config //
