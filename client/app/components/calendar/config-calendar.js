'use strict';

angular
  .module('saturnApp')
  .config([ '$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider', '$compileProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider, $compileProvider) {

    $stateProvider
      .state('app.calendar', {
        url: '/calendar',
        templateUrl: 'app/shared/partials/include.html',
        abstract: true
      })
      .state('app.calendar.panel', {
        url: '/panel',
        controller: 'CalendarController',
        templateUrl: 'app/components/calendar/panel/view-calendar.html',
        breadcumb: [ {
          title: 'Calendar'
        }, {
          title: 'Panel'
        } ]
      });
  }]);
