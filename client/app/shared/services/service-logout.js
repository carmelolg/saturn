'use strict';

/**
 * @ngdoc factory
 * @name saturnApp.
 * @description
 */
angular.module( 'saturnApp' )
  .factory( 'logoutSharedService', logoutSharedService );

logoutSharedService.$inject = [ '$state', 'Utente', 'layoutCoreSharedService', '$localStorage' ];

function logoutSharedService( $state, Utente, layoutCoreSharedService, $localStorage ) {
  var factory = {};

  factory.logout = logout;

  function logout() {
    Utente.logout( function () {
      $localStorage.$reset();
      $state.go( 'login' );
    }, function ( err ) {
    } );
  }

  return factory;
}
