'use strict';

/**
 * @ngdoc function
 * @name saturnApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the saturnApp
 */
angular.module( 'saturnApp' )
  .controller( 'HomeController', HomeController );

HomeController.$inject = [ '$rootScope', '$scope', '$state', 'Utente' ];

function HomeController( $rootScope, $scope, $state, Utente ) {

  if ( !Utente.isAuthenticated() ) {
    $state.go( 'login' );
  }
}
