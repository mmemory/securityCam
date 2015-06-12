var app = angular.module('securityCam', ['ngMaterial', 'ui.router'])
	.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', function($mdThemingProvider, $stateProvider, $urlRouterProvider) {
  	$mdThemingProvider.theme('default')
    	.primaryPalette('light-blue')
    	.accentPalette('pink')

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'js/Templates/DashTmpl.html',
            controller: 'DashCtrl',
            resolve: {
              user: function(dashService) {
                return dashService.user();
              }
            }
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'js/Templates/AdminTmpl.html',
            controller: 'AdminCtrl'
        })
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'js/Templates/WelcomeTmpl.html',
            controller: 'WelcomeCtrl'
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
