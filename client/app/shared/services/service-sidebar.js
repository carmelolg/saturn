'use strict';

/**
 * @ngdoc factory
 * @name saturnApp.
 * @description
 */
angular.module( 'saturnApp' )
  .factory( 'sidebarSharedService', sidebarSharedService );

sidebarSharedService.$inject = [ '$timeout' ];

function sidebarSharedService( $timeout ) {
  var factory = {};

  factory.switchOnOffMenu = switchOnOffMenu;

  function switchOnOffMenu() {
    angular.element( 'body' ).toggleClass( 'mini-navbar' );
    if ( !angular.element( 'body' ).hasClass( 'mini-navbar' ) || angular.element( 'body' ).hasClass( 'body-small' ) ) {
      // Hide menu in order to smoothly turn on when maximize menu
      angular.element( '#side-menu' ).hide();
      // For smoothly turn on menu
      $timeout(
        function () {
          angular.element( '#side-menu' ).fadeIn( 500 );
        }, 100 );
    } else if ( angular.element( 'body' ).hasClass( 'fixed-sidebar' ) ) {
      angular.element( '#side-menu' ).hide();
      $timeout(
        function () {
          angular.element( '#side-menu' ).fadeIn( 500 );
        }, 300 );
    } else {
      // Remove all inline style from jquery fadeIn function to reset menu state
      angular.element( '#side-menu' ).removeAttr( 'style' );
    }
  }

  return factory;
}
