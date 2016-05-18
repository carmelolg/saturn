'use strict';

/**
 * @ngdoc factory
 * @name saturnApp.
 * @description
 */
angular.module( 'saturnApp' )
  .factory( 'logoutSharedService', logoutSharedService );

logoutSharedService.$inject = [ '$state', 'Utente', '$localStorage' ];

function logoutSharedService( $state, Utente, $localStorage ) {
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
