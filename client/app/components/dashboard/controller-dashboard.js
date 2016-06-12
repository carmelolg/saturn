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

DashboardController.$inject = [ '$rootScope', '$scope', '$state', 'Utente', 'Mailchimp' ];

function DashboardController( $rootScope, $scope, $state, Utente, Mailchimp ) {

  Mailchimp.countTotalMembers(function(data){
    console.log(data.count);
  }, function(err){
    console.error(err);
  });


  if ( !Utente.isAuthenticated() ) {
    $state.go( 'login' );
  }
}
