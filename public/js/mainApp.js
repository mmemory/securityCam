var app = angular.module('securityCam', ['ngMaterial', 'ui.router'])

	.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', function($mdThemingProvider, $stateProvider, $urlRouterProvider) {
  	$mdThemingProvider.theme('default')
<<<<<<< HEAD
    	.primaryPalette('light-blue')
    	.accentPalette('blue')
=======
    .primaryPalette('blue-grey')
    .accentPalette('blue')
>>>>>>> cd24eb07f9ecbca504ce2485d451ebdc83ddf9cf

  	$urlRouterProvider.otherwise('/');

  	$stateProvider
  		.state('dashboard', {
  			url: '/dashboard',
<<<<<<< HEAD
  			templateUrl: 'js/Templates/DashTmpl.html',
  			controller: 'DashCtrl'
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
=======
  			templateUrl: 'Templates/DashTmpl.html',
  			controller: 'DashCtrl'
  		})
  		
>>>>>>> cd24eb07f9ecbca504ce2485d451ebdc83ddf9cf

  }]) // end config //
