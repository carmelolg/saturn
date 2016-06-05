'use strict';

angular
  .module('saturnApp')
  .config([ '$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider', '$compileProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider, $compileProvider) {

    // $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|skype):/) ;
    $stateProvider
      .state('app.contacts', {
        url: '/contacts',
        templateUrl: 'app/shared/partials/include.html',
        abstract: true
      })
      .state('app.contacts.panel', {
        url: '/panel',
        controller: 'ContactsPanelController',
        templateUrl: 'app/components/contacts/panel/view-panel.html',
        breadcumb: [ {
          title: 'Contacts'
        }, {
          title: 'Panel'
        } ]
      })
      .state('app.contacts.edit', {
        url: '/edit/:id',
        controller: 'EditContactController',
        templateUrl: 'app/components/contacts/edit/view-edit.html',
        breadcumb: [ {
          title: 'Contacts'
        }, {
          title: 'Edit'
        } ]
      });
  }]);
