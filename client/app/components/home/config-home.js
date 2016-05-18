'use strict';

angular
  .module('saturnApp')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {

    $stateProvider
      .state('app.home', {
        url: '/home',
        templateUrl: 'app/components/home/view-home.html',
        controller: 'HomeController'
      });
  });
