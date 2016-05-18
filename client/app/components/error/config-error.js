'use strict';

angular
  .module('saturnApp')
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/home');
    $urlRouterProvider.otherwise('/error/404');

    $stateProvider
      .state('error', {
        abstract: true,
        url: '/error',
        templateUrl: 'app/components/error/view-404.html'
      })
      .state('error.401', {
        url: '/401',
        templateUrl: 'app/components/error/view-401.html'
      })
      .state('error.403', {
        url: '/403',
        templateUrl: 'app/components/error/view-403.html'
      })
      .state('error.404', {
        url: '/404',
        templateUrl: 'app/components/error/view-404.html'
      })
      .state('error.500', {
        url: '/500',
        templateUrl: 'app/components/error/view-500.html'
      });
  });
