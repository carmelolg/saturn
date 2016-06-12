'use strict';

/**
 * @ngdoc function
 * @name saturnApp.controller:DashboardController
 * @description
 * # DashboardController
 * Controller of the saturnApp
 */
angular.module( 'saturnApp' )
  .controller( 'DashboardController', DashboardController );

DashboardController.$inject = [ '$rootScope', '$scope', '$state', 'Utente' ];

function DashboardController( $rootScope, $scope, $state, Utente ) {

  if ( !Utente.isAuthenticated() ) {
    $state.go( 'login' );
  }
}
