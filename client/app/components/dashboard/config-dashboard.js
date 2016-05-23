'use strict';

angular
  .module('saturnApp')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {

    $stateProvider
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/components/dashboard/view-dashboard.html',
        controller: 'DashboardController'
      });
  });
