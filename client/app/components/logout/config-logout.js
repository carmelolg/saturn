'use strict';

angular
  .module( 'saturnApp' )
  .config( function ( $stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider ) {
    $stateProvider
      .state( 'logout', {
        url: '/logout',
        templateUrl: 'app/components/login/view-login.html',
        onEnter: logoutFn
      } );
  } );

logoutFn.$inject = [ 'logoutSharedService' ];

function logoutFn( logoutSharedService ) {
  // call logout
  logoutSharedService.logout();
}
