'use strict';

angular
  .module( 'saturnApp' )
  .config( function ( $stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider ) {
    $ocLazyLoadProvider.config( {
      // Set to true if you want to see what and when is dynamically loaded
      debug: false
    } );

    $urlRouterProvider.when( '/', '/home' );
    $urlRouterProvider.otherwise( '/error/404' );

    $stateProvider
      .state( 'app', {
        abstract: true,
        templateUrl: 'app/components/content/view-content.html'
      } );

    $locationProvider.html5Mode( true )
      .hashPrefix( '!' );
  } )
  .run( function ( $rootScope, $state ) {
    $rootScope.$state = $state;
  } );
