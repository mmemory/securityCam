var app = angular.module('securityCam', ['ngMaterial', 'ui.router'])

	.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', function($mdThemingProvider, $stateProvider, $urlRouterProvider) {
  	$mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('blue')

  	$urlRouterProvider.otherwise('/');

  	$stateProvider
  		.state('dashboard', {
  			url: '/dashboard',
  			templateUrl: 'Templates/DashTmpl.html',
  			controller: 'DashCtrl'
  		})
  		

  }]) // end config //
