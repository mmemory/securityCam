var app = angular.module('securityCam', ['ngMaterial', 'ui.router'])
	.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', function($mdThemingProvider, $stateProvider, $urlRouterProvider) {
  	$mdThemingProvider.theme('default')
    	.primaryPalette('light-blue')
    	.accentPalette('pink');

    $urlRouterProvider.otherwise('/welcome');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            views: {
                'header': { 
                    templateUrl: 'js/Templates/HeaderTmpl.html',
                    controller: 'MainCtrl' 
                },
                'content': { 
                    templateUrl: 'js/Templates/DashTmpl.html',
                    controller: 'DashCtrl' 
                }
            },
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
            views: {
                'header': { 
                    templateUrl: 'js/Templates/HeaderTmpl.html',
                    controller: 'MainCtrl' 
                },
                'content': { 
                    templateUrl: 'js/Templates/AdminTmpl.html',
                    controller: 'AdminCtrl' 
                }
            },
            resolve: {
              user: function(mainService) {
                return mainService.adminUser();
              }
            }
        })
        .state('welcome', {
            url: '/welcome',
            views: {
                'content': { 
                    templateUrl: 'js/Templates/WelcomeTmpl.html',
                    controller: 'WelcomeCtrl' 
                }
            }
        });

    }
]); // end config //
