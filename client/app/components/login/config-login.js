'use strict';

angular
  .module('saturnApp')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
      // Set to true if you want to see what and when is dynamically loaded
      debug: false
    });

    $urlRouterProvider.when('/', '/home');
    $urlRouterProvider.otherwise('/error/404');

    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/components/login/view-login.html'
      });
  });
